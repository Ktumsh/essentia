import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import {
  getCompletedLessons,
  getCourseProgress,
  getLessonProgress,
  getModuleProgress,
} from "@/db/querys/progress-querys";
import {
  getLessonBySlug,
  getModules,
  getResourceBySlug,
} from "@/db/querys/resource-querys";
import { getUserProfileData } from "@/utils/profile";

import Lesson from "../../../_components/lesson";

type LessonPageProps = {
  params: Promise<{ resource: string; module: string; lesson: string }>;
};

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const resourceSlug = (await params).resource;
  const moduleSlug = (await params).module;
  const lessonSlug = (await params).lesson;

  const resource = await getResourceBySlug(resourceSlug);

  const modules = await getModules(resource.id);

  const currentModule = modules.find((mod) =>
    mod.lessons.some((l) => l.slug === lessonSlug),
  );

  if (!currentModule) {
    return { title: "Clase no encontrada" };
  }

  const lesson = await getLessonBySlug(currentModule.module.id, lessonSlug);

  return {
    title: lesson.title,
    alternates: {
      canonical: `/${resourceSlug}/${moduleSlug}/${lessonSlug}`,
    },
  };
}

const LessonPage = async (props: LessonPageProps) => {
  const params = await props.params;
  const resourceSlug = params.resource;
  const lessonSlug = params.lesson;

  const session = await auth();

  const userId = session?.user?.id as string;

  const resource = await getResourceBySlug(resourceSlug);

  const modules = await getModules(resource.id);

  const currentModule = modules.find((mod) =>
    mod.lessons.some((l) => l.slug === lessonSlug),
  );

  const lesson = await getLessonBySlug(
    currentModule?.module.id || "",
    lessonSlug,
  );

  const progress = await getLessonProgress(userId, lesson.id);

  const lessonIds = modules.flatMap((mod) =>
    mod.lessons.map((lesson) => lesson.id),
  );

  if (!session) {
    redirect(`/${resourceSlug}`);
  }

  const completedLessons = session
    ? await getCompletedLessons(userId, lessonIds)
    : [];

  const moduleProgress: { [key: string]: number } = {};

  for (const mod of modules) {
    const progressData = (await getModuleProgress(userId, mod.module.id)) || {};
    moduleProgress[mod.module.id] = progressData.progress || 0;
  }

  const resourceData = {
    resourceId: resource.id,
    resourceName: resource.name,
    resourceSlug: resource.slug,
  };

  const course = await getCourseProgress(userId, resource.id);

  if (!course) {
    redirect(`/${resourceSlug}`);
  }

  const userData = userId ? await getUserProfileData({ userId }) : null;

  const { isPremium } = userData || {};

  return (
    <Lesson
      lesson={lesson}
      modules={modules}
      resource={resourceData}
      isCompleted={progress}
      completedLessons={completedLessons}
      moduleProgress={moduleProgress}
      isCourseCompleted={course.completed}
      isPremium={isPremium ?? false}
    />
  );
};

export default LessonPage;
