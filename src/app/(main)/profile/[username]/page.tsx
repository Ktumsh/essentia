import ProfilePanel from "@/modules/profile/components/profile-panel";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@@/auth";
import { Metadata } from "next";

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
      <main className="flex flex-col min-h-dvh w-full md:min-w-[768px] max-w-5xl md:px-5 pb-14 md:pb-0 pt-14 shrink items-stretch grow">
        <ProfilePanel profileData={profileData} isOwnProfile={isOwnProfile} />
      </main>
    </>
  );
};

export default ProfilePage;
