"use client";

import { CheckCircle, CircleDashed } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/ui/circular-progress";
import { cn } from "@/utils/common";

import type { Modules } from "@/types/resource";

interface ChapterListProps {
  modules?: Modules[];
  resourceSlug?: string;
  completedLessons?: string[];
  moduleProgress: { [moduleId: string]: number };
  onLessonClick?: (href: string) => void;
  isDisaled?: boolean;
}

const ChapterList = ({
  modules,
  resourceSlug,
  completedLessons = [],
  moduleProgress,
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

  const currentModule = modules
    ?.map((mod, index) =>
      mod.lessons.some((l) => pathname.includes(l.slug))
        ? `module-${index}`
        : null,
    )
    .filter((index): index is string => index !== null);

  return (
    <Accordion
      type="multiple"
      defaultValue={
        pathname === `/${resourceSlug}` ? ["module-0"] : currentModule
      }
      className="mt-0! w-full space-y-4"
    >
      {modules?.map((item, index) => {
        return (
          <AccordionItem
            disabled={isDisaled}
            key={item.module.title}
            value={`module-${index}`}
            className="rounded-lg border"
          >
            <AccordionTrigger className="gap-2 px-3 py-2 underline-offset-2 md:gap-4 md:px-6 md:py-4 md:hover:no-underline">
              <CircularProgress
                aria-label={moduleProgress[item.module.id] + "%"}
                value={moduleProgress[item.module.id] || 0}
                showLabel
                labelClassName="text-xxs"
                size={32}
                strokeWidth={3}
                progressClassName={getProgressColor(
                  moduleProgress[item.module.id],
                )}
              />
              <div className="w-full">
                <span className="text-main-h dark:text-main-dark text-sm font-normal text-nowrap">
                  Capítulo {item.module.order}
                </span>
                <h4 className="text-main text-base dark:text-white">
                  {item.module.title}
                </h4>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "dark:bg-dark/50 m-1 overflow-hidden rounded-lg bg-gray-100 pb-0",
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
                  const href = `/${resourceSlug}/${item.module.slug}/${lesson.slug}`;

                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={href}
                        onClick={(e) => handleLessonClick(e, href)}
                        className={cn(
                          "text-main dark:hover:bg-dark relative flex w-full items-center justify-between gap-4 overflow-hidden px-4 py-2 text-sm transition-colors duration-150 hover:bg-gray-200 dark:text-white",
                          {
                            "text-main dark:bg-dark bg-gray-200 dark:text-white":
                              isActive,
                          },
                        )}
                      >
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
                {item.exam && (
                  <li key={`exam-${item.exam.slug}`}>
                    <Link
                      href={`/${resourceSlug}/${item.module.slug}/${item.exam.slug}`}
                      className={cn(
                        "text-main-h hover:text-main dark:text-main-dark dark:hover:bg-dark relative flex w-full items-center justify-between gap-4 overflow-hidden px-4 py-2 text-sm transition-colors duration-150 hover:bg-gray-200 dark:hover:text-white",
                        "pointer-events-none",
                        {
                          "text-main dark:bg-dark bg-gray-200 dark:text-white":
                            pathname.includes(item.exam.slug),
                        },
                      )}
                    >
                      <p className="flex grow items-center gap-1 opacity-50">
                        ¡Evalúa lo que aprendiste!
                      </p>
                      <Badge className="bg-danger/10! text-danger! font-normal">
                        Próximamente
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
