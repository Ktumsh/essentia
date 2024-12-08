"use server";

import { Session } from "next-auth";
import Stripe from "stripe";

import { auth } from "@/app/(auth)/auth";
import { siteConfig } from "@/config/site";
import {
  deleteSubscription,
  getSubscription,
  getSubscriptionBySubscriptionId,
  setPaymentDetails,
  updateClientId,
  updatePaymentDetails,
  updateSubscription,
} from "@/db/querys/payment-querys";
import { getUserById } from "@/db/querys/user-querys";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface VerifyPaymentIntentResponse {
  success: boolean;
  amount?: number;
  currency?: string;
  userId?: string;
  error?: string;
}

export async function createSetupIntent(customerId: string) {
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
  });
  return setupIntent.client_secret;
}

export async function verifyPaymentIntent(
  paymentIntentId: string,
): Promise<VerifyPaymentIntentResponse> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const amount = paymentIntent.amount;
      const currency = paymentIntent.currency;
      const userId = paymentIntent.metadata.userId as string;

      if (!userId) {
        return { success: false, error: "userId no encontrado en metadata." };
      }

      return { success: true, amount, currency, userId };
    } else {
      return { success: false, error: "Pago no completado." };
    }
  } catch (error: any) {
    console.error("Error al verificar PaymentIntent:", error);
    return { success: false, error: error.message };
  }
}

export async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const status = "active";
  const currentPeriodEnd = subscription.current_period_end;
  const processedAt = new Date();

  try {
    const [user] = await getSubscriptionBySubscriptionId(subscriptionId);

    await updateSubscription(
      user.userId,
      subscriptionId,
      currentPeriodEnd,
      status,
    );

    await updatePaymentDetails(user.userId, status, processedAt);

    if (invoice.payment_intent) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        invoice.payment_intent as string,
      );

      const paymentMethodId = paymentIntent.payment_method as string;
      if (paymentMethodId) {
        const customer = await stripe.customers.retrieve(
          user.subscriptionId as string,
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
  }
}

interface CreateSubscriptionParams {
  cardholderName: string;
  priceId: string;
  type: "premium" | "premiumPlus";
}

interface CreateSubscriptionResponse {
  clientSecret: string;
}

export async function createSubscription(
  params: CreateSubscriptionParams,
): Promise<CreateSubscriptionResponse> {
  const { cardholderName, priceId, type } = params;
  const session = await auth();

  const [user] = await getUserById(session?.user?.id as string);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  const [subscription] = await getSubscription(user.id);

  let subscriptionId = subscription?.subscriptionId || null;
  let customerId = subscription?.clientId || null;

  try {
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: cardholderName,
      });
      customerId = customer.id;

      await updateClientId(user.id, customerId);
    }

    if (subscriptionId) {
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      const amount = sub.items.data[0].price.unit_amount;
      const currency = sub.items.data[0].price.currency;
      const status = "pending";

      await setPaymentDetails(user.id, status, amount, currency, new Date());

      const invoice = sub.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

      if (paymentIntent && paymentIntent.client_secret) {
        return { clientSecret: paymentIntent.client_secret };
      }
    }

    const newSubscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
    });

    const invoice = newSubscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    subscriptionId = newSubscription.id;

    const currentPeriodEnd = newSubscription.current_period_end;
    await updateSubscription(user.id, subscriptionId, currentPeriodEnd, type);

    const amount = newSubscription.items.data[0].price.unit_amount;
    const currency = newSubscription.items.data[0].price.currency;
    const status = "pending";

    await setPaymentDetails(user.id, status, amount, currency, new Date());

    const paymentMethodId = paymentIntent.payment_method as string;
    if (paymentMethodId) {
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    if (!paymentIntent.client_secret) {
      throw new Error("Client secret no encontrado.");
    }

    return { clientSecret: paymentIntent.client_secret };
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

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
) {
  const subscriptionId = subscription.id;

  const customerId = subscription.customer as string;

  const session = await auth();

  const [user] = await getUserById(session?.user?.id as string);

  if (!user) {
    console.error(
      `Usuario no encontrado para la suscripción: ${subscriptionId}`,
    );
    return;
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    limit: 1,
  });

  if (subscriptions.data.length > 0) {
    const activeSubscription = subscriptions.data[0];

    await updateSubscription(
      user.id,
      activeSubscription.id,
      activeSubscription.current_period_end,
      activeSubscription.status,
    );

    console.log(
      `El cliente ${customerId} aún tiene una suscripción activa (ID: ${activeSubscription.id}). Se ha actualizado la suscripción activa para el usuario.`,
    );
    return;
  }

  await updateSubscription(user.id, null, null, "inactive");
}

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
) {
  const subscriptionId = subscription.id;
  const status = subscription.status;
  const currentPeriodEnd = subscription.current_period_end;

  try {
    const session = await auth();

    const [user] = await getUserById(session?.user?.id as string);

    await updateSubscription(user.id, subscriptionId, currentPeriodEnd, status);
  } catch (error) {
    console.error(
      `Error al actualizar la suscripción: ${subscriptionId}`,
      error,
    );
  }
}

