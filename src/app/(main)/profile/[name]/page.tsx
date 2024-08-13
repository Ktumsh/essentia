import Dashboard from "@/modules/profile/components/dashboard";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@@/auth";
import { Metadata } from "next";

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.name;
  const decodedName = decodeURIComponent(name);
  return {
    title: `Perfil de ${decodedName}`,
  };
}

const ProfilePage = async () => {
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;
  return (
    <>
      <main className="sticky top-0 flex flex-col min-h-dvh w-full md:min-w-[768px] max-w-5xl px-5 pt-14 shrink items-stretch grow">
        <Dashboard profileData={profileData} />
      </main>
    </>
  );
};

export default ProfilePage;
