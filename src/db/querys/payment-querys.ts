"use server";

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  user,
  subscription,
  type Subscription,
  payment,
  type Payment,
} from "@/db/schema";
import { calculatePremiumExpiresAt } from "@/modules/payment/lib/utils";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function updateSubscription(
  userId: string,
  subscriptionId: string | null,
  currentPeriodEnd: number | null,
  status?: string,
  type?: string | null,
): Promise<void> {
  if (!userId) {
    throw new Error("userId es requerido");
  }

  try {
    const [currentUser] = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, userId))
      .limit(1);

    const currentIsPremium = currentUser.isPremium;
    const currentPremiumExpiresAt = currentUser.expiresAt;
    const currentSubscriptionId = currentUser.subscriptionId;

    let isPremium: boolean;
    let premiumExpiresAt: Date | null = null;

    if (status === "active") {
      isPremium = true;
      if (currentPeriodEnd) {
        premiumExpiresAt = calculatePremiumExpiresAt(currentPeriodEnd);
      }
    } else if (status === "canceled") {
      if (currentPeriodEnd && subscriptionId === currentSubscriptionId) {
        isPremium = true;
        premiumExpiresAt = calculatePremiumExpiresAt(currentPeriodEnd);
      } else {
        isPremium = false;
        premiumExpiresAt = null;
      }
    } else if (status === "unpaid" || status === "deleted") {
      isPremium = false;
      premiumExpiresAt = null;
    } else {
      isPremium = currentIsPremium;
      premiumExpiresAt = currentPremiumExpiresAt;
    }

    await db
      .update(subscription)
      .set({
        isPremium,
        expiresAt: premiumExpiresAt,
        subscriptionId,
        status,
        type,
      })
      .where(eq(subscription.userId, userId));

    await db
      .update(user)
      .set({
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}

export async function deleteSubscription(userId: string): Promise<void> {
  if (!userId) {
    throw new Error("userId es requerido");
  }
  try {
    await db
      .update(subscription)
      .set({
        subscriptionId: null,
        clientId: null,
        isPremium: false,
        status: null,
        type: null,
        expiresAt: null,
      })
      .where(eq(subscription.userId, userId));

    await db
      .update(user)
      .set({
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));
  } catch (error) {
    console.error("Error al eliminar el customer:", error);
    throw error;
  }
}

export async function getSubscription(
  userId: string,
): Promise<Array<Subscription>> {
  try {
    return await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, userId));
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}

export async function getSubscriptionByClientId(
  clientId: string,
): Promise<Array<Subscription>> {
  try {
    return await db
      .select()
      .from(subscription)
      .where(eq(subscription.clientId, clientId))
      .limit(1);
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}

export async function updateClientId(
  userId: string,
  clientId: string,
): Promise<void> {
  try {
    await db
      .update(subscription)
      .set({
        clientId,
      })
      .where(eq(subscription.userId, userId));
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}

export async function cancelSubscription(userId: string): Promise<void> {
  try {
    await db
      .update(subscription)
      .set({
        status: "canceled",
      })
      .where(eq(subscription.userId, userId));
  } catch (error) {
    console.error("Error al cancelar la suscripción:", error);
    throw error;
  }
}

export async function setPaymentDetails(
  userId: string,
  status: string,
  amount: number | null,
  currency: string,
  processedAt: Date,
) {
  try {
    await db.insert(payment).values({
      userId,
      status,
      amount,
      currency,
      processedAt,
    });
  } catch (error) {
    console.error("Error al insertar los detalles de pago:", error);
    throw error;
  }
}

export async function updatePaymentDetails(
  userId: string,
  status: string,
  processedAt: Date,
) {
  try {
    await db
      .update(payment)
      .set({ status, processedAt })
      .where(eq(payment.userId, userId));
  } catch (error) {
    console.error("Error al actualizar los detalles de pago:", error);
    throw error;
  }
}

export async function getPaymentDetails(
  userId: string,
): Promise<Array<Payment>> {
  try {
    return await db
      .select()
      .from(payment)
      .where(eq(payment.userId, userId))
      .limit(1);
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}
