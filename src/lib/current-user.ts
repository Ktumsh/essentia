"use server";

import { auth } from "@/app/(auth)/auth";
import { getUserData } from "@/utils/profile";

import type { UserProfileData } from "./types";

export async function getCurrentUser(): Promise<UserProfileData | null> {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await getUserData({ userId: session.user.id });

  if (!user) {
    return null;
  }

  return user;
}
