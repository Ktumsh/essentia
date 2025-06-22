import PageWrapper from "@/components/layout/page-wrapper";
import { Separator } from "@/components/ui/separator";
import { getUserData } from "@/utils";

import AccountHeader from "../../(account)/_components/account-header";
import ProfileInfo from "../../(account)/profile/_components/profile-info";

import type { Metadata } from "next";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Perfil de ${username}`,
    alternates: {
      canonical: `/profiles/${username}`,
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

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
}
