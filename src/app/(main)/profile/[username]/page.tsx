import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import ProfileInfo from "@/modules/profile/components/profile-info";
import { getUserProfileData } from "@/utils/profile";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const username = params.username;
  return {
    title: `Perfil de ${username}`,
    alternates: {
      canonical: `/profile/${username}`,
    },
  };
}

const ProfilePage = async (props: Props) => {
  const params = await props.params;
  const { username } = params;

  const session = await auth();

  let profileData;
  let isOwnProfile = false;

  if (session) {
    const userData = await getUserProfileData({ session });

    if (userData.username === username) {
      profileData = userData;
      isOwnProfile = true;
    } else {
      profileData = await getUserProfileData({ session: undefined, username });
    }
  } else {
    profileData = await getUserProfileData({ session: undefined, username });
  }

  return <ProfileInfo profileData={profileData} isOwnProfile={isOwnProfile} />;
};

export default ProfilePage;
