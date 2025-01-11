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

import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLastCompletedLesson } from "@/db/querys/progress-query";
import { getProgressColor } from "@/modules/resources/lib/utils";
import { Courses } from "@/types/resource";
import { formatDate } from "@/utils/format";

interface CourseProgressTableProps {
  userId: string;
  courses: Courses;
  isMobile: boolean;
}

const CourseProgressTable = ({
  userId,
  courses,
  isMobile,
}: CourseProgressTableProps) => {
  const router = useRouter();

  const continueCourse = async ({
    resourceId,
    resourceSlug,
  }: {
    resourceId: string;
    resourceSlug: string;
  }) => {
    try {
      if (!userId || !resourceId) return;

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
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-main-h dark:text-main-dark-h">
            <div className="flex items-center gap-1.5">
              <GraduationCap strokeWidth={1.5} className="size-3" />
              <span className="text-nowrap">Nombre del curso</span>
            </div>
          </TableHead>
          <TableHead className="text-main-h dark:text-main-dark-h">
            <div className="flex items-center gap-1.5">
              <CircleDashed strokeWidth={1.5} className="size-3" />
              <span className="text-nowrap">Progreso (%)</span>
            </div>
          </TableHead>
          <TableHead className="text-main-h dark:text-main-dark-h">
            <div className="flex items-center gap-1.5">
              <TrendingUp strokeWidth={1.5} className="size-3" />
              <span className="text-nowrap">Estado actual</span>
            </div>
          </TableHead>
          <TableHead className="text-main-h dark:text-main-dark-h">
            <div className="flex items-center gap-1.5">
              <CalendarClock strokeWidth={1.5} className="size-3" />
              <span className="text-nowrap">Fecha de inicio</span>
            </div>
          </TableHead>
          <TableHead className="text-main-h dark:text-main-dark-h">
            <div className="flex items-center gap-1.5">
              <CalendarCheck2 strokeWidth={1.5} className="size-3" />
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
            <TableCell>
              <Progress
                value={course.progress}
                className="h-1.5 w-2/3"
                indicatorColor={getProgressColor(course.progress)}
              />
              <span>{course.progress}</span>
              <span className="ml-1 text-xxs text-main-h dark:text-main-dark-h">
                %
              </span>
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
        {courses.length === 0 && (
          <TableRow>
            <TableCell colSpan={isMobile ? 2 : 5} className="py-10 text-center">
              <div className="flex flex-col items-center justify-center gap-4 text-main-m dark:text-main-dark-m">
                <BookOpenText strokeWidth={1.5} className="size-8" />
                <p className="text-xs md:text-sm">
                  Aún no te has inscrito en ningún curso. ¡Es un buen momento
                  para empezar a aprender algo nuevo!
                </p>
                <Link
                  href="/salud-y-bienestar#aprende-sobre-salud-y-bienestar"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Empieza a aprender
                </Link>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CourseProgressTable;
