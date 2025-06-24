"use server";

import { cookies } from "next/headers";
import { Session } from "next-auth";
import Stripe from "stripe";

import { auth } from "@/app/(auth)/auth";
import { siteConfig } from "@/config/site.config";
import {
  archiveExceedingDocuments,
  unarchiveDocuments,
} from "@/db/querys/medical-history-querys";
import {
  deletePendingPayment,
  deleteSubscription,
  getSubscription,
  getSubscriptionBySubscriptionId,
  getSubscriptionsByClientId,
  setPaymentDetails,
  updateClientId,
  updatePaymentDetails,
  updateSubscription,
  updateSubscriptionFutureType,
} from "@/db/querys/payment-querys";
import {
  cancelUserTrial,
  getUserById,
  getUserTrialStatus,
} from "@/db/querys/user-querys";
import { BASE_PUBLIC_URL } from "@/lib/consts";
import stripe from "@/utils/stripe";

type PlanType = "free" | "premium" | "premium-plus";

const planRank: Record<PlanType, number> = {
  free: 0,
  premium: 1,
  "premium-plus": 2,
};

export async function createSubscription({
  priceId,
}: {
  priceId: string;
}): Promise<{ checkoutUrl: string | null; downgraded?: boolean }> {
  const session = await auth();
  const cookieStore = await cookies();

  const [user] = await getUserById(session?.user?.id as string);
  if (!user) throw new Error("Usuario no encontrado.");

  const [existingSubscription] = await getSubscription(user.id);
  let customerId = existingSubscription?.clientId || null;

  const newPlanType =
    priceId === siteConfig.priceId.premium
      ? "premium"
      : priceId === siteConfig.priceId.premiumPlus
        ? "premium-plus"
        : "free";

  const currentPlanType = (existingSubscription?.type ?? "free") as PlanType;

  const isDowngrade = planRank[newPlanType] < planRank[currentPlanType];

  try {
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email });
      customerId = customer.id;
      await updateClientId(user.id, customerId);
    }

    if (isDowngrade && existingSubscription?.subscriptionId) {
      await stripe.subscriptions.update(existingSubscription.subscriptionId, {
        cancel_at_period_end: true,
        metadata: {
          future_plan: newPlanType,
        },
      });

      await updateSubscriptionFutureType(user.id, newPlanType);

      console.log(
        `Downgrade programado. Plan actual (${currentPlanType}) se cancelará al final del período.`,
      );
      return {
        checkoutUrl: null,
        downgraded: true,
      };
    }

    if (existingSubscription?.subscriptionId) {
      await stripe.subscriptions.cancel(existingSubscription.subscriptionId);
    }

    const cancelUrl = cookieStore.get("stripe_cancel_url")?.value;

    const sessionCheckout = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      success_url: `${BASE_PUBLIC_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${BASE_PUBLIC_URL}/payment/cancel`,
    });

    cookieStore.delete("stripe_cancel_url");

    const price = await stripe.prices.retrieve(priceId);

    await deletePendingPayment(user.id);

    if (price.unit_amount && price.currency) {
      await setPaymentDetails(
        user.id,
        "pending",
        price.unit_amount,
        price.currency,
        new Date(),
        newPlanType,
      );
    }

    return { checkoutUrl: sessionCheckout.url as string };
  } catch (error) {
    console.error("Error creando suscripción:", error);
    throw error;
  }
}

