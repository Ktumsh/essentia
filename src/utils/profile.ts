import {
  getUserProfileByEmail,
  getUserProfileByUsername,
} from "@/db/profile-querys";
import { Session, UserProfileData } from "@/types/session";

export async function getUserProfileData(
  session?: Session,
  username?: string,
): Promise<UserProfileData> {
  let userProfile;

  if (username) {
    userProfile = await getUserProfileByUsername(username);
  } else if (session?.user?.email) {
    userProfile = await getUserProfileByEmail(session.user.email);
  } else {
    throw new Error("Sesión no válida o username no proporcionado.");
  }

  if (!userProfile) {
    throw new Error("Perfil no encontrado para el usuario.");
  }

  const userProfileData = userProfile.profile;
  const id = userProfile.user.id;
  const email = userProfile.user.email;
  const is_premium = userProfile.user.is_premium;
  const first_name = userProfileData.first_name || "Usuario";
  const last_name = userProfileData.last_name || "";
  const profile_image = userProfileData.profile_image || null;
  const birthdate = userProfileData.birthdate;
  const bio = userProfileData.bio || null;
  const location = userProfileData.location || null;
  const banner_image = userProfileData.banner_image || null;
  const created_at = userProfileData.created_at;

  return {
    id,
    email,
    is_premium,
    first_name,
    last_name,
    username: userProfile.user.username,
    profile_image,
    birthdate,
    bio,
    location,
    banner_image,
    created_at,
  };
}
