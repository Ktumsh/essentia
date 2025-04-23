import { redirect } from "next/navigation";

import { getStageBySlug } from "@/db/querys/resource-querys";

type StagePageProps = {
  params: Promise<{ route: string; stage: string }>;
};

const StagePage = async (props: StagePageProps) => {
  const params = await props.params;
  const routeSlug = params.route;
  const stageSlug = params.stage;

  const stageData = await getStageBySlug(stageSlug);

  if (!stageData) {
    return redirect("/");
  }

  return redirect(
    `/${routeSlug}/${stageData.stage.slug}/${stageData.lesson?.slug}`,
  );
};

export default StagePage;
