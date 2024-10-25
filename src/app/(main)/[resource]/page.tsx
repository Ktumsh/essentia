import { Metadata } from "next";

import ResourceWrapper from "@/modules/resources/components/resource-wrapper";

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
  return <ResourceWrapper params={params} />;
};

export default ResourcePage;
