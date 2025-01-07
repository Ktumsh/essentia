"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { HashIcon } from "lucide-react";
import Link from "next/link";

import CardList from "./card-list";
import CourseList from "./course-list";

import type { Course } from "@/types/resource";

const HealthWellness = (props: Course) => {
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
    <>
      {modules && (
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
      )}
      <section className="col-[1/2] px-6 py-4 lg:col-[1/3] lg:p-0">
        <div className="flex w-full select-none flex-col justify-start">
          <h3 className="text-main dark:text-white">
            <Link
              id="articulos-interesantes"
              data-id="articulos-interesantes"
              data-name="Artículos Interesantes"
              href="#articulos-interesantes"
              className="group mb-4 inline-flex h-auto w-fit items-center gap-0 text-balance bg-transparent text-2xl font-bold transition hover:opacity-80 md:text-3xl lg:px-0"
            >
              Artículos Interesantes
              <HashIcon
                strokeWidth={1.5}
                className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Link>
          </h3>
        </div>
        <CardList type="article" resource="salud-y-bienestar" />
      </section>
    </>
  );
};

export default HealthWellness;
