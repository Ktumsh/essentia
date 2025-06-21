import { Metadata } from "next";

import PageWrapper from "@/components/layout/page-wrapper";
import { Separator } from "@/components/ui/separator";
import { getUserData } from "@/utils";

import AccountHeader from "../../(account)/_components/account-header";
import ProfileInfo from "../../(account)/profile/_components/profile-info";

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

  const user = await getUserData({ username });

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
