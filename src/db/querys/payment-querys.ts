"use server";

import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  user,
  subscription,
  type Subscription,
  payment,
  type Payment,
} from "@/db/schema";
import { calculatePremiumExpiresAt } from "@/lib/utils";

import type { PaymentHistory } from "@/lib/types";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function updateSubscription(
  userId: string,
  subscriptionId: string | null,
  currentPeriodEnd: number | null,
  status?: string | null,
  type?: "free" | "premium" | "premium-plus" | null,
  isDeleted?: boolean,
): Promise<void> {
  if (!userId) {
    throw new Error("userId es requerido");
  }

  try {
    if (isDeleted) {
      await db
        .update(subscription)
        .set({
          subscriptionId: null,
          clientId: null,
          isPremium: false,
          status: "paused",
          type: "free",
          expiresAt: null,
        })
        .where(eq(subscription.userId, userId));
      return;
    }

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

export async function getSubscriptionType(userId: string): Promise<{
  type: "free" | "premium" | "premium-plus" | null;
}> {
  try {
    const result = await db
      .select({
        type: subscription.type,
      })
      .from(subscription)
      .where(eq(subscription.userId, userId))
      .limit(1);

    return result[0];
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}

export async function getSubscriptionsByClientId(
  clientId: string,
): Promise<Array<Subscription>> {
  try {
    return await db
      .select()
      .from(subscription)
      .where(eq(subscription.clientId, clientId));
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}

export async function getSubscriptionBySubscriptionId(
  subscriptionId: string,
): Promise<Subscription | null> {
  try {
    const result = await db
      .select()
      .from(subscription)
      .where(eq(subscription.subscriptionId, subscriptionId))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error("Error al obtener la suscripción por ID:", error);
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
  status: "paid" | "pending",
  amount: number | null,
  currency: string,
  processedAt: Date,
  plan: "free" | "premium" | "premium-plus",
) {
  try {
    await db.insert(payment).values({
      userId,
      status,
      amount,
      currency,
      processedAt,
      plan,
    });
  } catch (error) {
    console.error("Error al insertar los detalles de pago:", error);
    throw error;
  }
}

export async function updatePaymentDetails(
  userId: string,
  status: "paid" | "pending",
  processedAt: Date,
): Promise<number> {
  try {
    const result = await db
      .update(payment)
      .set({ status, processedAt })
      .where(and(eq(payment.userId, userId), eq(payment.status, "pending")))
      .returning();

    return result.length;
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
      .orderBy(desc(payment.processedAt))
      .limit(1);
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}

export async function getPaymentHistory(
  userId: string,
): Promise<Array<PaymentHistory>> {
  try {
    return await db
      .select({
        payment: payment,
        type: subscription.type,
      })
      .from(payment)
      .innerJoin(subscription, eq(payment.userId, subscription.userId))
      .where(eq(payment.userId, userId))
      .orderBy(desc(payment.processedAt))
      .limit(10);
  } catch (error) {
    console.error("Error al obtener la suscripción del usuario:", error);
    throw error;
  }
}
