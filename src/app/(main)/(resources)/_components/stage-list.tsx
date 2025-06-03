"use client";

import { Award, BookOpen, CheckCircle, CircleDashed } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useMemo } from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { PlayButton } from "@/components/button-kit/play-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Badge } from "@/components/kit/badge";
import { CircularProgress } from "@/components/kit/circular-progress";
import { StageProgressType } from "@/db/querys/progress-querys";
import { getRouteColor } from "@/lib/utils";
import { cn } from "@/utils";

import type { Stages } from "@/lib/types";

interface ChapterListProps {
  routeIndex: number;
  stages?: Stages[];
  routeSlug?: string;
  completedLessons?: string[];
  stageProgress: StageProgressType[];
  onLessonClick?: (href: string) => void;
  isDisaled?: boolean;
}

const ChapterList = ({
  routeIndex,
  stages,
  routeSlug,
  completedLessons = [],
  stageProgress,
  onLessonClick,
  isDisaled = false,
}: ChapterListProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isLessonPage = pathname !== `/${routeSlug}`;

  const handleLessonClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (isDisaled) return;
    if (onLessonClick) {
      e.preventDefault();
      onLessonClick(href);
    }
  };

  const getProgressColor = (value: number) => {
    if (value === 0) return "stroke-transparent";
    if (value <= 25) return "stroke-red-500";
    if (value <= 50) return "stroke-amber-500";
    if (value <= 75) return "stroke-lime-500";
    return "stroke-green-500";
  };

  const currentModule = stages
    ?.map((mod, index) =>
      mod.lessons.some((l) => pathname.includes(l.slug))
        ? `module-${index}`
        : null,
    )
    .filter((index): index is string => index !== null);

  const bgColor = useMemo(
    () => getRouteColor(routeIndex, "background"),
    [routeIndex],
  );

  const textMutedColor = useMemo(
    () => getRouteColor(routeIndex, "text-muted"),
    [routeIndex],
  );

  return (
    <Accordion
      type="multiple"
      defaultValue={pathname === `/${routeSlug}` ? ["module-0"] : currentModule}
      className="mt-0! w-full space-y-4"
    >
      {stages?.map((item, index) => {
        const prog = stageProgress.find(
          (p) => p.stageId === item.stage.id,
        )! || {
          progress: 0,
          completed: false,
          reviewCompleted: false,
        };
        const isDone = prog.completed;
        const isReviewDone = prog.reviewCompleted;

        return (
          <AccordionItem
            disabled={isDisaled}
            key={item.stage.title}
            value={`module-${index}`}
            className="rounded-xl border!"
          >
            <AccordionTrigger className="text-foreground/80 gap-2 px-3 py-2 underline-offset-2 md:gap-4 md:px-6 md:py-4 md:hover:no-underline">
              <CircularProgress
                aria-label={(prog?.progress ?? 0) + "%"}
                value={prog?.progress ?? 0}
                showLabel
                labelClassName="text-xxs"
                size={32}
                strokeWidth={3}
                progressClassName={getProgressColor(prog?.progress ?? 0)}
              />
              <div className="w-full">
                <span
                  className={cn(
                    "text-sm font-normal text-nowrap",
                    textMutedColor,
                  )}
                >
                  Etapa {item.stage.order}
                </span>
                <h4 className="text-foreground text-base">
                  {item.stage.title}
                </h4>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "dark:bg-accent/50 m-1 overflow-hidden rounded-xl bg-slate-50 pb-0",
                {
                  "pointer-events-none": isDisaled,
                },
              )}
              asChild
            >
              <ul className="py-2">
                {item.lessons.map((lesson) => {
                  const isActive = pathname.includes(lesson.slug);
                  const completed = completedLessons.includes(lesson.id);
                  const href = `/${routeSlug}/${item.stage.slug}/${lesson.slug}`;

                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={href}
                        onClick={(e) => handleLessonClick(e, href)}
                        className={cn(
                          "hover:bg-accent relative flex w-full items-center justify-between gap-4 overflow-hidden px-4 py-2 text-sm transition-colors duration-150",
                          {
                            "bg-accent": isActive,
                          },
                        )}
                      >
                        <BookOpen className="text-muted-foreground size-3.5" />
                        <p className="flex grow items-center gap-1">
                          {lesson.title}
                        </p>
                        {completed ? (
                          <CheckCircle className="size-4 text-green-500" />
                        ) : (
                          <CircleDashed className="size-4 opacity-50" />
                        )}
                      </Link>
                    </li>
                  );
                })}
                {item.review && (
                  <li key={`exam-${item.review.slug}`}>
                    <Link
                      href={`/${routeSlug}/${item.stage.slug}/${item.review.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isReviewDone) {
                          router.push(
                            `/${routeSlug}/${item.stage.slug}/${item.review?.slug}`,
                          );
                          return;
                        }
                      }}
                      className={cn(
                        "hover:bg-accent relative flex w-full items-center gap-2 overflow-hidden px-4 py-2 text-sm transition-colors duration-150",
                        !isDone && "pointer-events-none opacity-60",
                        pathname.includes(item.review.slug) && "bg-accent",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <Award className="size-3.5 shrink-0 text-amber-500" />
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                          <p
                            className={cn("text-start", {
                              "opacity-50": !isDone,
                            })}
                          >
                            ¡Reflexiona sobre lo aprendido!
                          </p>
                          {isReviewDone ? (
                            <Badge
                              variant="premium"
                              className="pl-1.5! font-normal shadow-sm"
                            >
                              🏅 ¡Realizada!
                            </Badge>
                          ) : (
                            !isLessonPage && (
                              <Badge
                                className={cn(
                                  "font-normal",
                                  isDone
                                    ? [bgColor, textMutedColor]
                                    : "bg-primary/10! text-primary!",
                                )}
                              >
                                {isDone ? "Disponible" : "Bloqueada"}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                      {!isDone && !isLessonPage && (
                        <p className="text-xxs text-muted-foreground ml-auto font-normal">
                          ¡Completa la etapa para desbloquear!
                        </p>
                      )}
                      {isDone && !isReviewDone && (
                        <PlayButton
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(
                              `/${routeSlug}/${item.stage.slug}/${item.review?.slug}`,
                            );
                          }}
                          className="hover:bg-background ml-auto h-6 rounded-sm px-2! text-xs [&_svg]:size-3.5!"
                        >
                          Realizar
                        </PlayButton>
                      )}
                      {isReviewDone && !isLessonPage && (
                        <ArrowLeftButton
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(
                              `/${routeSlug}/${item.stage.slug}/${item.review?.slug}`,
                            );
                          }}
                          className="hover:bg-background ml-auto h-6 flex-row-reverse rounded-sm px-2! text-xs [&_svg]:size-3.5! [&_svg]:rotate-180"
                        >
                          Ver resultados
                        </ArrowLeftButton>
                      )}
                    </Link>
                  </li>
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ChapterList;
