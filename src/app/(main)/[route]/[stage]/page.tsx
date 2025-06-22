import { redirect } from "next/navigation";

import { getStageBySlug } from "@/db/querys/resource-querys";

type StagePageProps = {
  params: Promise<{ route: string; stage: string }>;
};

const StagePage = async ({ params }: StagePageProps) => {
  const { route, stage } = await params;

  const stageData = await getStageBySlug(stage);

  if (!stageData) redirect("/not-found");

  return redirect(
    `/${route}/${stageData.stage.slug}/${stageData.lesson?.slug}`,
  );
};

export default StagePage;
