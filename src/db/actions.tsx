"use server";

import { User, UserProfile, UserProfileData } from "@/types/session";
import { Payment } from "@/utils/account";
import { createPool, Pool, sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

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

// Actualizar el estado de un usuario a premium
export async function updatePremiumStatus(
  userId: string,
  paymentIntentId: string,
  amount: number,
  currency: string,
  durationInMonths: number = 1
): Promise<void> {
  if (!userId || !paymentIntentId || !amount || !currency) {
    throw new Error(
      "userId, paymentIntentId, amount y currency son requeridos"
    );
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const res = await client.query(
      "SELECT id FROM processed_payments WHERE payment_intent_id = $1",
      [paymentIntentId]
    );

    if (res.rows.length > 0) {
      throw new Error("Este pago ya ha sido procesado.");
    }

    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + durationInMonths);

    await client.query(
      "UPDATE users SET is_premium = TRUE, premium_expires_at = $1 WHERE id = $2",
      [expirationDate.toISOString(), userId]
    );

    await client.query(
      "INSERT INTO processed_payments (payment_intent_id, user_id, amount, currency) VALUES ($1, $2, $3, $4)",
      [paymentIntentId, userId, amount, currency]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
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
