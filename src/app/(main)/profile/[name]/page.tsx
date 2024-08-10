import Dashboard from "@/modules/profile/components/dashboard";
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
  const session = await auth();
  return (
    <>
      <main className="sticky top-0 flex flex-col min-h-dvh w-full md:min-w-[768px] max-w-5xl px-5 pt-14 shrink items-stretch grow">
        <Dashboard session={session} />
      </main>
    </>
  );
};

export default ProfilePage;
