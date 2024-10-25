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
      <div className="flex flex-col min-h-dvh w-full max-w-5xl pb-16 md:pb-0 pt-14 shrink items-stretch grow">
        <ProfilePanel profileData={profileData} isOwnProfile={isOwnProfile} />
      </div>
    </>
  );
};

export default ProfilePage;
