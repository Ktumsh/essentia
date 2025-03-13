"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import CardList from "./card-list";
import CourseList from "./course-list";
import SectionTitle from "./section-title";

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
    isPremium,
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
          isPremium={isPremium}
        />
      )}
      <section className="col-[1/2] lg:col-[1/3]">
        <SectionTitle
          title="Artículos Interesantes"
          hash="articulos-interesantes"
        />
        <CardList type="article" resource="salud-y-bienestar" />
      </section>
    </>
  );
};

export default HealthWellness;