export async function handleCustomerDeleted(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;

  try {
    const [subscription] =
      await getSubscriptionBySubscriptionId(subscriptionId);

    await deleteSubscription(subscription.userId);
  } catch (error) {
    console.error(
      "Error al eliminar el cliente y actualizar los datos en la base de datos:",
      error,
    );
  }
}

export async function handleInvoiceFinalized(finalizedSubscriptionId: string) {
  if (finalizedSubscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        finalizedSubscriptionId,
      );

      if (subscription.status === "incomplete") {
        console.log(
          `Deleting incomplete subscription: ${finalizedSubscriptionId}`,
        );

        await stripe.subscriptions.cancel(finalizedSubscriptionId);

        console.log(
          `Subscription ${finalizedSubscriptionId} deleted successfully.`,
        );
      } else {
        console.log(
          `Subscription ${finalizedSubscriptionId} is not incomplete. Current status: ${subscription.status}`,
        );
      }
    } catch (error) {
      console.error(
        `Error retrieving or deleting subscription ${finalizedSubscriptionId}:`,
        error,
      );
    }
  } else {
    console.log("No subscription associated with the finalized invoice.");
  }
}

export async function getUserCurrentPlan(session: Session): Promise<string> {
  if (!session || !session?.user?.email) return siteConfig.planPrices.free;

  const customers = await stripe.customers.list({
    email: session.user.email,
    limit: 1,
  });

  if (customers.data.length === 0) return siteConfig.planPrices.free;

  const customer = customers.data[0];

  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
    status: "active",
    limit: 1,
  });

  if (subscriptions.data.length === 0) return siteConfig.planPrices.free;

  const subscription = subscriptions.data[0];

  const priceId = subscription.items.data[0].price.id;

  return priceId;
}

export async function setUserPlan(
  session: Session | null,
  priceId: string,
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

  if (priceId === siteConfig.planPrices.free) {
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

export async function getUserBillingDetails(stripeCustomerId: string | null) {
  if (!stripeCustomerId) {
    throw new Error("No se proporcionó el ID del cliente de Stripe");
  }

  const customer = await stripe.customers.retrieve(stripeCustomerId);

  if ("deleted" in customer) {
    return null;
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: "all",
  });

  if (subscriptions.data.length === 0) {
    return null;
  }

  const activeSubscription = subscriptions.data.find(
    (sub: { status: string }) => sub.status === "active",
  );

  const subscriptionToUse = activeSubscription || subscriptions.data[0];

  let paymentMethod = null;
  if (customer.invoice_settings.default_payment_method) {
    paymentMethod = await stripe.paymentMethods.retrieve(
      customer.invoice_settings.default_payment_method as string,
    );
  }

  if (!paymentMethod) {
    return null;
  }

  return {
    paymentMethod: {
      id: paymentMethod.id,
      card: paymentMethod.card,
      customer: paymentMethod.customer,
    },
    subscription: subscriptionToUse
      ? {
          id: subscriptionToUse.id,
          status: subscriptionToUse.status,
          items: subscriptionToUse.items,
          current_period_end: subscriptionToUse.current_period_end,
        }
      : null,
  };
}

export async function updatePaymentMethod(
  customerId: string,
  paymentMethodId: string,
): Promise<void> {
  try {
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    console.log("Método de pago actualizado correctamente en Stripe.");
  } catch (error) {
    console.error("Error actualizando el método de pago en Stripe:", error);
    throw new Error("Error actualizando el método de pago en Stripe.");
  }
}

export async function getCustomerDetails(customerId: string) {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    if (!("deleted" in customer)) {
      return {
        name: customer.name,
        email: customer.email,
      };
    }
    return null;
  } catch (error) {
    console.error("Error obteniendo detalles del cliente:", error);
    return null;
  }
}
