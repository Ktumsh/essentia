"use server";

import { siteConfig } from "@/config/site";
import {
  deleteUserStripeCustomer,
  getStripeCustomerId,
  getSubscriptionId,
  getUserById,
  getUserBySubscriptionId,
  updatePremiumStatus,
  updateUserStripeCustomerId,
} from "@/db/actions";
import { Session } from "@/types/session";
import { auth } from "@@/auth";
import Stripe from "stripe";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
  paymentIntentId: string
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

/**
 * Maneja el evento 'invoice.payment_succeeded'.
 * @param invoice - Objeto Stripe.Invoice
 */
export async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  const status = "active";
  const currentPeriodEnd = invoice.period_end;

  console.log("Valor numérico de currentPeriodEnd:", invoice.period_end);
  console.log(
    "Fecha convertida de currentPeriodEnd:",
    new Date(invoice.period_end * 1000).toISOString()
  );

  const user = await getUserBySubscriptionId(subscriptionId);
  if (!user) {
    console.error(
      `Usuario no encontrado para la suscripción: ${subscriptionId}`
    );
    return;
  }

  if (!currentPeriodEnd) {
    console.error(
      `current_period_end no está definido para la suscripción: ${subscriptionId}`
    );
    return;
  }

  await updatePremiumStatus(user.id, subscriptionId, status, currentPeriodEnd);

  console.log(`Pago exitoso para suscripción: ${subscriptionId}`);

  if (invoice.payment_intent) {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      invoice.payment_intent as string
    );

    const paymentMethodId = paymentIntent.payment_method as string;
    if (paymentMethodId) {
      const customer = await stripe.customers.retrieve(user.stripe_customer_id);

      if (!("deleted" in customer) || !customer.deleted) {
        await stripe.customers.update(customer.id, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
        console.log(
          "Método de pago predeterminado actualizado:",
          paymentMethodId
        );
      }
    }
  }
}

interface CreateSubscriptionParams {
  cardholderName: string;
  priceId: string;
  paymentMethodId: string;
}

interface CreateSubscriptionResponse {
  clientSecret: string;
}

export async function createSubscription(
  params: CreateSubscriptionParams
): Promise<CreateSubscriptionResponse> {
  const { cardholderName, priceId } = params;
  const session = (await auth()) as Session;
  const status = "pending";

  const user = await getUserById(session.user.id);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  try {
    let stripeCustomerId = user.stripe_customer_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: cardholderName,
      });
      stripeCustomerId = customer.id;

      await updateUserStripeCustomerId(user.id, stripeCustomerId);
    }

    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    const currentPeriodEnd = subscription.current_period_end;

    await updatePremiumStatus(
      user.id,
      subscription.id,
      status,
      currentPeriodEnd
    );

    const paymentMethodId = paymentIntent.payment_method as string;
    if (paymentMethodId) {
      await stripe.customers.update(stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      console.log(
        "Método de pago predeterminado actualizado:",
        paymentMethodId
      );
    }

    const customer = await stripe.customers.retrieve(stripeCustomerId);

    if ("deleted" in customer && customer.deleted) {
      console.log("El cliente ha sido eliminado");
    } else {
      console.log(
        "Método de pago predeterminado:",
        customer.invoice_settings.default_payment_method
      );
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
  const session = (await auth()) as Session;
  if (!session?.user) {
    return { isPremium: false };
  }

  const user = await getUserById(session.user.id);
  return { isPremium: user?.is_premium || false };
}

/**
 * Maneja el evento 'customer.subscription.deleted'.
 * @param subscription - Objeto Stripe.Subscription
 */
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const subscriptionId = subscription.id;
  const status = subscription.status;
  const customerId = subscription.customer as string;
  const currentPeriodEnd = subscription.current_period_end;

  const user = await getUserBySubscriptionId(subscriptionId);
  if (!user) {
    console.error(
      `Usuario no encontrado para la suscripción: ${subscriptionId}`
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

    await updatePremiumStatus(
      user.id,
      activeSubscription.id,
      activeSubscription.status,
      activeSubscription.current_period_end
    );

    console.log(
      `El cliente ${customerId} aún tiene una suscripción activa (ID: ${activeSubscription.id}). Se ha actualizado la suscripción activa para el usuario.`
    );
    return;
  }

  await updatePremiumStatus(user.id, null, status, null);

  console.log(`Suscripción eliminada: ${subscriptionId}, Estado: ${status}`);
}

/**
 * Maneja el evento 'customer.subscription.updated'.
 * @param subscription - Objeto Stripe.Subscription
 */
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  const subscriptionId = subscription.id;
  const status = subscription.status;
  const currentPeriodEnd = subscription.current_period_end;

  const user = await getUserBySubscriptionId(subscriptionId);
  if (!user) {
    console.error(
      `Usuario no encontrado para la suscripción: ${subscriptionId}`
    );
    return;
  }

  await updatePremiumStatus(user.id, subscriptionId, status, currentPeriodEnd);

  console.log(`Suscripción actualizada: ${subscriptionId}, Estado: ${status}`);
}

