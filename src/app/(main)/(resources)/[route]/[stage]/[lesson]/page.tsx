import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/ui/layout/page-wrapper";
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
} from "@/db/querys/resource-querys";
import { getUserProfileData } from "@/utils/profile";

import Lesson from "../../../_components/lesson";

type LessonPageProps = {
  params: Promise<{ route: string; stage: string; lesson: string }>;
};

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const routeSlug = (await params).route;
  const stageSlug = (await params).stage;
  const lessonSlug = (await params).lesson;

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

const LessonPage = async (props: LessonPageProps) => {
  const params = await props.params;
  const routeSlug = params.route;
  const lessonSlug = params.lesson;

  const session = await auth();

  const userId = session?.user?.id as string;

  const route = await getRouteBySlug(routeSlug);

  const stages = await getStages(route.id);

  const currentModule = stages.find((mod) =>
    mod.lessons.some((l) => l.slug === lessonSlug),
  );

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

  const userData = userId ? await getUserProfileData({ userId }) : null;

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
};

export default LessonPage;
