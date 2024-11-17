import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import ResourceWrapper from "@/modules/resources/components/resource-wrapper";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

type Props = {
  params: Promise<{ resource: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const resource = params.resource
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: resource,
  };
}

const ResourcePage = async (props: Props) => {
  const params = await props.params;
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;
  const { is_premium } = profileData ?? {};
  return <ResourceWrapper params={params} isPremium={is_premium} />;
};

export default ResourcePage;
