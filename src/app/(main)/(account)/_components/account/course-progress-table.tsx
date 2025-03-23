"use client";

import {
  BookOpenText,
  CalendarCheck2,
  CalendarClock,
  CircleDashed,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Progress } from "@/components/kit/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/kit/table";
import { getLastCompletedLesson } from "@/db/querys/progress-query";
import { getProgressColor } from "@/lib/utils";
import { Courses } from "@/types/resource";
import { formatDate } from "@/utils/format";

interface CourseProgressTableProps {
  userId: string;
  courses: Courses;
  isPremium: boolean | null;
}

const CourseProgressTable = ({
  userId,
  courses,
  isPremium,
}: CourseProgressTableProps) => {
  const router = useRouter();

  const continueCourse = useCallback(
    async ({
      resourceId,
      resourceSlug,
    }: {
      resourceId: string;
      resourceSlug: string;
    }) => {
      const isPremiumResource =
        [
          "ejercicios-y-fitness",
          "nutricion-y-alimentacion",
          "bienestar-emocional",
          "salud-y-educacion-sexual",
          "salud-en-todas-las-edades",
        ].includes(resourceSlug) && !isPremium;

      try {
        if (!userId || !resourceId || isPremiumResource) return;

        const lastLesson = await getLastCompletedLesson(userId, resourceId);

        if (lastLesson) {
          router.push(
            `/${resourceSlug}/${lastLesson.moduleSlug}/${lastLesson.lessonSlug}`,
          );
        } else {
          router.push(`/${resourceSlug}#aprende-sobre-${resourceSlug}`);
        }
      } catch (error) {
        console.error("Error al continuar el curso:", error);
      }
    },
    [userId, isPremium, router],
  );

  return courses.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-foreground/80">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="size-3.5" />
              <span className="text-nowrap">Nombre del curso</span>
            </div>
          </TableHead>
          <TableHead className="text-foreground/80">
            <div className="flex items-center gap-1.5">
              <CircleDashed className="size-3.5" />
              <span className="text-nowrap">Progreso (%)</span>
            </div>
          </TableHead>
          <TableHead className="text-foreground/80">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="size-3.5" />
              <span className="text-nowrap">Estado actual</span>
            </div>
          </TableHead>
          <TableHead className="text-foreground/80">
            <div className="flex items-center gap-1.5">
              <CalendarClock className="size-3.5" />
              <span className="text-nowrap">Fecha de inicio</span>
            </div>
          </TableHead>
          <TableHead className="text-foreground/80">
            <div className="flex items-center gap-1.5">
              <CalendarCheck2 className="size-3.5" />
              <span className="text-nowrap">Fecha de finalización</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.courseId}>
            <TableCell>
              <button
                aria-label={`Continuar curso ${course.courseName}`}
                className="text-nowrap hover:underline"
                onClick={() =>
                  continueCourse({
                    resourceId: course.courseId,
                    resourceSlug: course.courseSlug,
                  })
                }
              >
                {course.courseName}
              </button>
            </TableCell>
            <TableCell className="flex items-center">
              <span>{course.progress}</span>
              <span className="text-xxs text-foreground/80 ml-1">%</span>
              <Progress
                value={course.progress}
                className="ms-2 h-1.5 w-2/3"
                indicatorColor={getProgressColor(course.progress)}
              />
            </TableCell>
            <TableCell className="text-nowrap">
              {course.completed ? "Finalizado" : "En progreso"}
            </TableCell>
            <TableCell className="text-nowrap">
              {course.startedAt
                ? formatDate(course.startedAt, "dd/MM/yyyy")
                : "No iniciado"}
            </TableCell>
            <TableCell className="text-nowrap">
              {course.completedAt
                ? formatDate(course.completedAt, "dd/MM/yyyy")
                : "No finalizado"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div className="py-10 text-center">
      <div className="text-muted-foreground flex flex-col items-center justify-center gap-4">
        <BookOpenText className="size-8" />
        <p className="text-xs md:text-sm">
          Aún no te has inscrito en ningún curso. ¡Es un buen momento para
          empezar a aprender algo nuevo!
        </p>
        <Link
          href="/salud-y-bienestar#aprende-sobre-salud-y-bienestar"
          className="text-sm font-medium text-blue-500 hover:underline"
        >
          Empieza a aprender
        </Link>
      </div>
    </div>
  );
};

export default CourseProgressTable;
