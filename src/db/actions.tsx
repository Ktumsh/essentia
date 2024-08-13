"use server";

import { User, UserProfile } from "@/types/session";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

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
