import { Metadata } from "next";

import ResourceWrapper from "@/modules/resources/components/resource-wrapper";
import { auth } from "@/app/(auth)/auth";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

type Props = {
  params: { resource: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = params.resource
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: resource,
  };
}

const ResourcePage = async ({ params }: Props) => {
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;
  return <ResourceWrapper params={params} profileData={profileData} />;
};

export default ResourcePage;
