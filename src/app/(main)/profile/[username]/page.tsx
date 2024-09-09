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

const ProfilePage = async () => {
  const session = (await auth()) as Session;
  const profileData = await getUserProfileData(session);
  return (
    <>
      <main className="flex flex-col min-h-dvh w-full md:min-w-[768px] max-w-5xl md:px-5 pb-14 md:pb-0 pt-14 shrink items-stretch grow">
        <ProfilePanel profileData={profileData} />
      </main>
    </>
  );
};

export default ProfilePage;
