"use client";

import { CircularProgress } from "@nextui-org/progress";
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

  return (
    <Accordion type="multiple" className="!mt-0 w-full space-y-4">
      {modules?.map((item, index) => {
        return (
          <AccordionItem
            disabled={isDisaled}
            key={item.module.title}
            value={`module-${index}`}
            className="rounded-lg border"
          >
            <AccordionTrigger className="gap-4 px-6 py-4 underline-offset-2 md:hover:no-underline">
              <CircularProgress
                aria-label={moduleProgress[item.module.id] + "%"}
                value={moduleProgress[item.module.id] || 0}
                strokeWidth={3}
                classNames={{
                  svg: "!size-8",
                  track: "stroke-gray-200 dark:stroke-dark",
                  indicator: getProgressColor(moduleProgress[item.module.id]),
                }}
              />
              <div className="w-full">
                <span className="text-nowrap text-sm font-normal">
                  Módulo {item.module.order}
                </span>
                <h4 className="text-base text-main dark:text-white">
                  {item.module.title}
                </h4>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className="m-1 overflow-hidden rounded-lg bg-gray-100 pb-0 dark:bg-dark/50"
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
                          "relative flex w-full items-center justify-between gap-4 overflow-hidden px-4 py-2 text-sm text-main-h transition-colors duration-150 hover:bg-gray-200 hover:text-main dark:text-main-dark dark:hover:bg-dark dark:hover:text-white",
                          {
                            "bg-gray-200 text-main dark:bg-dark dark:text-white":
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
                        "relative flex w-full items-center justify-between gap-4 overflow-hidden px-4 py-2 text-sm text-main-h transition-colors duration-150 hover:bg-gray-200 hover:text-main dark:text-main-dark dark:hover:bg-dark dark:hover:text-white",
                        "pointer-events-none",
                        {
                          "bg-gray-200 text-main dark:bg-dark dark:text-white":
                            pathname.includes(item.exam.slug),
                        },
                      )}
                    >
                      <p className="flex grow items-center gap-1 opacity-50">
                        ¡Evalúa lo que aprendiste!
                      </p>
                      <Badge className="!bg-danger/10 font-normal !text-danger">
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
