import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/layout/page-wrapper";
import {
  getCompletedLessons,
  getRouteProgress,
  getLessonProgress,
  getStageProgress,
} from "@/db/querys/progress-querys";
import {
  getLessonBySlug,
  getStages,
  getRouteBySlug,
  getAllSlugs,
} from "@/db/querys/resource-querys";
import { getUserData } from "@/utils/profile";

import Lesson from "../../_components/lesson";

import type { Metadata } from "next";

export const experimental_ppr = false;

type LessonPageProps = {
  params: Promise<{ route: string; stage: string; lesson: string }>;
};

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const {
    route: routeSlug,
    stage: stageSlug,
    lesson: lessonSlug,
  } = await params;

  const route = await getRouteBySlug(routeSlug);

  const stages = await getStages(route.id);

  const currentModule = stages.find((mod) =>
    mod.lessons.some((l) => l.slug === lessonSlug),
  );

  if (!currentModule) {
    return { title: "Clase no encontrada" };
  }

  const lesson = await getLessonBySlug(currentModule.stage.id, lessonSlug);

  return {
    title: lesson.title,
    alternates: {
      canonical: `/${routeSlug}/${stageSlug}/${lessonSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(({ route, stage, lesson }) => ({
    route,
    stage,
    lesson,
  }));
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { route: routeSlug, lesson: lessonSlug } = await params;

  const session = await auth();

  const userId = session?.user?.id as string;

  const route = await getRouteBySlug(routeSlug);

  if (!route) redirect("/not-found");

  const stages = route.id ? await getStages(route.id) : [];

  const currentModule = stages.find((mod) =>
    mod.lessons.some((l) => l.slug === lessonSlug),
  );

  if (!currentModule) redirect("/not-found");

  const lesson = await getLessonBySlug(
    currentModule?.stage.id || "",
    lessonSlug,
  );

  const progress = await getLessonProgress(userId, lesson.id);

  const lessonIds = stages.flatMap((mod) =>
    mod.lessons.map((lesson) => lesson.id),
  );

  if (!session) {
    redirect(`/${routeSlug}`);
  }

  const completedLessons = session
    ? await getCompletedLessons(userId, lessonIds)
    : [];

  const stageProgress = userId
    ? await Promise.all(
        stages.map((mod) => getStageProgress(userId, mod.stage.id)),
      )
    : [];

  const routeData = {
    routeId: route.id,
    routeName: route.name,
    routeSlug: route.slug,
  };

  const routeProgress = await getRouteProgress(userId, route.id);

  if (!routeProgress) {
    redirect(`/${routeSlug}`);
  }

  const userData = userId ? await getUserData({ userId }) : null;

  const { isPremium } = userData || {};

  return (
    <PageWrapper>
      <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-[1fr_424px]">
        <Lesson
          lesson={lesson}
          stages={stages}
          route={routeData}
          isCompleted={progress}
          completedLessons={completedLessons}
          stageProgress={stageProgress}
          isRouteCompleted={routeProgress.completed}
          isPremium={isPremium ?? false}
        />
      </div>
    </PageWrapper>
  );
}
