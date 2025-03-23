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
import { memo, useCallback, useMemo } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import { Card, CardContent, CardFooter } from "@/components/kit/card";
import { BetterTooltip } from "@/components/kit/tooltip";
import { Markdown } from "@/components/markdown";
import {
  completeCourse,
  updateLessonProgress,
} from "@/db/querys/progress-query";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  cn,
  getResourceColor,
  getResourceDetails,
  getResourceIndex,
} from "@/lib/utils";
import { Modules } from "@/types/resource";

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
      <Card className="border-red-200 dark:border-red-900">
        <CardFooter className="flex-row items-center gap-2">
          <CheckCircle className="size-5 text-red-500" />
          <p className="mt-0! text-base">Lección no encontrada.</p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      <section className="relative space-y-5 pt-5 lg:lg:col-[1/2] lg:row-[1/2]">
        <div className="relative flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-4">
          <div className="inline-flex items-center gap-2">
            <Button
              size="icon"
              radius="full"
              variant="ghost"
              className="text-muted-foreground -ml-2 shrink-0 self-start"
              onClick={() => router.push(`/${resourceSlug}`)}
            >
              <ArrowLeft className="size-5!" />
            </Button>
            <h1 className="font-merriweather text-xl font-bold md:text-2xl">
              {lesson.title}
            </h1>
          </div>
          <BetterTooltip
            content={
              isCompleted
                ? "¡Haz completado esta clase!"
                : "Esta clase está pendiente"
            }
          >
            <Badge variant={isCompleted ? "success" : "warning"}>
              {isCompleted ? "Completada" : "Pendiente"}
              {isCompleted ? (
                <CheckCircle className="ml-1.5 size-3" />
              ) : (
                <CircleDashed className="ml-1.5 size-3" />
              )}
            </Badge>
          </BetterTooltip>
        </div>
        <div className="inline-flex w-full items-center gap-4">
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
            <div className="text-foreground/80 flex flex-wrap items-center gap-2 text-sm">
              <span>Capítulo {chapter}</span>
              <span aria-hidden="true">•</span>
              <span>
                Clase {lesson.order} de {totalLessons}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="inline-flex items-center gap-2">
            <CheckCheck className="size-4 text-green-500" />
            <h3 className="font-merriweather text-lg font-semibold">
              Objetivo de la clase
            </h3>
          </div>
          <div className="relative mb-6 flex justify-between gap-4 md:mb-0">
            <p className="text-foreground/80 text-sm md:text-base">
              {lesson.objective}
            </p>
            <div
              className={cn(
                "absolute right-0 -bottom-10 flex justify-end gap-2 self-end px-6 md:static md:px-0",
                {
                  "sm:justify-end!": !findPreviousLesson(),
                },
              )}
            >
              <PreviousClassButton
                resource={resource}
                findPreviousLesson={findPreviousLesson}
                hideLabel
              />
              <NextClassButton
                isLastLesson={isLastLesson}
                isCourseCompleted={isCourseCompleted}
                handleFinishCourse={handleFinishCourse}
                handleLessonComplete={handleLessonComplete}
                findNextLesson={findNextLesson}
                hideLabel
              />
            </div>
          </div>
        </div>
      </section>
      <section className="relative lg:col-[1/2] lg:row-[2/4]">
        <Card className="dark:bg-accent/30 dark:border-alternative/50 rounded-xl bg-slate-50">
          <CardContent className="p-5">
            <Markdown className="prose-sm md:prose prose-marker prose-headings:text-foreground prose-headings:text-pretty prose-headings:font-bold prose-headings:text-base md:prose-headings:text-lg prose-headings:mb-2 prose-p:text-foreground/80 prose-p:text-pretty prose-p:leading-normal prose-p:mb-6 prose-p:mt-3 prose-strong:text-foreground prose-hr:border-slate-200 dark:prose-hr:border-alternative/50 prose-hr:my-5 prose-h3:text-base max-w-full! md:text-base!">
              {lesson.content as string}
            </Markdown>
          </CardContent>
          <CardFooter
            isSecondary
            className={cn(
              "dark:border-t-alternative/50! flex-col gap-2 p-5! sm:flex-row sm:justify-between",
              {
                "sm:justify-end!": !findPreviousLesson(),
              },
            )}
          >
            <PreviousClassButton
              resource={resource}
              findPreviousLesson={findPreviousLesson}
            />
            <NextClassButton
              isLastLesson={isLastLesson}
              isCourseCompleted={isCourseCompleted}
              handleFinishCourse={handleFinishCourse}
              handleLessonComplete={handleLessonComplete}
              findNextLesson={findNextLesson}
            />
          </CardFooter>
        </Card>
        {!isCompleted && (
          <>
            {isLastLesson && (
              <p className="mt-2 text-center text-xs md:text-sm">
                *Para marcar la clase como{" "}
                <span className="font-semibold text-emerald-500">
                  completada
                </span>{" "}
                debes {isMobile ? "presionar " : "hacer clic "}en el botón de{" "}
                <span className="font-semibold">Clase siguiente</span>.
              </p>
            )}
            {!isCourseCompleted &&
              !isCompleted &&
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
        <h3 className="font-merriweather mb-2 text-lg font-semibold">
          Capítulos
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

function PureNextClassButton({
  isLastLesson,
  isCourseCompleted,
  handleFinishCourse,
  handleLessonComplete,
  findNextLesson,
  hideLabel,
}: {
  isLastLesson: boolean;
  isCourseCompleted: boolean;
  handleFinishCourse: () => void;
  handleLessonComplete: () => void;
  findNextLesson: () => LessonNavigation | null;
  hideLabel?: boolean;
}) {
  return isLastLesson && !isCourseCompleted ? (
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
      <BetterTooltip content="Clase siguiente" hidden={!hideLabel}>
        <Button
          aria-label="Clase siguiente"
          radius="full"
          variant="outline"
          className={cn(
            "dark:border-alternative/50 bg-background w-full sm:w-fit",
            {
              "size-9! p-0": hideLabel,
            },
          )}
          onClick={handleLessonComplete}
        >
          {hideLabel ? (
            <>
              <span className="sr-only">Clase siguiente</span>
            </>
          ) : (
            <>Clase siguiente</>
          )}
          <ArrowRight />
        </Button>
      </BetterTooltip>
    )
  );
}

const NextClassButton = memo(PureNextClassButton, (prevProps, nextProps) => {
  if (prevProps.isLastLesson !== nextProps.isLastLesson) return false;
  if (prevProps.isCourseCompleted !== nextProps.isCourseCompleted) return false;
  if (prevProps.handleFinishCourse !== nextProps.handleFinishCourse)
    return false;
  if (prevProps.handleLessonComplete !== nextProps.handleLessonComplete)
    return false;
  if (prevProps.findNextLesson !== nextProps.findNextLesson) return false;

  return true;
});

function PurePreviousClassButton({
  resource,
  findPreviousLesson,
  hideLabel,
}: {
  resource: { resourceSlug: string };
  findPreviousLesson: () => LessonNavigation | null;
  hideLabel?: boolean;
}) {
  const router = useRouter();
  return (
    <BetterTooltip content="Clase anterior" hidden={!hideLabel}>
      <Button
        aria-label="Clase anterior"
        radius="full"
        variant="outline"
        className={cn(
          "dark:border-alternative/50 bg-background w-full sm:w-fit",
          {
            "size-9! p-0": hideLabel,
          },
        )}
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
        {hideLabel ? (
          <>
            <span className="sr-only">Clase anterior</span>
          </>
        ) : (
          <>Clase anterior</>
        )}
      </Button>
    </BetterTooltip>
  );
}

const PreviousClassButton = memo(
  PurePreviousClassButton,
  (prevProps, nextProps) => {
    if (prevProps.resource !== nextProps.resource) return false;
    if (prevProps.findPreviousLesson !== nextProps.findPreviousLesson)
      return false;

    return true;
  },
);
