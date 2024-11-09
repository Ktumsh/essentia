"use server";

import { createPool } from "@vercel/postgres";

import { User } from "@/types/session";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function getUserById(userId: string): Promise<User | null> {
  const result = await pool.sql<User>`
      SELECT * FROM users WHERE id = ${userId} LIMIT 1;
    `;
  return result.rows[0] || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await pool.sql<User>`
      SELECT * FROM users WHERE email = ${email} LIMIT 1;
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error al obtener el usuario por email:", error);
    return null;
  }
}

export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  const result = await pool.sql<User>`
      SELECT * FROM users WHERE username = ${username} LIMIT 1;
    `;
  return result.rows[0] || null;
}

export async function getPasswordAndSaltById(
  userId: string,
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

export async function updatePasswordAndSaltById(
  userId: string,
  password: string,
  salt: string,
) {
  const result = await pool.sql`
    UPDATE users
    SET password_hash = ${password}, salt = ${salt}
    WHERE id = ${userId};
  `;

  return result;
}

export async function getUserBySubscriptionId(
  subscriptionId: string,
): Promise<User | null> {
  const result = await pool.sql<User>`
    SELECT * FROM users WHERE subscription_id = ${subscriptionId} LIMIT 1;
  `;
  return result.rows[0] || null;
}
