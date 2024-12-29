"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  CheckCircle,
  CircleDashed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { BetterTooltip } from "@/components/ui/tooltip";
import {
  updateLessonProgress,
  updateModuleProgress,
} from "@/db/querys/progress-query";
import { Markdown } from "@/modules/core/components/ui/renderers/markdown";
import {
  getResourceColor,
  getResourceDetails,
  getResourceIndex,
} from "@/modules/core/lib/utils";
import { Modules } from "@/types/resource";
import { cn } from "@/utils/common";

import ChapterList from "./chapter-list";
import ResourceBadge from "./resource-badge";

import type { Lesson } from "@/db/schema";

interface LessonProps {
  resource: {
    resourceName: string;
    resourceSlug: string;
  };
  lesson: Lesson;
  modules: Modules[];
  isCompleted: boolean;
  completedLessons?: string[];
  progress: { [moduleId: string]: number };
}

const Lesson = ({
  resource,
  lesson,
  modules,
  isCompleted,
  completedLessons,
  progress,
}: LessonProps) => {
  const { resourceName, resourceSlug } = resource;

  const resourceIndex = getResourceIndex(resourceName);

  const resourceDetails = getResourceDetails(resourceName);

  const chapter = modules.filter((module) =>
    module.lessons.some((l) => l.slug === lesson.slug),
  )[0].module.order;

  const totalLessons = modules[lesson.order]?.lessons.length || 0;

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const router = useRouter();

  const findNextLesson = () => {
    const currentModuleIndex = modules.findIndex((module) =>
      module.lessons.some((l) => l.id === lesson.id),
    );

    if (currentModuleIndex === -1) return null;

    const currentModule = modules[currentModuleIndex];

    if (!currentModule || !currentModule.lessons) return null;

    const lessons = currentModule.lessons;
    const currentLessonIndex = lessons.findIndex((l) => l.id === lesson.id);

    if (currentLessonIndex + 1 < lessons.length) {
      const nextLesson = lessons[currentLessonIndex + 1];
      return {
        moduleSlug: currentModule.module.slug,
        lessonSlug: nextLesson.slug,
        lessonId: nextLesson.id,
      };
    }

    const nextModule = modules[currentModuleIndex + 1];
    if (nextModule && nextModule.lessons.length > 0) {
      const firstLesson = nextModule.lessons[0];
      return {
        moduleSlug: nextModule.module.slug,
        lessonSlug: firstLesson.slug,
        lessonId: firstLesson.id,
      };
    }

    return null;
  };

  const findPreviousLesson = () => {
    const currentModuleIndex = modules.findIndex((module) =>
      module.lessons.some((l) => l.id === lesson.id),
    );

    if (currentModuleIndex === -1) return null;

    const currentModule = modules[currentModuleIndex];

    if (!currentModule || !currentModule.lessons) return null;

    const lessons = currentModule.lessons;
    const currentLessonIndex = lessons.findIndex((l) => l.id === lesson.id);

    if (currentLessonIndex > 0) {
      const prevLesson = lessons[currentLessonIndex - 1];
      return {
        moduleSlug: currentModule.module.slug,
        lessonSlug: prevLesson.slug,
        lessonId: prevLesson.id,
      };
    }

    const prevModule = modules[currentModuleIndex - 1];
    if (prevModule && prevModule.lessons.length > 0) {
      const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
      return {
        moduleSlug: prevModule.module.slug,
        lessonSlug: lastLesson.slug,
        lessonId: lastLesson.id,
      };
    }

    return null;
  };

  const handleLessonComplete = async () => {
    if (!userId) return;

    const prevLesson = findPreviousLesson();
    const next = findNextLesson();

    if (isCompleted) {
      if (next) {
        router.push(
          `/${resource.resourceSlug}/${next.moduleSlug}/${next.lessonSlug}`,
        );
      } else {
        toast.info("No hay más clases disponibles.");
      }
      return;
    }

    try {
      if (prevLesson && !completedLessons?.includes(prevLesson.lessonId)) {
        toast.error("Para continuar debes completar la clase anterior", {
          action: {
            label: "Ir",
            onClick: () => {
              router.push(
                `/${resource.resourceSlug}/${prevLesson.moduleSlug}/${prevLesson.lessonSlug}`,
              );
            },
          },
        });
        return;
      }

      toast.promise(
        (async () => {
          await updateLessonProgress(userId, lesson.id);
          await updateModuleProgress(userId, lesson.moduleId);
        })(),
        {
          loading: "Avanzando a la siguiente clase...",
          success: "¡Clase completada!",
          error: "Error al avanzar a la siguiente clase",
        },
      );

      router.refresh();

      if (next) {
        router.push(
          `/${resource.resourceSlug}/${next.moduleSlug}/${next.lessonSlug}`,
        );
      }
    } catch (error) {
      console.error("Error al completar la lección:", error);
    }
  };

  return (
    <>
      <section className="relative space-y-5 px-6 pt-5 text-main dark:text-white lg:lg:col-[1/2] lg:row-[1/2] lg:px-0">
        <div className="relative flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-4">
          <h1 className="text-2xl font-bold md:text-3xl">{lesson.title}</h1>
          <BetterTooltip
            content={
              isCompleted
                ? "¡Haz completado esta clase!"
                : "Esta clase está pendiente"
            }
          >
            <Badge
              className={cn(
                "w-fit bg-amber-500 py-1.5 !text-white hover:bg-amber-500 dark:bg-amber-700 dark:hover:bg-amber-700",
                {
                  "bg-green-500 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-700":
                    isCompleted,
                },
              )}
            >
              {isCompleted ? "Completada" : "Pendiente"}
              {isCompleted ? (
                <CheckCircle className="ml-1.5 size-3.5" />
              ) : (
                <CircleDashed className="ml-1.5 size-3.5" />
              )}
            </Badge>
          </BetterTooltip>
        </div>
        <div className="inline-flex items-center gap-4">
          <ResourceBadge
            resourceIndex={resourceIndex}
            resourceDetails={resourceDetails}
          />
          <div className="leading-tight">
            <span
              className={cn(
                "block font-semibold",
                getResourceColor(resourceIndex, "text"),
              )}
            >
              {resourceName}
            </span>
            <div className="flex flex-wrap items-center gap-2 text-sm text-main-h dark:text-main-dark-h">
              <span>Capítulo {chapter}</span>
              <span aria-hidden="true">•</span>
              <span>
                Clase {lesson.order} de {totalLessons}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-4 flex flex-col space-y-1 text-main dark:text-white">
          <div className="inline-flex items-center gap-2">
            <CheckCheck className="size-4 text-green-500" />
            <h3 className="text-lg font-semibold">Objetivo de la clase</h3>
          </div>
          <p className="prose-sm text-main-h md:prose dark:text-main-dark">
            {lesson.objective}
          </p>
        </div>
      </section>
      <section className="relative px-6 lg:col-[1/2] lg:row-[2/4] lg:px-0">
        <Card className="rounded-xl">
          <div className="p-5">
            <Markdown prose="!max-w-full">{lesson.content as string}</Markdown>
          </div>
          <CardFooter
            isSecondary
            className="flex-col gap-2 !p-5 sm:flex-row sm:justify-between"
          >
            <Button
              radius="full"
              variant="outline"
              className={cn("invisible w-full sm:w-fit", {
                visible: findPreviousLesson(),
              })}
              onClick={() => {
                const prevLesson = findPreviousLesson();
                if (prevLesson) {
                  router.push(
                    `/${resource.resourceSlug}/${prevLesson.moduleSlug}/${prevLesson.lessonSlug}`,
                  );
                }
              }}
            >
              <ArrowLeft />
              Clase anterior
            </Button>

            {findNextLesson() && (
              <Button
                radius="full"
                variant="outline"
                className="w-full sm:w-fit"
                onClick={handleLessonComplete}
              >
                Clase siguiente
                <ArrowRight />
              </Button>
            )}
          </CardFooter>
        </Card>
        {!isCompleted && (
          <p className="mt-2 text-balance text-center text-xs md:text-sm">
            *Para marcar la clase como{" "}
            <span className="font-semibold text-green-500">completada</span>{" "}
            debes hacer click en el botón de{" "}
            <span className="font-semibold text-main dark:text-white">
              &apos;Clase siguiente&apos;
            </span>
            *
          </p>
        )}
      </section>
      <section className="sticky top-0 px-6 py-5 lg:col-[2/3] lg:row-[1/3] lg:px-0">
        <h3 className="mb-2 text-lg font-semibold text-main dark:text-white">
          Capítulos
        </h3>
        <ChapterList
          modules={modules}
          resourceSlug={resourceSlug}
          completedLessons={completedLessons}
          progress={progress}
        />
      </section>
    </>
  );
};

export default Lesson;
