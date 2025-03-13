"use server";

import { Session } from "next-auth";

import {
  getUserProfileById,
  getUserProfileByUsername,
} from "@/db/querys/profile-querys";
import { UserProfileData } from "@/types/auth";

export async function getUserProfileData({
  session,
  username,
  isOwn,
  userId,
}: {
  session?: Session;
  username?: string;
  isOwn?: boolean;
  userId?: string;
}): Promise<UserProfileData> {
  let userProfile;
  if (!isOwn && userId) {
    [userProfile] = await getUserProfileById(userId);
  } else if (username) {
    [userProfile] = await getUserProfileByUsername(username);
  } else if (session?.user?.id) {
    [userProfile] = await getUserProfileById(session.user.id);
  } else {
    throw new Error("Sesión no válida o username no proporcionado.");
  }

  if (!userProfile) {
    console.error("No se pudo obtener la información del perfil del usuario.");
  }

  const user = userProfile.user;
  const profile = userProfile.profile;
  const subscription = userProfile.subscription;

  const id = user.id;
  const email = user.email;
  const isPremium = subscription.isPremium;
  const firstName = profile.firstName || "Usuario";
  const lastName = profile.lastName || "";
  const profileImage = profile.profileImage || null;
  const birthdate = profile.birthdate;
  const bio = profile.bio || null;
  const genre = profile.genre || null;
  const weight = profile.weight || null;
  const height = profile.height || null;
  const location = profile.location || null;
  const createdAt = user.createdAt;

  return {
    id,
    email,
    isPremium,
    firstName,
    lastName,
    username: user.username,
    profileImage,
    birthdate,
    bio,
    genre,
    weight,
    height,
    location,
    createdAt,
  };
}
