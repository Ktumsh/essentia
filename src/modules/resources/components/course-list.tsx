import {
  BookCheck,
  BookOpenText,
  HashIcon,
  LibraryBig,
  Loader,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlayIcon2 } from "@/modules/icons/action";
import { Modules } from "@/types/resource";

import ChapterList from "./chapter-list";
import { useCourseProgress } from "../hooks/use-course-progress";

interface CourseListProps {
  resource: {
    resourceId: string;
    resourceName: string;
  };
  modules: Modules[];
  about: string;
  slug: string;
  completedLessons: string[];
  progress: { [moduleId: string]: number };
  totalProgress: number;
}

const CourseList = ({
  resource,
  modules,
  about,
  slug,
  completedLessons,
  progress,
  totalProgress,
}: CourseListProps) => {
  const { resourceId, resourceName } = resource || {};

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const firstModule = modules?.[0].module.slug;
  const firstLesson = modules?.[0].lessons[0].slug;

  const classes = modules.reduce((acc, curr) => acc + curr.lessons.length, 0);
  const exams = modules.reduce((acc, curr) => acc + (curr.exam ? 1 : 0), 0);

  const getProgressColor = (value: number) => {
    if (value === 0) return "bg-transparent";
    if (value <= 25) return "bg-red-500";
    if (value <= 50) return "bg-amber-500";
    if (value <= 75) return "bg-lime-500";
    return "bg-green-500";
  };

  const { isInitialized, loading, startCourse, continueCourse } =
    useCourseProgress({
      userId,
      resourceId,
      slug,
      firstModule,
      firstLesson,
    });

  if (modules?.length === 0) {
    return (
      <Card className="border-red-200 text-main dark:border-red-900 dark:text-white">
        <CardHeader className="flex-row items-center gap-2">
          <TriangleAlert className="size-5 text-red-500" />
          <CardDescription className="!mt-0 text-base">
            Hubo un error al cargar el contenido del curso.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <div className="relative grid grid-cols-1 gap-6 lg:col-[1/3] lg:grid-cols-[1fr_424px]">
      <section className="col-[1/2] row-[3/4] px-6 lg:row-[1/2] lg:px-0">
        <h3 className="text-main dark:text-white">
          <Link
            id={`aprende-sobre-${slug}`}
            data-id={`aprende-sobre-${slug}`}
            data-name={`Aprende sobre ${resourceName}`}
            href={`#aprende-sobre-${slug}`}
            className="group mb-2 inline-flex h-auto w-fit items-center gap-0 text-balance bg-transparent text-2xl font-bold transition hover:opacity-80 md:text-3xl lg:px-0"
          >
            Aprende sobre {resourceName}
            <HashIcon
              strokeWidth={1.5}
              className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100"
            />
          </Link>
        </h3>
        <div className="mb-4 flex flex-col space-y-1 text-main dark:text-white">
          <h4 className="text-lg font-semibold">Descripción</h4>
          <p className="prose-sm text-main-h md:prose dark:text-main-dark">
            {about}
          </p>
        </div>
      </section>
      <section className="col-[1/2] row-[5/6] flex select-none flex-col justify-start px-6 lg:row-[2/6] lg:px-0">
        <div className="mb-4 flex flex-col space-y-1 text-main dark:text-white">
          <h4 className="text-lg font-semibold">Contenido del curso</h4>
          <div className="flex flex-wrap items-center gap-2 text-sm text-main-m dark:text-main-dark-m">
            <span>{modules?.length} secciones</span>
            <span aria-hidden="true">•</span>
            <span>{classes} clases</span>
          </div>
        </div>
        <ChapterList
          modules={modules}
          resourceSlug={slug}
          completedLessons={completedLessons}
          progress={progress}
        />
      </section>
      <section className="sticky top-5 col-[1/2] row-[4/5] lg:col-[2/3] lg:row-[1/4]">
        <Card className="rounded-none border-y bg-gray-100 text-main dark:bg-dark/50 dark:text-white md:rounded-xl md:border">
          <CardHeader isSecondary>
            <CardTitle className="text-center text-lg tracking-normal">
              El curso incluye
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex flex-1 items-center justify-center rounded-lg bg-white p-2 dark:bg-full-dark">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <span className="block text-sm text-main-m dark:text-main-dark-m">
                      Capítulos
                    </span>
                    <LibraryBig
                      strokeWidth={1.5}
                      className="size-3.5 text-main-m dark:text-main-dark-m"
                    />
                  </div>
                  <p className="block">{modules?.length} secciones</p>
                </div>
              </li>
              <li className="flex flex-1 items-center justify-center rounded-lg bg-white p-2 dark:bg-full-dark">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <span className="text-sm text-main-m dark:text-main-dark-m">
                      Lecciones
                    </span>
                    <BookOpenText
                      strokeWidth={1.5}
                      className="size-3.5 text-main-m dark:text-main-dark-m"
                    />
                  </div>
                  <p className="block">{classes} clases</p>
                </div>
              </li>
              <li className="col-span-2 flex flex-1 items-center justify-center rounded-lg bg-white p-2 dark:bg-full-dark">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <span className="text-sm text-main-m dark:text-main-dark-m">
                      Exámenes
                    </span>
                    <BookCheck
                      strokeWidth={1.5}
                      className="size-3.5 text-main-m dark:text-main-dark-m"
                    />
                  </div>
                  <p className="block">{exams} evaluaciones</p>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant="destructive"
              fullWidth
              radius="full"
              disabled={loading}
              onClick={isInitialized ? continueCourse : startCourse}
            >
              {!loading && <PlayIcon2 strokeWidth={1.5} />}
              {loading ? (
                <Loader className="animate-spin" />
              ) : isInitialized ? (
                "Continuar curso"
              ) : (
                "Comenzar curso"
              )}
            </Button>
          </CardFooter>
        </Card>
        <div className="px-6 lg:px-0">
          <Card className="mt-5 rounded-xl text-main dark:text-white">
            <CardHeader isSecondary className="space-y-4">
              <CardTitle className="text-lg tracking-normal">
                Tu progreso del curso
              </CardTitle>
              <CardDescription>{totalProgress}% completado</CardDescription>
              <Progress
                value={totalProgress}
                indicatorColor={getProgressColor(totalProgress)}
              />
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default memo(CourseList);
