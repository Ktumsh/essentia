"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import CardList from "./card-list";
import CourseList from "./course-list";
import SectionTitle from "./section-title";

import type { LearningRoute } from "@/types/resource";

const HealthWellness = (props: LearningRoute) => {
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
    <>
      {stages && (
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
