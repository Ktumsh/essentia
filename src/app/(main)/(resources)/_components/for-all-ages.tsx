"use client";

import CourseList from "./course-list";

import type { Course } from "@/types/resource";

const ForAllAges = (props: Course) => {
  const {
    userId,

    resource,
    modules,
    about,
    slug,
    completedLessons,
    moduleProgress,
    courseProgress,
    courseInitialized,
    isPremium,
  } = props;

  return (
    <CourseList
      userId={userId}
      resource={resource}
      modules={modules}
      about={about}
      slug={slug}
      completedLessons={completedLessons}
      moduleProgress={moduleProgress}
      courseProgress={courseProgress}
      courseInitialized={courseInitialized}
      isPremium={isPremium}
    />
  );
};

export default ForAllAges;
