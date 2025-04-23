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
  completeRoute,
  StageProgressType,
  updateLessonProgress,
} from "@/db/querys/progress-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getRouteColor, getRouteDetails, getRouteIndex } from "@/lib/utils";
import { Stages } from "@/types/resource";

import ChapterList from "./chapter-list";
import RouteBadge from "./route-badge";

import type { Lesson } from "@/db/schema";

type LessonNavigation = {
  stageSlug: string;
  lessonSlug: string;
  lessonId: string;
};

interface LessonProps {
  route: {
    routeId: string;
    routeName: string;
    routeSlug: string;
  };
  lesson: Lesson;
  stages: Stages[];
  isCompleted: boolean;
  completedLessons?: string[];
  stageProgress: StageProgressType[];
  isCourseCompleted: boolean;
  isPremium?: boolean | null;
}

const Lesson = ({
  route,
  lesson,
  stages,
  isCompleted,
  completedLessons,
  stageProgress,
  isCourseCompleted,
  isPremium,
}: LessonProps) => {
  const { routeId, routeName, routeSlug } = route;

  const isMobile = useIsMobile();

  const routeIndex = useMemo(() => getRouteIndex(routeName), [routeName]);

  const routeDetails = useMemo(() => getRouteDetails(routeName), [routeName]);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const { currentStageIndex, currentLessonIndex, chapter } = useMemo(() => {
    const stageIdx = stages.findIndex((module) =>
      module.lessons.some((l) => l.id === lesson.id),
    );
    if (stageIdx === -1) {
      return { currentStageIndex: -1, currentLessonIndex: -1, chapter: 0 };
    }
    const currentStage = stages[stageIdx];
    const lessonIdx = currentStage.lessons.findIndex((l) => l.id === lesson.id);
    return {
      currentStageIndex: stageIdx,
      currentLessonIndex: lessonIdx,
      chapter: currentStage.stage.order,
    };
  }, [stages, lesson.id]);

  const totalLessons = useMemo(() => {
    const currentStage = stages[currentStageIndex];
    return currentStage?.lessons.length || 0;
  }, [stages, currentStageIndex]);

  const findNextLesson = useCallback((): LessonNavigation | null => {
    if (currentStageIndex === -1 || currentLessonIndex === -1) return null;
    const currentStage = stages[currentStageIndex];
    if (currentLessonIndex + 1 < currentStage.lessons.length) {
      const nextLesson = currentStage.lessons[currentLessonIndex + 1];
      return {
        stageSlug: currentStage.stage.slug,
        lessonSlug: nextLesson.slug,
        lessonId: nextLesson.id,
      };
    }
    const nextModule = stages[currentStageIndex + 1];
    if (nextModule && nextModule.lessons.length > 0) {
      const firstLesson = nextModule.lessons[0];
      return {
        stageSlug: nextModule.stage.slug,
        lessonSlug: firstLesson.slug,
        lessonId: firstLesson.id,
      };
    }
    return null;
  }, [stages, currentStageIndex, currentLessonIndex]);

  const findPreviousLesson = useCallback((): LessonNavigation | null => {
    if (currentStageIndex === -1 || currentLessonIndex === -1) return null;
    const currentStage = stages[currentStageIndex];
    if (currentLessonIndex > 0) {
      const prevLesson = currentStage.lessons[currentLessonIndex - 1];
      return {
        stageSlug: currentStage.stage.slug,
        lessonSlug: prevLesson.slug,
        lessonId: prevLesson.id,
      };
    }
    const prevModule = stages[currentStageIndex - 1];
    if (prevModule && prevModule.lessons.length > 0) {
      const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
      return {
        stageSlug: prevModule.stage.slug,
        lessonSlug: lastLesson.slug,
        lessonId: lastLesson.id,
      };
    }
    return null;
  }, [stages, currentStageIndex, currentLessonIndex]);

  const isLastLesson = useMemo(() => {
    if (currentStageIndex === -1 || currentLessonIndex === -1) return false;
    const isLastModule = currentStageIndex === stages.length - 1;
    if (!isLastModule) return false;
    const currentStage = stages[currentStageIndex];
    return currentLessonIndex === currentStage.lessons.length - 1;
  }, [currentStageIndex, currentLessonIndex, stages]);

  const areAllPreviousLessonsCompleted = useCallback((): boolean => {
    for (const currentStage of stages) {
      for (const lessonItem of currentStage.lessons) {
        if (lessonItem.id === lesson.id) {
          return true;
        }
        if (!completedLessons?.includes(lessonItem.id)) {
          return false;
        }
      }
    }
    return true;
  }, [stages, lesson.id, completedLessons]);

  const handleLessonComplete = useCallback(async () => {
    if (!userId) return;

    const next = findNextLesson();

    if (isCompleted) {
      if (next) {
        router.push(`/${routeSlug}/${next.stageSlug}/${next.lessonSlug}`);
      } else {
        toast.info("No hay más lecciones disponibles.");
      }
      return;
    }

    try {
      const prevLesson = findPreviousLesson();
      if (prevLesson && !completedLessons?.includes(prevLesson.lessonId)) {
        toast.error("Para continuar debes completar la lección anterior", {
          action: {
            label: "Ir",
            onClick: () => {
              router.push(
                `/${routeSlug}/${prevLesson.stageSlug}/${prevLesson.lessonSlug}`,
              );
            },
          },
        });
        return;
      }

      toast.promise(
        (async () => {
          await updateLessonProgress(userId, lesson.id, routeId);
        })(),
        {
          loading: "Avanzando a la siguiente lección...",
          success: "¡Lección completada!",
          error: "Error al avanzar a la siguiente lección",
        },
      );
      if (next) {
        router.push(`/${routeSlug}/${next.stageSlug}/${next.lessonSlug}`);
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
    routeId,
    routeSlug,
    router,
  ]);

  const handleFinishCourse = useCallback(async () => {
    if (!userId) return;

    try {
      if (!areAllPreviousLessonsCompleted()) {
        toast.error(
          "Para finalizar el curso debes haber completado todas las lecciones anteriores",
        );
        return;
      }

      toast.promise(
        (async () => {
          await updateLessonProgress(userId, lesson.id, routeId);
          await completeRoute(userId, routeId);
        })(),
        {
          loading: "Finalizando curso...",
          success: `¡Haz finalizado el curso de ${routeName}!`,
          error: "Error al finalizar el curso",
        },
      );

      router.push(`/${routeSlug}`);
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
    routeId,
    routeName,
    routeSlug,
    router,
    areAllPreviousLessonsCompleted,
  ]);

  const isPremiumRoute =
    [
      "ejercicios-y-fitness",
      "nutricion-y-alimentacion",
      "bienestar-emocional",
      "salud-y-educacion-sexual",
      "salud-en-todas-las-edades",
    ].includes(routeSlug) && !isPremium;

  if (isPremiumRoute) return null;

  if (currentStageIndex === -1 || currentLessonIndex === -1) {
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
              onClick={() => router.push(`/${routeSlug}`)}
            >
              <ArrowLeft className="size-5!" />
            </Button>
            <h1 className="font-merriweather text-xl font-bold md:text-2xl">
              {lesson.title}{" "}
              {lesson.title.includes("Introducción a la ruta") &&
                " de aprendizaje"}
            </h1>
          </div>
          <BetterTooltip
            content={
              isCompleted
                ? "¡Haz completado esta lección!"
                : "Esta lección está pendiente"
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
          <Link href={`/${routeSlug}`}>
            <RouteBadge routeIndex={routeIndex} routeDetails={routeDetails} />
          </Link>
          <div className="leading-tight">
            <Link
              href={`/${routeSlug}`}
              className={cn(
                "block w-fit font-semibold",
                getRouteColor(routeIndex, "text"),
              )}
            >
              {routeName}
            </Link>
            <div className="text-foreground/80 flex flex-wrap items-center gap-2 text-sm">
              <span>Etapa {chapter}</span>
              <span aria-hidden="true">•</span>
              <span>
                Lección {lesson.order} de {totalLessons}
              </span>
            </div>
          </div>
        </div>
        <div className="dark:bg-accent/50 relative flex flex-col space-y-1.5 rounded-xl bg-slate-50 p-3">
          <div className="inline-flex items-center gap-2">
            <CheckCheck className="size-4 text-green-500" />
            <h3 className="font-merriweather text-base font-semibold md:text-lg">
              Objetivo de la lección
            </h3>
          </div>
          <div className="relative flex justify-between gap-4">
            <p className="text-foreground/80 text-sm md:text-base">
              {lesson.objective}
            </p>
          </div>
          <div
            className={cn("absolute top-0 right-0 flex justify-end gap-2 p-3", {
              "sm:justify-end!": !findPreviousLesson(),
            })}
          >
            <PreviousClassButton
              route={route}
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
      </section>
      <section className="relative lg:col-[1/2] lg:row-[2/4]">
        <Card className="rounded-none border-0">
          <CardContent className="p-0">
            <Markdown className="prose-sm md:prose prose-marker prose-headings:text-foreground prose-headings:text-pretty prose-headings:font-bold prose-headings:text-base md:prose-headings:text-lg prose-headings:mb-2 prose-p:text-foreground/80 prose-p:text-pretty prose-p:leading-normal prose-p:mb-6 prose-p:mt-3 prose-strong:text-foreground prose-hr:border-slate-200 dark:prose-hr:border-alternative/50 prose-hr:my-5 prose-h3:text-base max-w-full! md:text-base!">
              {lesson.content as string}
            </Markdown>
          </CardContent>
          <CardFooter
            isSecondary
            className={cn(
              "mt-6 flex-col gap-2 bg-transparent! p-5! sm:flex-row sm:justify-between",
              {
                "sm:justify-end!": !findPreviousLesson(),
              },
            )}
          >
            <PreviousClassButton
              route={route}
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
                *Para marcar la lección como{" "}
                <span className="font-semibold text-emerald-500">
                  completada
                </span>{" "}
                debes {isMobile ? "presionar " : "hacer clic "}en el botón de{" "}
                <span className="font-semibold">Lección siguiente</span>.
              </p>
            )}
            {!isCourseCompleted &&
              !isCompleted &&
              (isLastLesson ? (
                <p className="mt-2 text-center text-xs md:text-sm">
                  *Para poder finalizar esta ruta asegúrate de haber completado
                  todas las lecciones anteriores.
                </p>
              ) : (
                <p className="mt-2 text-center text-xs md:text-sm">
                  *Recuerda que debes completar las lecciones en orden para
                  poder avanzar.
                </p>
              ))}
          </>
        )}
      </section>
      <section className="sticky top-0 pt-0 pb-5 md:pt-16 lg:col-[2/3] lg:row-[1/3]">
        <h3 className="font-merriweather mb-2 text-lg font-semibold">Etapas</h3>
        <ChapterList
          routeIndex={routeIndex}
          stages={stages}
          routeSlug={routeSlug}
          completedLessons={completedLessons}
          stageProgress={stageProgress}
        />
        {isCourseCompleted && (
          <div className="mt-6 inline-flex w-full items-center justify-center text-sm">
            <p>¡Felicidades! Haz finalizado esta ruta 🎉</p>
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
      <BetterTooltip content="Lección siguiente" hidden={!hideLabel}>
        <Button
          aria-label="Lección siguiente"
          radius="full"
          variant="outline"
          className={cn("bg-background w-full sm:w-fit", {
            "size-6 p-0 md:size-7!": hideLabel,
          })}
          onClick={handleLessonComplete}
        >
          {hideLabel ? (
            <>
              <span className="sr-only">Lección siguiente</span>
            </>
          ) : (
            <>Lección siguiente</>
          )}
          <ArrowRight className="size-3.5!" />
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
  route,
  findPreviousLesson,
  hideLabel,
}: {
  route: { routeSlug: string };
  findPreviousLesson: () => LessonNavigation | null;
  hideLabel?: boolean;
}) {
  const router = useRouter();
  return (
    <BetterTooltip content="Lección anterior" hidden={!hideLabel}>
      <Button
        aria-label="Lección anterior"
        radius="full"
        variant="outline"
        className={cn("bg-background w-full sm:w-fit", {
          "size-6 p-0 md:size-7!": hideLabel,
        })}
        onClick={() => {
          const prevLesson = findPreviousLesson();
          if (prevLesson) {
            router.push(
              `/${route.routeSlug}/${prevLesson.stageSlug}/${prevLesson.lessonSlug}`,
            );
          }
        }}
      >
        <ArrowLeft className="size-3.5!" />
        {hideLabel ? (
          <>
            <span className="sr-only">Lección anterior</span>
          </>
        ) : (
          <>Lección anterior</>
        )}
      </Button>
    </BetterTooltip>
  );
}

const PreviousClassButton = memo(
  PurePreviousClassButton,
  (prevProps, nextProps) => {
    if (prevProps.route !== nextProps.route) return false;
    if (prevProps.findPreviousLesson !== nextProps.findPreviousLesson)
      return false;

    return true;
  },
);
