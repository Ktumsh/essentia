"use server";

import { calculatePremiumExpiresAt } from "@/modules/payment/lib/utils";
import { Payment, User, UserProfile, UserProfileData } from "@/types/session";
import { createPool, sql } from "@vercel/postgres";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function insertEmailVerificationToken(
  userId: string,
  token: string
): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  await pool.sql`
    INSERT INTO email_verifications (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt.toISOString()});
  `;
}

export async function getVerificationToken(token: string) {
  const result = await pool.sql`
    SELECT * FROM email_verifications WHERE token = ${token} LIMIT 1;
  `;
  return result.rows[0] || null;
}

export async function resendEmailVerification(userId: string, email: string) {
  try {
    const newToken = nanoid();

    const result = await pool.sql`
      UPDATE email_verifications
      SET token = ${newToken}, expires_at = NOW() + INTERVAL '24 hours'
      WHERE user_id = ${userId};
    `;

    if (result.rowCount === 0) {
      throw new Error(
        "No se pudo actualizar el token de verificación para el usuario."
      );
    }

    const response = await fetch("/api/send-verification-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        token: newToken,
      }),
    });

    const resultJson = await response.json();

    if (resultJson.success) {
      return {
        status: "success",
        message: "Se ha enviado un nuevo correo de verificación.",
      };
    } else {
      throw new Error("Error al enviar el correo de verificación.");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al reenviar el correo de verificación:", error);

      return {
        status: "error",
        message: "Ocurrió un error al reenviar el correo de verificación.",
      };
    }
  }
}

export async function updateEmailVerified(userId: string) {
  try {
    await pool.sql`
      UPDATE users
      SET email_verified = TRUE, updated_at = NOW()
      WHERE id = ${userId};
    `;
  } catch (error) {
    console.error("Error al marcar el correo como verificado:", error);
  }
}

export async function deleteVerificationToken(token: string) {
  try {
    const result = await pool.sql`
      DELETE FROM email_verifications WHERE token = ${token};
    `;

    if (result.rowCount === 0) {
      throw new Error(`No se encontró ningún token con el valor: ${token}`);
    }

    return {
      status: "success",
      message: "El token de verificación ha sido eliminado correctamente.",
    };
  } catch (error) {
    console.error("Error al eliminar el token de verificación:", error);
    return {
      status: "error",
      message: "Ocurrió un error al eliminar el token de verificación.",
    };
  }
}

//Get user by id
export async function getUserById(userId: string): Promise<User | null> {
  const result = await pool.sql<User>`
    SELECT * FROM users WHERE id = ${userId} LIMIT 1;
  `;
  return result.rows[0] || null;
}

//Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await pool.sql<User>`
    SELECT * FROM users WHERE email = ${email} LIMIT 1;
  `;
  return result.rows[0] || null;
}

//Get user by username
export async function getUserByUsername(
  username: string
): Promise<User | null> {
  const result = await pool.sql<User>`
    SELECT * FROM users WHERE username = ${username} LIMIT 1;
  `;
  return result.rows[0] || null;
}

//Get profile by user id
export async function getProfile(userId: string): Promise<UserProfile | null> {
  const result = await pool.sql<UserProfile>`
    SELECT * FROM user_profiles WHERE user_id = ${userId} LIMIT 1;
  `;
  return result.rows[0] || null;
}

export async function getProfileNameByEmail(
  email: string
): Promise<UserProfile | null> {
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }

  const result = await pool.sql<UserProfile>`
    SELECT first_name, last_name FROM user_profiles WHERE user_id = ${user?.id} LIMIT 1;
  `;

  return result.rows[0] || null;
}

//Get user and profile by email
export async function getUserProfileByEmail(
  email: string
): Promise<{ user: User; profile: UserProfile } | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const profile = await getProfile(user.id);
  if (!profile) return null;

  return { user, profile };
}

//Get user and profile by username
export async function getUserProfileByUsername(
  username: string
): Promise<{ user: User; profile: UserProfile } | null> {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const profile = await getProfile(user.id);
  if (!profile) return null;
  return { user, profile };
}

//Get password and salt by id
export async function getPasswordAndSaltById(
  userId: string
): Promise<{ password: string | null; salt: string | null }> {
  const result = await pool.sql`
    SELECT password_hash, salt FROM users WHERE id = ${userId};
  `;

  const row = result.rows[0];

  return {
    password: row?.password_hash || null,
    salt: row?.salt || null,
  };
}

// Update user password and salt by id
export async function updatePasswordAndSaltById(
  userId: string,
  password: string,
  salt: string
) {
  const result = await pool.sql`
    UPDATE users
    SET password_hash = ${password}, salt = ${salt}
    WHERE id = ${userId};
  `;

  return result;
}

// Actualizar el perfil de un usuario
export async function updateUserProfile(profileData: Partial<UserProfileData>) {
  const {
    id,
    first_name,
    last_name,
    birthdate,
    profile_image,
    bio,
    location,
    banner_image,
    username,
  } = profileData;

  if (!id) {
    return { error: "ID de usuario es requerido" };
  }

  const queryProfile = `
    UPDATE user_profiles 
    SET 
      first_name = COALESCE($1, first_name), 
      last_name = COALESCE($2, last_name), 
      birthdate = COALESCE($3, birthdate), 
      profile_image = COALESCE($4, profile_image), 
      bio = COALESCE($5, bio), 
      location = COALESCE($6, location), 
      banner_image = COALESCE($7, banner_image), 
      updated_at = NOW()
    WHERE user_id = $8
    RETURNING *;
  `;

  const profileValues = [
    first_name,
    last_name,
    birthdate,
    profile_image,
    bio,
    location,
    banner_image,
    id,
  ];

  try {
    const resProfile = await sql.query(queryProfile, profileValues);
    if (resProfile.rowCount === 0) {
      console.error("Error al actualizar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    if (username) {
      const queryUser = `
        UPDATE users 
        SET username = $1 
        WHERE id = $2
        RETURNING *;
      `;

      const userValues = [username, id];

      const resUser = await sql.query(queryUser, userValues);
      if (resUser.rowCount === 0) {
        console.error(
          "Error al actualizar: Usuario no encontrado en tabla 'users'"
        );
        return { error: "Usuario no encontrado en tabla 'users'" };
      }
    }

    revalidatePath("/perfil");

    const updatedProfile = {
      ...resProfile.rows[0],
      username: username || resProfile.rows[0].username,
    };

    return updatedProfile;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return { error: "Error interno del servidor" };
  }
}

// Actualizar la foto de perfil de un usuario
export async function updateUserPhoto(
  userId: string,
  profileImageData: string
) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  const query = `
    UPDATE user_profiles 
    SET 
      profile_image = $1, 
      updated_at = NOW()
    WHERE user_id = $2
    RETURNING profile_image;
  `;

  const values = [profileImageData, userId];

  try {
    const res = await sql.query(query, values);
    if (res.rowCount === 0) {
      console.error("Error al actualizar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    revalidatePath("/perfil");

    return res.rows[0];
  } catch (error) {
    console.error("Error al actualizar la foto de perfil:", error);
    return { error: "Error interno del servidor" };
  }
}

// Eliminar la foto de perfil de un usuario
export async function deleteUserPhoto(userId: string) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  const query = `
    UPDATE user_profiles 
    SET 
      profile_image = NULL, 
      updated_at = NOW()
    WHERE user_id = $1
    RETURNING profile_image;
  `;

  const values = [userId];

  try {
    const res = await sql.query(query, values);
    if (res.rowCount === 0) {
      console.error("Error al eliminar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    revalidatePath("/perfil");

    return res.rows[0];
  } catch (error) {
    console.error("Error al eliminar la foto de perfil:", error);
    return { error: "Error interno del servidor" };
  }
}

// Actualizar el banner de un usuario
export async function updateUserBanner(userId: string, bannerData: string) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  const query = `
    UPDATE user_profiles 
    SET 
      banner_image = $1, 
      updated_at = NOW()
    WHERE user_id = $2
    RETURNING banner_image;
  `;

  const values = [bannerData, userId];

  try {
    const res = await sql.query(query, values);
    if (res.rowCount === 0) {
      console.error("Error al actualizar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    revalidatePath("/perfil");

    return res.rows[0];
  } catch (error) {
    console.error("Error al actualizar el banner:", error);
    return { error: "Error interno del servidor" };
  }
}

// Eliminar el banner de un usuario
export async function deleteUserBanner(userId: string) {
  if (!userId) {
    return { error: "ID de usuario es requerido" };
  }

  const query = `
    UPDATE user_profiles 
    SET 
      banner_image = NULL, 
      updated_at = NOW()
    WHERE user_id = $1
    RETURNING banner_image;
  `;

  const values = [userId];

  try {
    const res = await sql.query(query, values);
    if (res.rowCount === 0) {
      console.error("Error al eliminar: Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    revalidatePath("/perfil");

    return res.rows[0];
  } catch (error) {
    console.error("Error al eliminar el banner:", error);
    return { error: "Error interno del servidor" };
  }
}

/**
 * Actualiza el estado premium del usuario en la base de datos.
 * @param userId - ID del usuario.
 * @param subscriptionId - ID de la suscripción en Stripe.
 * @param status - Estado de la suscripción ('active', 'canceled', 'unpaid', etc.).
 * @param currentPeriodEnd - Fecha de finalización del periodo de suscripción en formato Unix (segundos).
 */
export async function updatePremiumStatus(
  userId: string,
  subscriptionId: string | null,
  status: string,
  currentPeriodEnd: number | null
): Promise<void> {
  if (!userId || !status) {
    throw new Error("userId y status son requeridos");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const currentUserResult = await client.query(
      `SELECT is_premium, premium_expires_at, subscription_id FROM users WHERE id = $1`,
      [userId]
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
      let updateQuery = `
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
  userId: string
): Promise<string | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT stripe_customer_id FROM users WHERE id = $1",
      [userId]
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
  customerId: string
): Promise<User | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT id FROM users WHERE stripe_customer_id = $1",
      [customerId]
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
  subscriptionId: string
): Promise<void> {
  console.log(
    "Updating subscriptionId for user:",
    userId,
    "with subscriptionId:",
    subscriptionId
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
      error
    );
    throw error;
  } finally {
    client.release();
  }
}

