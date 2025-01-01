"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { HashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { StarsIcon } from "@/modules/icons/common";

import CardList from "./card-list";
import CourseList from "./course-list";

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
      />
      <section className="col-[1/2] mt-5 px-6 py-4 lg:col-[1/3] lg:p-0">
        <div className="relative flex w-full select-none justify-between">
          <h3 className="text-main dark:text-white">
            <Link
              id="rutinas-de-ejercicios"
              data-id="rutinas-de-ejercicios"
              data-name="Rutinas de Ejercicios"
              href="#rutinas-de-ejercicios"
              className="group mb-4 inline-flex h-auto w-fit items-center gap-0 text-balance bg-transparent text-2xl font-bold transition hover:opacity-80 md:text-3xl lg:px-0"
            >
              Rutinas de Ejercicios
              <HashIcon
                strokeWidth={1.5}
                className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Link>
          </h3>
          {!isMobile && (
            <Button
              radius="full"
              size="sm"
              onClick={onCreateRoutine}
              className="relative z-0 shrink-0 bg-light-gradient-v2 !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-full before:bg-white before:content-[''] hover:shadow-lg hover:saturate-200 dark:bg-dark-gradient-v2 before:dark:bg-full-dark"
            >
              <StarsIcon
                aria-hidden="true"
                className="stars-icon !size-3.5 focus:outline-none"
              />
              <span className="bg-light-gradient-v2 bg-clip-text font-sans font-extrabold text-transparent dark:bg-dark-gradient-v2">
                Crea tu rutina
              </span>
            </Button>
          )}
        </div>

        <Button
          fullWidth
          onClick={onCreateRoutine}
          className="relative z-0 mb-4 h-14 rounded-2xl bg-light-gradient-v2 !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-[14px] before:bg-white before:content-[''] active:shadow-lg active:saturate-200 dark:bg-dark-gradient-v2 before:dark:bg-full-dark md:hidden"
        >
          <StarsIcon
            aria-hidden="true"
            className="stars-icon !size-5 focus:outline-none"
          />
          <span className="bg-light-gradient-v2 bg-clip-text text-lg font-extrabold text-transparent dark:bg-dark-gradient-v2">
            Crea tu rutina
          </span>
        </Button>
        <CardList type="routine" resource="ejercicios-y-fitness" />
      </section>
    </>
  );
};

export default ExcerciseFitness;
