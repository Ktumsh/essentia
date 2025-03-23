"use server";

import { Session } from "next-auth";
import Stripe from "stripe";

import { auth } from "@/app/(auth)/auth";
import { siteConfig } from "@/config/site.config";
import {
  deleteSubscription,
  getSubscription,
  getSubscriptionByClientId,
  setPaymentDetails,
  updateClientId,
  updatePaymentDetails,
  updateSubscription,
} from "@/db/querys/payment-querys";
import { getUserById } from "@/db/querys/user-querys";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createSubscription({
  priceId,
}: {
  priceId: string;
}): Promise<{ checkoutUrl: string }> {
  const session = await auth();

  const [user] = await getUserById(session?.user?.id as string);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  const [subscription] = await getSubscription(user.id);

  let customerId = subscription?.clientId || null;

  try {
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
      });
      customerId = customer.id;
      await updateClientId(user.id, customerId);
    }

    const sessionCheckout = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: customerId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    });

    const price = await stripe.prices.retrieve(priceId);

    if (price.unit_amount && price.currency) {
      const status = "pending";
      await setPaymentDetails(
        user.id,
        status,
        price.unit_amount,
        price.currency,
        new Date(),
      );
    }

    return { checkoutUrl: sessionCheckout.url as string };
  } catch (error) {
    console.error("Error creando suscripción:", error);
    throw new Error("Error creando suscripción.");
  }
}

export async function checkPaymentStatus() {
  const session = await auth();
  if (!session?.user) {
    return { isPremium: false };
  }

  const [user] = await getSubscription(session?.user?.id as string);
  return { isPremium: user.isPremium || false };
}

export async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const clientId = subscription.customer as string;
  const status = "active";
  const paymentStatus = "paid";
  const currentPeriodEnd = subscription.current_period_end;
  const processedAt = new Date();
  const subscriptionType = subscription.items.data[0].price?.recurring
    ?.interval as string;
  const type = subscriptionType === "month" ? "premium" : "premium-plus";
  const amount = invoice.amount_paid;
  const currency = invoice.currency;

  try {
    const [subscription] = await getSubscriptionByClientId(clientId);

    await updateSubscription(
      subscription.userId,
      subscriptionId,
      currentPeriodEnd,
      status,
      type,
    );

    const updated = await updatePaymentDetails(
      subscription.userId,
      paymentStatus,
      processedAt,
    );

    if (updated === 0) {
      await setPaymentDetails(
        subscription.userId,
        paymentStatus,
        amount,
        currency,
        processedAt,
      );
    }

    if (invoice.payment_intent) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        invoice.payment_intent as string,
      );

      const paymentMethodId = paymentIntent.payment_method as string;
      if (paymentMethodId) {
        const customer = await stripe.customers.retrieve(
          subscription.subscriptionId as string,
        );

        if (!("deleted" in customer) || !customer.deleted) {
          await stripe.customers.update(customer.id, {
            invoice_settings: {
              default_payment_method: paymentMethodId,
            },
          });
          console.log(
            "Método de pago predeterminado actualizado:",
            paymentMethodId,
          );
        }
      }
    }
  } catch (error) {
    console.error("Error actualizando la suscripción:", error);
    throw error;
  }
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
) {
  const subscriptionId = subscription.id;

  const customerId = subscription.customer as string;

  try {
    const [subscription] = await getSubscriptionByClientId(customerId);

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      const activeSubscription = subscriptions.data[0];

      await updateSubscription(
        subscription.userId,
        activeSubscription.id,
        activeSubscription.current_period_end,
        activeSubscription.status,
      );

      console.log(
        `El cliente ${customerId} aún tiene una suscripción activa (ID: ${activeSubscription.id}). Se ha actualizado la suscripción activa para el usuario.`,
      );
      return;
    }

    await updateSubscription(subscription.userId, null, null, "paused", "free");
  } catch (error) {
    console.error(
      `Error al manejar la eliminación de la suscripción: ${subscriptionId}`,
      error,
    );
  }
}

export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
) {
  const subscriptionId = subscription.id;
  const status = subscription.status;
  const type = subscription.items.data[0].plan.nickname;
  const currentPeriodEnd = subscription.current_period_end;
  const clientId = subscription.customer as string;

  const planType =
    type === "Premium"
      ? "premium"
      : type === "Premium Plus"
        ? "premium-plus"
        : "free";

  try {
    const [subscription] = await getSubscriptionByClientId(clientId);

    const userId = subscription.userId;

    await updateSubscription(
      userId,
      subscriptionId,
      currentPeriodEnd,
      status,
      planType,
    );
  } catch (error) {
    console.error(
      `Error al manejar la creación de la suscripción: ${subscriptionId}`,
      error,
    );
  }
}

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
) {
  const subscriptionId = subscription.id;
  const status = subscription.status;
  const type = subscription.items.data[0].plan.nickname;
  const currentPeriodEnd = subscription.current_period_end;
  const clientId = subscription.customer as string;

  const planType =
    type === "Premium"
      ? "premium"
      : type === "Premium Plus"
        ? "premium-plus"
        : "free";

  try {
    const [subscription] = await getSubscriptionByClientId(clientId);

    await updateSubscription(
      subscription.userId,
      subscriptionId,
      currentPeriodEnd,
      status,
      planType,
    );
  } catch (error) {
    console.error(
      `Error al actualizar la suscripción: ${subscriptionId}`,
      error,
    );
  }
}

export async function handleCustomerDeleted(customer: Stripe.Customer) {
  if (!customer || !customer.id) {
    console.error("No se pudo obtener el cliente eliminado.");
    return;
  }

  try {
    const [subscription] = await getSubscriptionByClientId(customer.id);

    await deleteSubscription(subscription.userId);
  } catch (error) {
    console.error(
      "Error al eliminar el cliente y actualizar los datos en la base de datos:",
      error,
    );
  }
}

export async function setUserPlan(
  session: Session | null,
  plan: string,
  cancelReason?: string,
): Promise<{ success: boolean; message: string }> {
  if (!session || !session?.user?.id) {
    return { success: false, message: "Usuario no autenticado." };
  }

  const userId = session?.user?.id as string;
  const [subscription] = await getSubscription(userId);
  const subscriptionId = subscription.subscriptionId;

  if (!subscriptionId) {
    return { success: false, message: "Usuario no encontrado." };
  }

  if (plan === siteConfig.plan.free) {
    if (subscriptionId) {
      try {
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
          metadata: cancelReason ? { cancel_reason: cancelReason } : {},
        });

        console.log(
          `Suscripción ${subscriptionId} marcada para cancelar al final del período.`,
        );
      } catch (error: any) {
        console.error(
          "Error al marcar la suscripción para cancelación:",
          error,
        );
        return {
          success: false,
          message: "Error al marcar la suscripción para cancelación en Stripe.",
        };
      }
    }

    return {
      success: true,
      message: "El plan se actualizará a Gratis al final del período.",
    };
  } else {
    return {
      success: false,
      message: "Plan premium no manejado en esta función.",
    };
  }
}

export async function updateCustomerEmail(
  customerId: string | null,
  newEmail: string,
) {
  if (!customerId) return null;
  try {
    await stripe.customers.update(customerId, { email: newEmail });
  } catch (error) {
    console.error("Error al actualizar el email del cliente en Stripe:", error);
    throw error;
  }
}
