import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { RESOURCE_DATA } from "@/db/data/resources-data";
import {
  getCompletedLessons,
  getRouteProgress,
  getStageProgress,
} from "@/db/querys/progress-querys";
import { getStages, getRouteBySlug } from "@/db/querys/resource-querys";
import { getUserData } from "@/utils/profile";

import RouteWrapper from "./_components/route-wrapper";

import type { RouteResource } from "@/lib/types";
import type { Metadata } from "next";

export const experimental_ppr = false;

type RoutePageProps = {
  params: Promise<{ route: string }>;
};

export async function generateMetadata({
  params,
}: RoutePageProps): Promise<Metadata> {
  const routeSlug = (await params).route;
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

export async function generateStaticParams() {
  return RESOURCE_DATA.map((resource) => ({
    route: resource.slug,
  }));
}

const RoutePage = async ({ params }: RoutePageProps) => {
  const slug = (await params).route;
  const staticRes = RESOURCE_DATA.find((r) => r.slug === slug);

  if (!staticRes || !slug) redirect("/not-found");

  const [session, dynamicResource] = await Promise.all([
    auth(),
    getRouteBySlug(slug),
  ]);

  if (!dynamicResource) redirect("/not-found");

  const resource = { ...staticRes, ...dynamicResource } as RouteResource;

  const stages = await getStages(resource.id);

  const userId = session?.user?.id as string;

  const lessonIds = stages.flatMap((m) => m.lessons.map((lesson) => lesson.id));

  const [profileData, completedLessons, stageProgress, routeProgressData] =
    await Promise.all([
      userId ? getUserData({ userId }) : Promise.resolve(null),
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
