"use server";

import { kv } from "@vercel/kv";
import { getSession } from "next-auth/react";

export async function updateProfile({
  username,
  birthdate,
}: {
  username: string;
  birthdate: string;
}) {
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const userEmail = session.user.email;
  await kv.hmset(`user:${userEmail}`, { username, birthdate });

  return { message: "Profile updated successfully" };
}