export async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
  const customerId = stripeSub.customer as string;
  const currentPeriodEnd = stripeSub.current_period_end;

  const priceId = stripeSub.items.data[0].price.id;

  const planType =
    priceId === siteConfig.priceId.premium
      ? siteConfig.plan.premium
      : priceId === siteConfig.priceId.premiumPlus
        ? siteConfig.plan.premiumPlus
        : siteConfig.plan.free;

  try {
    const dbSub = await getSubscriptionBySubscriptionId(subscriptionId);
    if (!dbSub) {
      console.error(
        `No se encontró la subscripción en la BD: ${subscriptionId}`,
      );
      return;
    }

    const trial = await getUserTrialStatus(dbSub.userId);
    if (trial?.isActive) {
      await cancelUserTrial(dbSub.userId);
    }

    const currentPlan = (dbSub.type ?? "free") as PlanType;
    const newPlan = planType as PlanType;

    const currentPlanRank = planRank[currentPlan];
    const newPlanRank = planRank[newPlan];

    if (newPlanRank < currentPlanRank) {
      console.log(
        `Downgrade detectado (${dbSub.type} → ${planType}). No se actualiza la BD hasta el final del período.`,
      );

      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
        metadata: {
          future_plan: planType,
        },
      });

      return;
    }

    await updateSubscription(
      dbSub.userId,
      subscriptionId,
      currentPeriodEnd,
      "active",
      planType as PlanType,
    );

    const paymentStatus = "paid";
    const processedAt = new Date();

    const updatedRows = await updatePaymentDetails(
      dbSub.userId,
      paymentStatus,
      processedAt,
    );

    if (updatedRows === 0) {
      await setPaymentDetails(
        dbSub.userId,
        paymentStatus,
        invoice.amount_paid,
        invoice.currency,
        processedAt,
        planType as PlanType,
      );
    }

    if (invoice.payment_intent) {
      const pi = await stripe.paymentIntents.retrieve(
        invoice.payment_intent as string,
      );
      if (pi.payment_method) {
        await stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: pi.payment_method as string,
          },
        });
        console.log("Método de pago predeterminado actualizado");
      }
    }
  } catch (error) {
    console.error(
      "Error actualizando la suscripción tras pago exitoso:",
      error,
    );
  }
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
) {
  const subscriptionId = subscription.id;

  try {
    const dbSub = await getSubscriptionBySubscriptionId(subscriptionId);
    if (!dbSub) {
      console.error(
        `No se encontró la suscripción en la BD: ${subscriptionId}`,
      );
      return;
    }

    const futurePlan = subscription.metadata?.future_plan as
      | PlanType
      | undefined;
    const finalPlan = futurePlan ?? siteConfig.plan.free;

    await updateSubscription(
      dbSub.userId,
      null,
      null,
      "paused",
      finalPlan as PlanType,
      true,
    );

    await updateSubscriptionFutureType(dbSub.userId, null);

    await archiveExceedingDocuments(dbSub.userId);
  } catch (error) {
    console.error(
      `Error al manejar eliminación de subscripción ${subscriptionId}`,
      error,
    );
  }
}

export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
) {
  const subscriptionId = subscription.id;
  const status = subscription.status;
  const priceId = subscription.items.data[0].price.id;
  const currentPeriodEnd = subscription.current_period_end;
  const clientId = subscription.customer as string;

  const planType =
    priceId === siteConfig.priceId.premium
      ? siteConfig.plan.premium
      : priceId === siteConfig.priceId.premiumPlus
        ? siteConfig.plan.premiumPlus
        : siteConfig.plan.free;

  try {
    const [dbSub] = await getSubscriptionsByClientId(clientId);
    if (!dbSub) {
      console.error(`No found DB subscription for client ${clientId}`);
      return;
    }

    const currentPlan = (dbSub.type ?? "free") as PlanType;
    const newPlan = planType as PlanType;

    const currentPlanRank = planRank[currentPlan];
    const newPlanRank = planRank[newPlan];

    if (newPlanRank < currentPlanRank) {
      console.log(
        `Downgrade detectado (${currentPlan} → ${newPlan}) en creación. No se actualiza en la BD hasta el final del período.`,
      );
      return;
    }

    await updateSubscription(
      dbSub.userId,
      subscriptionId,
      currentPeriodEnd,
      status,
      newPlan,
    );
  } catch (error) {
    console.error(
      `Error al manejar la creación de la suscripción ${subscriptionId}`,
      error,
    );
  }
}

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
) {
  const subscriptionId = subscription.id;
  const status = subscription.cancel_at_period_end
    ? "canceled"
    : subscription.status;
  const priceId = subscription.items.data[0].price.id;
  const currentPeriodEnd = subscription.current_period_end;

  const planType =
    priceId === siteConfig.priceId.premium
      ? siteConfig.plan.premium
      : priceId === siteConfig.priceId.premiumPlus
        ? siteConfig.plan.premiumPlus
        : siteConfig.plan.free;

  try {
    const dbSub = await getSubscriptionBySubscriptionId(subscriptionId);
    if (!dbSub) {
      console.error(
        `No se encontró la subscripción en la BD: ${subscriptionId}`,
      );
      return;
    }

    const currentPlan = (dbSub.type ?? "free") as PlanType;
    const newPlan = planType as PlanType;

    const currentPlanRank = planRank[currentPlan];
    const newPlanRank = planRank[newPlan];

    if (newPlanRank < currentPlanRank) {
      console.log(
        `Downgrade detectado (${currentPlan} → ${newPlan}) en actualización. No se actualiza en la BD hasta la expiración.`,
      );
      return;
    }

    await updateSubscription(
      dbSub.userId,
      subscriptionId,
      currentPeriodEnd,
      status,
      newPlan,
    );

    if (newPlanRank > currentPlanRank) {
      await unarchiveDocuments(dbSub.userId);
    }
  } catch (error) {
    console.error(
      `Error al actualizar la suscripción ${subscriptionId}`,
      error,
    );
  }
}

export async function handleCustomerDeleted(customer: Stripe.Customer) {
  if (!customer?.id) {
    console.error("No se pudo obtener el cliente eliminado.");
    return;
  }

  try {
    const subs = await getSubscriptionsByClientId(customer.id);
    for (const sub of subs) {
      await deleteSubscription(sub.userId);
    }
  } catch (error) {
    console.error("Error al eliminar el cliente y sus suscripciones:", error);
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
