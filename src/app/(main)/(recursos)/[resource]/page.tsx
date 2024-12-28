import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { RESOURCES } from "@/consts/resources";
import {
  getCompletedLessons,
  getModuleProgress,
} from "@/db/querys/progress-query";
import { getModules, getResourceBySlug } from "@/db/querys/resource-query";
import ResourceWrapper from "@/modules/resources/components/resource-wrapper";
import { getUserProfileData } from "@/utils/profile";

type Props = {
  params: Promise<{ resource: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resourceSlug = (await params).resource;
  const resourceData = RESOURCES.find((item) => item.resource === resourceSlug);

  if (!resourceData) {
    return { title: "Recurso no encontrado" };
  }

  return {
    title: resourceData.title,
    alternates: {
      canonical: `/${resourceSlug}`,
    },
  };
}

const ResourcePage = async (props: Props) => {
  const params = await props.params;
  const slug = params.resource;
  const staticResource = RESOURCES.find((item) => item.resource === slug);

  if (!staticResource) return null;

  const dynamicResource = await getResourceBySlug(slug);

  const resource = {
    ...staticResource,
    ...dynamicResource,
  };

  const modules = dynamicResource ? await getModules(resource.id) : [];

  const session = await auth();
  const userId = session?.user?.id as string;

  const profileData = session ? await getUserProfileData({ session }) : null;

  const { isPremium } = profileData ?? {};

  const lessonIds = modules.flatMap((mod) =>
    mod.lessons.map((lesson) => lesson.id),
  );

  const completedLessons = userId
    ? await getCompletedLessons(userId, lessonIds)
    : [];

  const moduleProgress: { [key: string]: number } = {};

  for (const mod of modules) {
    const progressData = (await getModuleProgress(userId, mod.module.id)) || {};
    moduleProgress[mod.module.id] = progressData.progress || 0;
  }

  const totalLessons = modules.reduce(
    (sum, mod) => sum + mod.lessons.length,
    0,
  );

  const totalProgress = modules.reduce((sum, mod) => {
    const modProgress = moduleProgress[mod.module.id] || 0;
    const lessonCount = mod.lessons.length;
    return sum + (modProgress * lessonCount) / 100;
  }, 0);

  const courseProgress =
    totalLessons > 0 ? Math.round((totalProgress / totalLessons) * 100) : 0;

  return (
    <ResourceWrapper
      isPremium={isPremium}
      resource={resource}
      modules={modules}
      completedLessons={completedLessons}
      progress={moduleProgress}
      totalProgress={courseProgress}
    />
  );
};

export default ResourcePage;
