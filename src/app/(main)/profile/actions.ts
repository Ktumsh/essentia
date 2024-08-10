"use server";

import { auth } from "@@/auth";
import { kv } from "@vercel/kv";

export async function updateProfile({
  username,
  birthdate,
}: {
  username: string;
  birthdate: string;
}) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const userEmail = session?.user?.email;
  await kv.hmset(`user:${userEmail}`, { username, birthdate });

  return { message: "Profile updated successfully" };
}
