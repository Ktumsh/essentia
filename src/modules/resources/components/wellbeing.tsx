"use client";

import CourseList from "./course-list";

import type { Modules } from "@/types/resource";

interface WellbeingProps {
  resource: {
    resourceId: string;
    resourceName: string;
  };
  modules: Modules[];
  about: string;
  slug: string;
  completedLessons: string[];
  progress: { [moduleId: string]: number };
  totalProgress: number;
}

const Wellbeing = ({
  modules,
  resource,
  about,
  slug,
  completedLessons,
  progress,
  totalProgress,
}: WellbeingProps) => {
  return (
    <CourseList
      resource={resource}
      modules={modules}
      about={about}
      slug={slug}
      completedLessons={completedLessons}
      progress={progress}
      totalProgress={totalProgress}
    />
  );
};

export default Wellbeing;
