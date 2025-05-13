import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { RESOURCE_DATA } from "@/db/data/resources-data";
import {
  getCompletedLessons,
  getRouteProgress,
  getStageProgress,
} from "@/db/querys/progress-querys";
import { getStages, getRouteBySlug } from "@/db/querys/resource-querys";
import { getUserProfileData } from "@/utils/profile";

import RouteWrapper from "../_components/route-wrapper";

import type { RouteResource } from "@/types/resource";

type Props = {
  params: Promise<{ route: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const routeSlug = params.route;
  const routeData = RESOURCE_DATA.find((item) => item.slug === routeSlug);

  if (!routeData) {
    return { title: "Recurso no encontrado" };
  }

  return {
    title: routeData.name,
    alternates: {
      canonical: `/${routeSlug}`,
    },
  };
}

const RoutePage = async (props: Props) => {
  const params = await props.params;
  const slug = params.route;
  const staticRes = RESOURCE_DATA.find((r) => r.slug === slug);

  if (!staticRes) redirect("/");

  const [session, dynamicResource] = await Promise.all([
    auth(),
    getRouteBySlug(slug),
  ]);

  if (!dynamicResource) redirect("/");

  const resource = { ...staticRes, ...dynamicResource } as RouteResource;

  const stages = await getStages(resource.id);

  const userId = session?.user?.id as string;

  const lessonIds = stages.flatMap((m) => m.lessons.map((lesson) => lesson.id));

  const [profileData, completedLessons, stageProgress, routeProgressData] =
    await Promise.all([
      userId ? getUserProfileData({ userId }) : Promise.resolve(null),
      userId ? getCompletedLessons(userId, lessonIds) : Promise.resolve([]),
      userId
        ? Promise.all(stages.map((m) => getStageProgress(userId, m.stage.id)))
        : Promise.resolve([]),
      userId ? getRouteProgress(userId, resource.id) : Promise.resolve(null),
    ]);

  const isPremium = profileData?.isPremium ?? false;
  const routeProgress = {
    completed: routeProgressData?.completed || false,
    progress: routeProgressData?.progress || 0,
  };

  return (
    <RouteWrapper
      userId={userId}
      isPremium={isPremium}
      resource={resource}
      stages={stages}
      completedLessons={completedLessons}
      stageProgress={stageProgress}
      routeProgress={routeProgress}
      routeInitialized={!!routeProgressData}
    >
      <resource.component />
    </RouteWrapper>
  );
};

export default RoutePage;
