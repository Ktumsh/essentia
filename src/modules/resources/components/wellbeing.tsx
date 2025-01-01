"use client";

import CourseList from "./course-list";

import type { Course } from "@/types/resource";

const Wellbeing = (props: Course) => {
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
    />
  );
};

export default Wellbeing;
