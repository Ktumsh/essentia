import { getUserProfileByEmail } from "@/db/actions";
import { Session, UserProfileData } from "@/types/session";

export async function getUserProfileData(
  session?: Session
): Promise<UserProfileData> {
  if (!session?.user?.email) {
    throw new Error("Sesión no válida o datos de usuario incompletos");
  }

  const userProfile = await getUserProfileByEmail(session.user.email);
  if (!userProfile) {
    throw new Error("Perfil no encontrado para el usuario.");
  }

  const userProfileData = userProfile.profile;
  const id = userProfile.user.id;
  const username = userProfile.user.username;

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
    first_name,
    last_name,
    username,
    profile_image,
    birthdate,
    bio,
    location,
    banner_image,
    created_at,
  };
}
