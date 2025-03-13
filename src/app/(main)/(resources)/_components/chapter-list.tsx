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
} from "@/components/kit/accordion";
import { Badge } from "@/components/kit/badge";
import { CircularProgress } from "@/components/kit/circular-progress";
import { cn } from "@/lib/utils";

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
            className="rounded-2xl border!"
          >
            <AccordionTrigger className="text-foreground/80 gap-2 px-3 py-2 underline-offset-2 md:gap-4 md:px-6 md:py-4 md:hover:no-underline">
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
                <span className="text-foreground/80 text-sm font-normal text-nowrap">
                  Capítulo {item.module.order}
                </span>
                <h4 className="text-foreground text-base">
                  {item.module.title}
                </h4>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "bg-accent dark:bg-accent/50 m-1 overflow-hidden rounded-xl pb-0",
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
                          "dark:hover:bg-accent relative flex w-full items-center justify-between gap-4 overflow-hidden px-4 py-2 text-sm transition-colors duration-150 hover:bg-slate-200",
                          {
                            "dark:bg-accent bg-slate-200": isActive,
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
                        "text-main-h hover:text-main dark:text-main-dark dark:hover:bg-dark relative flex w-full items-center justify-between gap-4 overflow-hidden px-4 py-2 text-sm transition-colors duration-150 hover:bg-slate-200 dark:hover:text-white",
                        "pointer-events-none",
                        {
                          "text-main dark:bg-dark bg-slate-200 dark:text-white":
                            pathname.includes(item.exam.slug),
                        },
                      )}
                    >
                      <p className="flex grow items-center gap-1 opacity-50">
                        ¡Evalúa lo que aprendiste!
                      </p>
                      <Badge className="bg-primary/10! text-primary! font-normal">
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
