import { auth } from "@/app/(auth)/auth";
import {
  getCompletedLessons,
  getLessonProgress,
  getModuleProgress,
} from "@/db/querys/progress-query";
import {
  getLessonBySlug,
  getModules,
  getResourceBySlug,
} from "@/db/querys/resource-query";
import Lesson from "@/modules/resources/components/lesson";

type LessonPageProps = {
  params: Promise<{ resource: string; lesson: string }>;
};

const LessonPage = async (props: LessonPageProps) => {
  const params = await props.params;
  const resourceSlug = params.resource;
  const lessonSlug = params.lesson;

  const resource = await getResourceBySlug(resourceSlug);

  const modules = await getModules(resource.id);

  const currentModule = modules.find((mod) =>
    mod.lessons.some((l) => l.slug === lessonSlug),
  );

  const lesson = await getLessonBySlug(
    currentModule?.module.id || "",
    lessonSlug,
  );

  const progress = await getLessonProgress(lesson.id);

  const lessonIds = modules.flatMap((mod) =>
    mod.lessons.map((lesson) => lesson.id),
  );

  const session = await auth();

  const userId = session?.user?.id as string;

  const completedLessons = session
    ? await getCompletedLessons(userId, lessonIds)
    : [];

  const moduleProgress: { [key: string]: number } = {};

  for (const mod of modules) {
    const progressData = (await getModuleProgress(userId, mod.module.id)) || {};
    moduleProgress[mod.module.id] = progressData.progress || 0;
  }

  const resourceData = {
    resourceName: resource.name,
    resourceSlug: resource.slug,
  };

  return (
    <Lesson
      lesson={lesson}
      modules={modules}
      resource={resourceData}
      isCompleted={progress.completed}
      completedLessons={completedLessons}
      progress={moduleProgress}
    />
  );
};

export default LessonPage;
