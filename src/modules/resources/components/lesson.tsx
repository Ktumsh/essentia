"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  CheckCircle,
  CircleDashed,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BetterTooltip } from "@/components/ui/tooltip";
import {
  completeCourse,
  updateLessonProgress,
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

type LessonNavigation = {
  moduleSlug: string;
  lessonSlug: string;
  lessonId: string;
};

interface LessonProps {
  resource: {
    resourceId: string;
    resourceName: string;
    resourceSlug: string;
  };
  lesson: Lesson;
  modules: Modules[];
  isCompleted: boolean;
  completedLessons?: string[];
  moduleProgress: { [moduleId: string]: number };
  isCourseCompleted: boolean;
  isPremium?: boolean | null;
}

const Lesson = ({
  resource,
  lesson,
  modules,
  isCompleted,
  completedLessons,
  moduleProgress,
  isCourseCompleted,
  isPremium,
}: LessonProps) => {
  const { resourceId, resourceName, resourceSlug } = resource;

  const isMobile = useIsMobile();

  const resourceIndex = useMemo(
    () => getResourceIndex(resourceName),
    [resourceName],
  );

  const resourceDetails = useMemo(
    () => getResourceDetails(resourceName),
    [resourceName],
  );

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const { currentModuleIndex, currentLessonIndex, chapter } = useMemo(() => {
    const moduleIdx = modules.findIndex((module) =>
      module.lessons.some((l) => l.id === lesson.id),
    );
    if (moduleIdx === -1) {
      return { currentModuleIndex: -1, currentLessonIndex: -1, chapter: 0 };
    }
    const currentModule = modules[moduleIdx];
    const lessonIdx = currentModule.lessons.findIndex(
      (l) => l.id === lesson.id,
    );
    return {
      currentModuleIndex: moduleIdx,
      currentLessonIndex: lessonIdx,
      chapter: currentModule.module.order,
    };
  }, [modules, lesson.id]);

  const totalLessons = useMemo(() => {
    const currentModule = modules[currentModuleIndex];
    return currentModule?.lessons.length || 0;
  }, [modules, currentModuleIndex]);

  const findNextLesson = useCallback((): LessonNavigation | null => {
    if (currentModuleIndex === -1 || currentLessonIndex === -1) return null;
    const currentModule = modules[currentModuleIndex];
    if (currentLessonIndex + 1 < currentModule.lessons.length) {
      const nextLesson = currentModule.lessons[currentLessonIndex + 1];
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
  }, [modules, currentModuleIndex, currentLessonIndex]);

  const findPreviousLesson = useCallback((): LessonNavigation | null => {
    if (currentModuleIndex === -1 || currentLessonIndex === -1) return null;
    const currentModule = modules[currentModuleIndex];
    if (currentLessonIndex > 0) {
      const prevLesson = currentModule.lessons[currentLessonIndex - 1];
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
  }, [modules, currentModuleIndex, currentLessonIndex]);

  const isLastLesson = useMemo(() => {
    if (currentModuleIndex === -1 || currentLessonIndex === -1) return false;
    const isLastModule = currentModuleIndex === modules.length - 1;
    if (!isLastModule) return false;
    const currentModule = modules[currentModuleIndex];
    return currentLessonIndex === currentModule.lessons.length - 1;
  }, [currentModuleIndex, currentLessonIndex, modules]);

  const areAllPreviousLessonsCompleted = useCallback((): boolean => {
    for (const currentModule of modules) {
      for (const lessonItem of currentModule.lessons) {
        if (lessonItem.id === lesson.id) {
          return true;
        }
        if (!completedLessons?.includes(lessonItem.id)) {
          return false;
        }
      }
    }
    return true;
  }, [modules, lesson.id, completedLessons]);

  const handleLessonComplete = useCallback(async () => {
    if (!userId) return;

    const next = findNextLesson();

    if (isCompleted) {
      if (next) {
        router.push(`/${resourceSlug}/${next.moduleSlug}/${next.lessonSlug}`);
      } else {
        toast.info("No hay más clases disponibles.");
      }
      return;
    }

    try {
      const prevLesson = findPreviousLesson();
      if (prevLesson && !completedLessons?.includes(prevLesson.lessonId)) {
        toast.error("Para continuar debes completar la clase anterior", {
          action: {
            label: "Ir",
            onClick: () => {
              router.push(
                `/${resourceSlug}/${prevLesson.moduleSlug}/${prevLesson.lessonSlug}`,
              );
            },
          },
        });
        return;
      }

      toast.promise(
        (async () => {
          await updateLessonProgress(userId, lesson.id, resourceId);
        })(),
        {
          loading: "Avanzando a la siguiente clase...",
          success: "¡Clase completada!",
          error: "Error al avanzar a la siguiente clase",
        },
      );
      if (next) {
        router.push(`/${resourceSlug}/${next.moduleSlug}/${next.lessonSlug}`);
      }
    } catch (error) {
      console.error("Error al completar la lección:", error);
    } finally {
      router.refresh();
    }
  }, [
    userId,
    findNextLesson,
    isCompleted,
    findPreviousLesson,
    completedLessons,
    lesson.id,
    resourceId,
    resourceSlug,
    router,
  ]);

  const handleFinishCourse = useCallback(async () => {
    if (!userId) return;

    try {
      if (!areAllPreviousLessonsCompleted()) {
        toast.error(
          "Para finalizar el curso debes haber completado todas las clases anteriores",
        );
        return;
      }

      toast.promise(
        (async () => {
          await updateLessonProgress(userId, lesson.id, resourceId);
          await completeCourse(userId, resourceId);
        })(),
        {
          loading: "Finalizando curso...",
          success: `¡Haz finalizado el curso de ${resourceName}!`,
          error: "Error al finalizar el curso",
        },
      );

      router.push(`/${resourceSlug}`);
    } catch (error) {
      console.error("Error al finalizar el curso:", error);
      toast.error(
        "Hubo un error al finalizar el curso. Por favor, intenta nuevamente.",
      );
    } finally {
      router.refresh();
    }
  }, [
    userId,
    lesson.id,
    resourceId,
    resourceName,
    resourceSlug,
    router,
    areAllPreviousLessonsCompleted,
  ]);

  const isPremiumResource =
    [
      "ejercicios-y-fitness",
      "nutricion-y-alimentacion",
      "bienestar-emocional",
      "salud-y-educacion-sexual",
      "salud-en-todas-las-edades",
    ].includes(resourceSlug) && !isPremium;

  if (isPremiumResource) return null;

  if (currentModuleIndex === -1 || currentLessonIndex === -1) {
    return (
      <Card className="border-red-200 text-main dark:border-red-900 dark:text-white">
        <CardFooter className="flex-row items-center gap-2">
          <CheckCircle className="size-5 text-red-500" />
          <p className="mt-0! text-base">Lección no encontrada.</p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      <section className="relative space-y-5 px-6 pt-5 text-main dark:text-white lg:lg:col-[1/2] lg:row-[1/2] lg:px-0">
        <div className="relative flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-4">
          <div className="inline-flex items-center gap-2">
            <Button
              size="icon"
              radius="full"
              variant="ghost"
              className="shrink-0 self-start"
              onClick={() => router.push(`/${resourceSlug}`)}
            >
              <ArrowLeft className="size-5! text-main-h dark:text-main-dark" />
            </Button>
            <h1 className="text-2xl font-bold md:text-3xl">{lesson.title}</h1>
          </div>
          <BetterTooltip
            content={
              isCompleted
                ? "¡Haz completado esta clase!"
                : "Esta clase está pendiente"
            }
          >
            <Badge
              className={cn(
                "w-fit bg-amber-500 py-1.5 text-white! hover:bg-amber-500 dark:bg-amber-600 dark:hover:bg-amber-600",
                {
                  "bg-green-500 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-600":
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
          <Link href={`/${resourceSlug}`}>
            <ResourceBadge
              resourceIndex={resourceIndex}
              resourceDetails={resourceDetails}
            />
          </Link>
          <div className="leading-tight">
            <Link
              href={`/${resourceSlug}`}
              className={cn(
                "block w-fit font-semibold",
                getResourceColor(resourceIndex, "text"),
              )}
            >
              {resourceName}
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-sm text-main-h dark:text-main-dark-h">
              <span>Módulo {chapter}</span>
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
          <CardContent className="p-5">
            <Markdown prose="max-w-full!">{lesson.content as string}</Markdown>
          </CardContent>
          <CardFooter
            isSecondary
            className={cn(
              "flex-col gap-2 p-5! sm:flex-row sm:justify-between",
              {
                "sm:justify-end!": !findPreviousLesson(),
              },
            )}
          >
            <Button
              radius="full"
              variant="outline"
              className={cn("hidden w-full sm:w-fit", {
                "inline-flex": findPreviousLesson(),
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
            {isLastLesson && !isCourseCompleted ? (
              <Button
                radius="full"
                variant="outline"
                className="w-full sm:w-fit"
                onClick={handleFinishCourse}
              >
                Finalizar Curso
                <CheckCheck />
              </Button>
            ) : (
              findNextLesson() && (
                <Button
                  radius="full"
                  variant="outline"
                  className="w-full sm:w-fit"
                  onClick={handleLessonComplete}
                >
                  Clase siguiente
                  <ArrowRight />
                </Button>
              )
            )}
          </CardFooter>
        </Card>
        {!isCompleted && (
          <>
            {!isLastLesson && (
              <p className="mt-2 text-center text-xs md:text-sm">
                *Para marcar la clase como{" "}
                <span className="font-semibold text-green-500">completada</span>{" "}
                debes {isMobile ? "presionar " : "hacer clic "}en el botón de{" "}
                <span className="font-semibold text-main dark:text-white">
                  Clase siguiente
                </span>
                .
              </p>
            )}
            {!isCourseCompleted &&
              (isLastLesson ? (
                <p className="mt-2 text-center text-xs md:text-sm">
                  *Para poder finalizar el curso asegúrate de haber completado
                  todas las clases anteriores.
                </p>
              ) : (
                <p className="mt-2 text-center text-xs md:text-sm">
                  *Recuerda que debes completar las clases en orden para poder
                  avanzar.
                </p>
              ))}
          </>
        )}
      </section>
      <section className="sticky top-0 px-6 py-5 lg:col-[2/3] lg:row-[1/3] lg:px-0">
        <h3 className="mb-2 text-lg font-semibold text-main dark:text-white">
          Módulos
        </h3>
        <ChapterList
          modules={modules}
          resourceSlug={resourceSlug}
          completedLessons={completedLessons}
          moduleProgress={moduleProgress}
        />
        {isCourseCompleted && (
          <div className="mt-6 inline-flex w-full items-center justify-center text-sm">
            <p>¡Felicidades! Haz finalizado este curso 🎉</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Lesson;
