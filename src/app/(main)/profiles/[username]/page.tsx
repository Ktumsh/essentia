import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
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
      canonical: `/profiles/${username}`,
    },
  };
}

const ProfilePage = async (props: Props) => {
  const params = await props.params;
  const { username } = params;

  const user = await getUserProfileData({ session: undefined, username });

  return (
    <section className="flex w-full flex-col overflow-hidden pb-16 md:pb-0">
      <div className="mx-auto size-full min-h-[calc(100dvh-120px)] max-w-7xl flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:min-h-[calc(100dvh-56px)] md:border md:border-y-0">
        <div className="px-6">
          <h1 className="py-4 text-2xl font-semibold leading-none tracking-tight dark:text-white sm:text-3xl md:pt-11">
            Perfil de {username}
          </h1>
        </div>
        <div className="px-6">
          <Separator />
        </div>
        <ProfileInfo user={user} isOwnProfile={false} />
      </div>
    </section>
  );
};

export default ProfilePage;
