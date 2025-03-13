"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { useRouter } from "next/navigation";

import { Button } from "@/components/kit/button";
import { StarsIcon } from "@/components/ui/icons/common";
import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { useIsMobile } from "@/hooks/use-mobile";

import CardList from "./card-list";
import CourseList from "./course-list";
import SectionTitle from "./section-title";

import type { Course } from "@/types/resource";

interface ExerciseFitnessProps extends Course {
  isPremium?: boolean | null;
}

const ExcerciseFitness = (props: ExerciseFitnessProps) => {
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

  const router = useRouter();

  const searchTerm = INITIAL_CHAT_MESSAGES[1].action;

  const isMobile = useIsMobile();

  const onCreateRoutine = () => {
    if (isPremium) {
      router.push(`/essentia-ai?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/pricing");
    }
  };

  return (
    <>
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
      <section className="col-[1/2] lg:col-[1/3]">
        <SectionTitle
          title="Rutinas de Ejercicios"
          hash="rutinas-de-ejercicios"
        >
          {!isMobile && (
            <Button
              radius="full"
              size="sm"
              variant="gradient"
              onClick={onCreateRoutine}
              className="before:bg-background relative z-0 transition! before:absolute before:inset-[2px] before:z-[-1] before:rounded-[14px] before:content-[''] hover:shadow-lg active:saturate-200"
            >
              <StarsIcon
                aria-hidden="true"
                className="stars-icon size-3.5! focus:outline-hidden"
              />
              <span className="from-gradient-from via-gradient-via to-gradient-to bg-gradient-to-r bg-clip-text text-sm font-bold text-transparent dark:from-[-100%]">
                Crea tu rutina
              </span>
            </Button>
          )}
        </SectionTitle>
        <Button
          fullWidth
          variant="gradient"
          onClick={onCreateRoutine}
          className="before:bg-background relative z-0 mb-4 h-14 rounded-2xl transition! before:absolute before:inset-[2px] before:z-[-1] before:rounded-[14px] before:content-[''] active:shadow-lg active:saturate-200 md:hidden"
        >
          <StarsIcon
            aria-hidden="true"
            className="stars-icon size-5! focus:outline-hidden"
          />
          <span className="from-gradient-from via-gradient-via to-gradient-to bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent dark:from-[-100%]">
            Crea tu rutina
          </span>
        </Button>
        <CardList type="routine" resource="ejercicios-y-fitness" />
      </section>
    </>
  );
};

export default ExcerciseFitness;
