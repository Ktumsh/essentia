import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { RESOURCES_DATA } from "@/consts/resources-data";
import {
  getCompletedLessons,
  getRouteProgress,
  getStageProgress,
} from "@/db/querys/progress-querys";
import { getStages, getRouteBySlug } from "@/db/querys/resource-querys";
import { getUserProfileData } from "@/utils/profile";

import ResourceWrapper from "../_components/resource-wrapper";

type Props = {
  params: Promise<{ route: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const routeSlug = (await params).route;
  const routeData = RESOURCES_DATA.find((item) => item.route === routeSlug);

  if (!routeData) {
    return { title: "Recurso no encontrado" };
  }

  return {
    title: routeData.title,
    alternates: {
      canonical: `/${routeSlug}`,
    },
  };
}

const ResourcePage = async (props: Props) => {
  const params = await props.params;
  const slug = params.route;
  const staticResouce = RESOURCES_DATA.find((item) => item.route === slug);

  if (!staticResouce) return null;

  const dynamicResource = await getRouteBySlug(slug);

  const resource = {
    ...staticResouce,
    ...dynamicResource,
  };

  const stages = dynamicResource ? await getStages(resource.id) : [];

  const session = await auth();
  const userId = session?.user?.id as string;

  const profileData = userId ? await getUserProfileData({ userId }) : null;

  const { isPremium } = profileData ?? {};

  const lessonIds = stages.flatMap((mod) =>
    mod.lessons.map((lesson) => lesson.id),
  );

  const completedLessons = userId
    ? await getCompletedLessons(userId, lessonIds)
    : [];

  const stageProgress: { [key: string]: number } = {};

  if (userId) {
    for (const mod of stages) {
      const progressData = (await getStageProgress(userId, mod.stage.id)) || {};
      stageProgress[mod.stage.id] = progressData.progress || 0;
    }
  }

  const course = userId ? await getRouteProgress(userId, resource.id) : null;

  const routeProgress = {
    completed: course?.completed || false,
    progress: course?.progress || 0,
  };

  return (
    <ResourceWrapper
      userId={userId}
      isPremium={isPremium}
      resource={resource}
      stages={stages}
      completedLessons={completedLessons}
      stageProgress={stageProgress}
      routeProgress={routeProgress}
      routeInitialized={!!course}
    />
  );
};

export default ResourcePage;
