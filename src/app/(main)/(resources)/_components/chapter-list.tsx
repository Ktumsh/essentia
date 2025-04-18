"use client";

import { Award, BookOpen, CheckCircle, CircleDashed } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useMemo } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Badge } from "@/components/kit/badge";
import { CircularProgress } from "@/components/kit/circular-progress";
import { cn, getRouteColor } from "@/lib/utils";

import type { Stages } from "@/types/resource";

interface ChapterListProps {
  routeIndex: number;
  stages?: Stages[];
  routeSlug?: string;
  completedLessons?: string[];
  stageProgress: { [moduleId: string]: number };
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
  const pathname = usePathname();

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
        return (
          <AccordionItem
            disabled={isDisaled}
            key={item.stage.title}
            value={`module-${index}`}
            className="rounded-2xl border!"
          >
            <AccordionTrigger className="text-foreground/80 gap-2 px-3 py-2 underline-offset-2 md:gap-4 md:px-6 md:py-4 md:hover:no-underline">
              <CircularProgress
                aria-label={stageProgress[item.stage.id] + "%"}
                value={stageProgress[item.stage.id] || 0}
                showLabel
                labelClassName="text-xxs"
                size={32}
                strokeWidth={3}
                progressClassName={getProgressColor(
                  stageProgress[item.stage.id],
                )}
              />
              <div className="w-full">
                <span
                  className={cn(
                    "text-sm font-normal text-nowrap",
                    textMutedColor,
                  )}
                >
                  Etapa {item.stage.order + 1}
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
                      className={cn(
                        "text-foreground/80 hover:text-foreground hover:bg-accent relative flex w-full items-center justify-between gap-4 overflow-hidden px-4 py-2 text-sm transition-colors duration-150",
                        "pointer-events-none",
                        {
                          "text-foreground bg-accent": pathname.includes(
                            item.review.slug,
                          ),
                        },
                      )}
                    >
                      <Award className="size-3.5 text-amber-500" />
                      <p className="flex grow items-center gap-1 opacity-50">
                        ¡Reflexiona sobre lo aprendido!
                      </p>
                      <Badge className="bg-primary/10! text-primary! rounded-[6px] font-normal">
                        ¡Próximamente!
                      </Badge>
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
