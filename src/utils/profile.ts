"use server";

import {
  getUserProfileById,
  getUserProfileByUsername,
} from "@/db/querys/profile-querys";
import { getUserTrialStatus } from "@/db/querys/user-querys";
import { UserProfileData } from "@/types/auth";

export async function getUserProfileData({
  userId,
  username,
}: {
  userId?: string;
  username?: string;
}): Promise<UserProfileData> {
  let userProfile;

  if (userId) {
    [userProfile] = await getUserProfileById(userId);
  } else if (username) {
    [userProfile] = await getUserProfileByUsername(username);
  } else {
    throw new Error("Sesión no válida o username no proporcionado.");
  }

  if (!userProfile) {
    console.error("No se pudo obtener la información del perfil del usuario.");
    throw new Error("Perfil no encontrado.");
  }

  const user = userProfile.user;
  const profile = userProfile.profile;
  const subscription = userProfile.subscription;

  const trial = await getUserTrialStatus(user.id);

  return {
    id: user.id,
    email: user.email,
    isPremium: subscription.isPremium || trial.isActive,
    firstName: profile.firstName || "Usuario",
    lastName: profile.lastName || "",
    username: user.username,
    profileImage: profile.profileImage || null,
    birthdate: profile.birthdate,
    bio: profile.bio || null,
    genre: profile.genre || null,
    weight: profile.weight || null,
    height: profile.height || null,
    location: profile.location || null,
    createdAt: user.createdAt,
    trial,
  };
}
