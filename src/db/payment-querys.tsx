"use server";

import { createPool, sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

import { calculatePremiumExpiresAt } from "@/modules/payment/lib/utils";
import { Payment, User } from "@/types/session";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function updatePremiumStatus(
  userId: string,
  subscriptionId: string | null,
  status: string,
  currentPeriodEnd: number | null,
): Promise<void> {
  if (!userId || !status) {
    throw new Error("userId y status son requeridos");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const currentUserResult = await client.query(
      `SELECT is_premium, premium_expires_at, subscription_id FROM users WHERE id = $1`,
      [userId],
    );

    const currentIsPremium = currentUserResult.rows[0]?.is_premium;
    const currentPremiumExpiresAt =
      currentUserResult.rows[0]?.premium_expires_at;
    const currentSubscriptionId = currentUserResult.rows[0]?.subscription_id;

    let isPremium: boolean;
    let premiumExpiresAt: string | null = null;

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

    if (
      isPremium !== currentIsPremium ||
      premiumExpiresAt !== currentPremiumExpiresAt ||
      subscriptionId !== currentSubscriptionId
    ) {
      const updateQuery = `
          UPDATE users 
          SET 
            is_premium = $1, 
            premium_expires_at = $2, 
            subscription_id = $3,
            subscription_status = $4,
            updated_at = NOW()
          WHERE id = $5;
        `;

      const values = [
        isPremium,
        premiumExpiresAt,
        subscriptionId,
        status,
        userId,
      ];

      await client.query(updateQuery, values);

      // Opcional: revalidar rutas si es necesario
      revalidatePath("/essentia-ai");
      revalidatePath("/perfil");
      revalidatePath("/premium");

      console.log(`Estado premium actualizado para el usuario: ${userId}`);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error actualizando el estado premium:", error);
    throw new Error("Error actualizando el estado premium.");
  } finally {
    client.release();
  }
}

// Función para limpiar todos los datos de la suscripción cuando se elimina el customer de stripe en la base de datos
export async function deleteUserStripeCustomer(userId: string): Promise<void> {
  if (!userId) {
    throw new Error("userId es requerido");
  }

  const query = `
      UPDATE users 
      SET 
        is_premium = FALSE, 
        premium_expires_at = NULL, 
        subscription_id = NULL,
        subscription_status = NULL,
        updated_at = NOW()
      WHERE id = $1;
    `;
  const values = [userId];

  try {
    await sql.query(query, values);
    revalidatePath("/perfil");
  } catch (error) {
    console.error("Error al eliminar el customer:", error);
    throw new Error("Error al eliminar el customer.");
  }
}

export async function getStripeCustomerById(
  userId: string,
): Promise<string | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT stripe_customer_id FROM users WHERE id = $1",
      [userId],
    );
    return res.rows[0]?.stripe_customer_id || null;
  } catch (error) {
    console.error("Error al obtener el stripe_customer_id:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getStripeCustomerId(
  customerId: string,
): Promise<User | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT id FROM users WHERE stripe_customer_id = $1",
      [customerId],
    );
    return res.rows[0]?.id || null;
  } catch (error) {
    console.error("Error al obtener el id del usuario", error);
    throw error;
  } finally {
    client.release();
  }
}

// Función para actualizar el subscriptionId en la base de datos
export async function updateSubscriptionId(
  userId: string,
  subscriptionId: string,
): Promise<void> {
  console.log(
    "Updating subscriptionId for user:",
    userId,
    "with subscriptionId:",
    subscriptionId,
  );
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("UPDATE users SET subscription_id = $1 WHERE id = $2", [
      subscriptionId,
      userId,
    ]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error al actualizar el subscriptionId en la base de datos:",
      error,
    );
    throw error;
  } finally {
    client.release();
  }
}

// Función para obtener el subscriptionId desde la base de datos
export async function getSubscriptionId(
  userId: string,
): Promise<string | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT subscription_id FROM users WHERE id = $1",
      [userId],
    );
    return res.rows[0]?.subscription_id || null;
  } catch (error) {
    console.error(
      "Error al obtener el subscriptionId de la base de datos:",
      error,
    );
    throw error;
  } finally {
    client.release();
  }
}

// Función para cancelar la suscripción en la base de datos
export async function cancelSubscription(userId: string): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "UPDATE users SET is_premium = FALSE, premium_expires_at = NULL, subscription_id = NULL WHERE id = $1",
      [userId],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error al cancelar la suscripción en la base de datos:",
      error,
    );
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Actualiza el `stripe_customer_id` del usuario en la base de datos.
 * @param userId - ID del usuario en la base de datos.
 * @param customerId - ID del cliente en Stripe.
 */
export async function updateUserStripeCustomerId(
  userId: string,
  stripeCustomerId: string,
): Promise<void> {
  try {
    await pool.sql`
        UPDATE users 
        SET stripe_customer_id = ${stripeCustomerId} 
        WHERE id = ${userId};
      `;
    revalidatePath("/perfil");
  } catch (error) {
    console.error("Error actualizando stripe_customer_id:", error);
    throw new Error("Error actualizando stripe_customer_id.");
  }
}

export async function getPaymentDetails(
  userId: string,
): Promise<Payment[] | null> {
  if (!userId) {
    throw new Error("userId es requerido");
  }

  const result = await pool.sql<{
    payment_intent_id: string;
    amount: number;
    currency: string;
    processed_at: string;
  }>`
      SELECT payment_intent_id, amount, currency, processed_at 
      FROM processed_payments 
      WHERE user_id = ${userId} 
      ORDER BY processed_at DESC;
    `;

  if (result.rows.length === 0) {
    return null;
  }

  const payments: Payment[] = result.rows.map((row) => ({
    paymentIntentId: row.payment_intent_id,
    amount: row.amount,
    currency: row.currency,
    date: new Date(row.processed_at).toLocaleDateString(),
  }));

  return payments;
}