// Función para obtener el subscriptionId desde la base de datos
export async function getSubscriptionId(
  userId: string
): Promise<string | null> {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT subscription_id FROM users WHERE id = $1",
      [userId]
    );
    return res.rows[0]?.subscription_id || null;
  } catch (error) {
    console.error(
      "Error al obtener el subscriptionId de la base de datos:",
      error
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
      [userId]
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "Error al cancelar la suscripción en la base de datos:",
      error
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
  stripeCustomerId: string
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

/**
 * Obtiene el usuario por el ID de la suscripción.
 * @param subscriptionId - ID de la suscripción en Stripe.
 * @returns Usuario o null si no se encuentra.
 */
export async function getUserBySubscriptionId(
  subscriptionId: string
): Promise<User | null> {
  const result = await pool.sql<User>`
    SELECT * FROM users WHERE subscription_id = ${subscriptionId} LIMIT 1;
  `;
  return result.rows[0] || null;
}

export async function getAccountDetails(userId: string): Promise<{
  payments: Payment[];
  isPremium: boolean;
  premiumExpiresAt: string | null;
}> {
  const client = await pool.connect();

  try {
    const userRes = await client.query(
      "SELECT is_premium, premium_expires_at FROM users WHERE id = $1",
      [userId]
    );

    if (userRes.rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const { is_premium, premium_expires_at } = userRes.rows[0];

    const paymentsRes = await client.query(
      "SELECT payment_intent_id, amount, currency, processed_at FROM processed_payments WHERE user_id = $1 ORDER BY processed_at DESC",
      [userId]
    );

    const payments: Payment[] = paymentsRes.rows.map((row) => ({
      paymentIntentId: row.payment_intent_id,
      amount: row.amount,
      currency: row.currency,
      date: new Date(row.processed_at).toLocaleDateString(),
    }));

    return {
      payments,
      isPremium: is_premium,
      premiumExpiresAt: premium_expires_at
        ? new Date(premium_expires_at).toLocaleDateString()
        : null,
    };
  } catch (error) {
    console.error("Error al obtener detalles de cuenta:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getPaymentDetails(
  userId: string
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
