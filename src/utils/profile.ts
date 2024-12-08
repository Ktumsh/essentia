import { Session } from "next-auth";

import {
  getUserProfileByEmail,
  getUserProfileByUsername,
} from "@/db/querys/profile-querys";
import { UserProfileData } from "@/types/session";

export async function getUserProfileData(
  session?: Session,
  username?: string,
): Promise<UserProfileData> {
  let userProfile;

  if (username) {
    [userProfile] = await getUserProfileByUsername(username);
  } else if (session?.user?.email) {
    [userProfile] = await getUserProfileByEmail(session.user.email);
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
  const isPremium = subscription.isPremium || null;
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
