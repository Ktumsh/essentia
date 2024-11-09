import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import ProfilePanel from "@/modules/profile/components/profile-panel";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;
  return {
    title: `Perfil de ${username}`,
  };
}

const ProfilePage = async ({ params }: Props) => {
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

  return (
    <>
      <div className="flex min-h-dvh w-full max-w-5xl shrink grow flex-col items-stretch pb-16 pt-14 md:pb-0">
        <ProfilePanel profileData={profileData} isOwnProfile={isOwnProfile} />
      </div>
    </>
  );
};

export default ProfilePage;
