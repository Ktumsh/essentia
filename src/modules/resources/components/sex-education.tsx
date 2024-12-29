"use client";

import CourseList from "./course-list";

import type { Course } from "@/types/resource";

const SexEducation = (props: Course) => {
  const {
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

export default SexEducation;