export async function handleCustomerDeleted(customer: Stripe.Customer) {
  const customerId = customer.id;

  const user = await getStripeCustomerId(customerId);
  if (!user) {
    console.error(`Usuario no encontrado para el cliente: ${customerId}`);
    return;
  }

  await deleteUserStripeCustomer(user.id);

  console.log(
    `Cliente eliminado y datos actualizados en la base de datos: ${customerId}`
  );
}

export async function handleInvoiceFinalized(finalizedSubscriptionId: string) {
  if (finalizedSubscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        finalizedSubscriptionId
      );

      if (subscription.status === "incomplete") {
        console.log(
          `Deleting incomplete subscription: ${finalizedSubscriptionId}`
        );

        await stripe.subscriptions.cancel(finalizedSubscriptionId);

        console.log(
          `Subscription ${finalizedSubscriptionId} deleted successfully.`
        );
      } else {
        console.log(
          `Subscription ${finalizedSubscriptionId} is not incomplete. Current status: ${subscription.status}`
        );
      }
    } catch (error) {
      console.error(
        `Error retrieving or deleting subscription ${finalizedSubscriptionId}:`,
        error
      );
    }
  } else {
    console.log("No subscription associated with the finalized invoice.");
  }
}

export async function getUserCurrentPlan(session: Session): Promise<string> {
  if (!session || !session.user.email) return siteConfig.planPrices.free;

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

/**
 * Establece el plan del usuario.
 * @param session - Sesión del usuario.
 * @param priceId - ID del precio seleccionado.
 */
export async function setUserPlan(
  session: Session,
  priceId: string,
  cancelReason?: string
): Promise<{ success: boolean; message: string }> {
  if (!session || !session.user.id) {
    return { success: false, message: "Usuario no autenticado." };
  }

  const userId = session.user.id;
  const subscriptionId = await getSubscriptionId(userId);

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
          `Suscripción ${subscriptionId} marcada para cancelar al final del período.`
        );
      } catch (error: any) {
        console.error(
          "Error al marcar la suscripción para cancelación:",
          error
        );
        return {
          success: false,
          message: "Error al marcar la suscripción para cancelación en Stripe.",
        };
      }
    }

    try {
      await updatePremiumStatus(userId, subscriptionId, "active", null);

      return {
        success: true,
        message: "El plan se actualizará a Gratis al final del período.",
      };
    } catch (error) {
      console.error("Error actualizando el estado premium:", error);
      return {
        success: false,
        message: "Error al actualizar el plan a Gratis.",
      };
    }
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
    (sub: { status: string }) => sub.status === "active"
  );

  const subscriptionToUse = activeSubscription || subscriptions.data[0];

  let paymentMethod = null;
  if (customer.invoice_settings.default_payment_method) {
    paymentMethod = await stripe.paymentMethods.retrieve(
      customer.invoice_settings.default_payment_method as string
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
  paymentMethodId: string
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
