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
    console.error("No se pudo obtener la información del perfil del usuario.");
  }

  const userProfileData = userProfile?.profile;
  const id = userProfile?.user.id as string;
  const email = userProfile?.user.email as string;
  const is_premium = userProfile?.user.is_premium as boolean;
  const first_name = userProfileData?.first_name || "Usuario";
  const last_name = userProfileData?.last_name || "";
  const profile_image = userProfileData?.profile_image || null;
  const birthdate = userProfileData?.birthdate;
  const bio = userProfileData?.bio || null;
  const location = userProfileData?.location || null;
  const banner_image = userProfileData?.banner_image || null;
  const created_at = userProfileData?.created_at as Date;

  return {
    id,
    email,
    is_premium,
    first_name,
    last_name,
    username: userProfile?.user.username as string,
    profile_image,
    birthdate,
    bio,
    location,
    banner_image,
    created_at,
  };
}
