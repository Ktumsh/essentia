"use client";

import CourseList from "./course-list";

import type { LearningRoute } from "@/types/resource";

const SexEducation = (props: LearningRoute) => {
  const {
    userId,
    route,
    stages,
    about,
    slug,
    completedLessons,
    stageProgress,
    routeProgress,
    routeInitialized,
    isPremium,
  } = props;

  return (
    <CourseList
      userId={userId}
      route={route}
      stages={stages}
      about={about}
      slug={slug}
      completedLessons={completedLessons}
      stageProgress={stageProgress}
      routeProgress={routeProgress}
      routeInitialized={routeInitialized}
      isPremium={isPremium}
    />
  );
};

export default SexEducation;
