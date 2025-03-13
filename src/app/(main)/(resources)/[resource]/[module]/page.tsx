import { redirect } from "next/navigation";

import { getModuleBySlug } from "@/db/querys/resource-query";

type ModulePageProps = {
  params: Promise<{ resource: string; module: string }>;
};

const ModulePage = async (props: ModulePageProps) => {
  const params = await props.params;
  const resourceSlug = params.resource;
  const moduleSlug = params.module;

  const moduleData = await getModuleBySlug(moduleSlug);

  return redirect(
    `/${resourceSlug}/${moduleData.module.slug}/${moduleData.lesson?.slug}`,
  );
};

export default ModulePage;
