import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import ProfilePanel from "@/modules/profile/components/profile-panel";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const username = params.username;
  return {
    title: `Perfil de ${username}`,
  };
}

const ProfilePage = async (props: Props) => {
  const params = await props.params;
  const { username } = params;

  const session = (await auth()) as Session | null;

  let profileData;
  let isOwnProfile = false;

  if (session) {
    const authenticatedUserProfile = await getUserProfileData(session);

    if (authenticatedUserProfile.username === username) {
      profileData = authenticatedUserProfile;
      isOwnProfile = true;
    } else {
      profileData = await getUserProfileData(undefined, username);
    }
  } else {
    profileData = await getUserProfileData(undefined, username);
  }

  return <ProfilePanel profileData={profileData} isOwnProfile={isOwnProfile} />;
};

export default ProfilePage;
