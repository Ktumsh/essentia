import { Metadata } from "next";

import { Separator } from "@/components/kit/separator";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { getUserProfileData } from "@/utils/profile";

import AccountHeader from "../../(account)/_components/account/account-header";
import ProfileInfo from "../../(account)/_components/profile/profile-info";

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
    <PageWrapper>
      <AccountHeader username={username} />
      <div className="px-6">
        <Separator />
      </div>
      <ProfileInfo user={user} isOwnProfile={false} />
    </PageWrapper>
  );
};

export default ProfilePage;
