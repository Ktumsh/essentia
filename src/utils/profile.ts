import { Session, UserProfile, UserProfileData } from "@/types/session";
import { getUserProfileByEmail } from "@/db/actions";

export async function getUserProfileData(
  session?: Session
): Promise<UserProfileData> {
  let userProfileData: UserProfile | null = null;
  let username = session?.user?.username || session?.user?.email || "usuario_1";
  let id = session?.user?.id || "Unknown";

  if (session?.user.email) {
    const userProfile = await getUserProfileByEmail(session.user.email);
    if (userProfile) {
      userProfileData = userProfile.profile;
      id = userProfile.user.id;
      username = `@${userProfile.user.username}`;
    }
  }

  const first_name =
    userProfileData?.first_name ||
    session?.user?.name?.split(" ")[0] ||
    "Usuario";
  const last_name =
    userProfileData?.last_name ||
    session?.user?.name?.split(" ").slice(1).join(" ") ||
    "";
  const image = userProfileData?.profile_image || session?.user?.image || null;
  const birthdate = userProfileData?.birthdate || null;
  const bio = userProfileData?.bio || null;
  const location = userProfileData?.location || null;
  const banner_image = userProfileData?.banner_image || null;

  return {
    id,
    first_name,
    last_name,
    username,
    image,
    birthdate,
    bio,
    location,
    banner_image,
  };
}
