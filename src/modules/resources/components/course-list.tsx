import {
  BookCheck,
  BookOpenText,
  CheckCheck,
  HashIcon,
  LibraryBig,
  Loader,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useMemo, useState } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { getResourceColor, getResourceIndex } from "@/modules/core/lib/utils";
import { PlayIcon2 } from "@/modules/icons/action";
import { Course } from "@/types/resource";
import { cn } from "@/utils/common";

import ChapterList from "./chapter-list";
import { useCourseProgress } from "../hooks/use-course-progress";
import { getProgressColor } from "../lib/utils";

const CourseList = ({
  userId,
  resource,
  modules,
  about,
  slug,
  completedLessons,
  moduleProgress,
  courseProgress,
  courseInitialized,
}: Course) => {
  const { resourceId, resourceName } = resource || {};

  const router = useRouter();

  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);

  const firstModule = modules?.[0].module.slug;
  const firstLesson = modules?.[0].lessons[0].slug;

  const classes = modules.reduce((acc, curr) => acc + curr.lessons.length, 0);
  const exams = modules.reduce((acc, curr) => acc + (curr.exam ? 1 : 0), 0);

  const resourceIndex = useMemo(
    () => getResourceIndex(resourceName),
    [resourceName],
  );

  const { processing, startCourse, continueCourse } = useCourseProgress({
    userId,
    resourceId,
    slug,
    firstModule,
    firstLesson,
  });

  const handleLessonClick = (href: string) => {
    if (!userId) {
      toast("¡Hola usuario!", {
        description: "Inicia sesión para continuar con el curso",
        action: {
          label: "Inicia sesión",
          onClick: () => router.push(`/login?redirect=/${slug}`),
        },
      });
      return;
    }
    if (!courseInitialized) {
      setIsOpen(true);
    } else {
      router.push(href);
    }
  };

  const handleStartCourse = async () => {
    try {
      await startCourse();
    } catch (error) {
      console.error("Error al iniciar el curso:", error);
    } finally {
      setIsOpen(false);
    }
  };

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
    <>
      <div className="relative grid grid-cols-1 gap-6 lg:col-[1/3] lg:grid-cols-[1fr_424px]">
        <section className="col-[1/2] row-[1/2] px-6 lg:px-0">
          <div className="relative mb-2 flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-4">
            <h3 className="text-main dark:text-white">
              <Link
                id={`aprende-sobre-${slug}`}
                data-id={`aprende-sobre-${slug}`}
                data-name={`Aprende sobre ${resourceName}`}
                href={`#aprende-sobre-${slug}`}
                className="group inline-flex h-auto w-fit items-center gap-0 text-balance bg-transparent text-2xl font-bold transition hover:opacity-80 md:text-3xl lg:px-0"
              >
                Aprende sobre {resourceName}
                <HashIcon
                  strokeWidth={1.5}
                  className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            </h3>
            {courseInitialized && (
              <Badge
                variant="outline"
                className={cn(
                  "w-fit py-1.5",
                  courseProgress.completed &&
                    "border-transparent bg-gradient-to-br !text-white shadow",
                  getResourceColor(resourceIndex, "gradient"),
                )}
              >
                {courseProgress.completed
                  ? "Curso finalizado"
                  : "Curso en progreso"}
                {courseProgress.completed && (
                  <CheckCheck className="ml-1.5 size-3.5" />
                )}
              </Badge>
            )}
          </div>
          <div className="mb-4 flex flex-col space-y-1 text-main dark:text-white">
            <p className="prose-sm text-main-h md:prose dark:text-main-dark">
              {about}
            </p>
          </div>
        </section>
        <section className="col-[1/2] row-[3/4] flex select-none flex-col justify-start px-6 lg:row-[2/6] lg:px-0">
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
            moduleProgress={moduleProgress}
            onLessonClick={handleLessonClick}
          />
        </section>
        <section className="sticky top-5 col-[1/2] row-[2/3] lg:col-[2/3] lg:row-[1/4]">
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
                        Módulos
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
            {!courseProgress.completed && userId ? (
              <CardFooter>
                <Button
                  variant="destructive"
                  fullWidth
                  radius="full"
                  disabled={processing}
                  onClick={courseInitialized ? continueCourse : startCourse}
                >
                  {!processing && <PlayIcon2 strokeWidth={1.5} />}
                  {processing ? (
                    <Loader className="animate-spin" />
                  ) : courseInitialized ? (
                    "Continuar curso"
                  ) : (
                    "Iniciar curso"
                  )}
                </Button>
              </CardFooter>
            ) : (
              !courseProgress.completed && (
                <CardFooter>
                  <Button
                    variant="destructive"
                    fullWidth
                    radius="full"
                    disabled={processing}
                    onClick={() => router.push(`/login?redirect=/${slug}`)}
                  >
                    {!processing && <PlayIcon2 strokeWidth={1.5} />}
                    Inicia sesión para continuar
                  </Button>
                </CardFooter>
              )
            )}
          </Card>
          <div className="px-6 lg:px-0">
            <Card className="mt-5 rounded-xl text-main dark:text-white">
              <CardHeader isSecondary className="space-y-4">
                <CardTitle className="text-lg tracking-normal">
                  Tu progreso del curso
                </CardTitle>
                <CardDescription>
                  {courseProgress.progress}% completado
                </CardDescription>
                <Progress
                  value={courseProgress.progress}
                  indicatorColor={getProgressColor(courseProgress.progress)}
                />
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Iniciar curso</DrawerTitle>
              <DrawerDescription className="px-4" asChild>
                <div>
                  <p>Para comenzar con esta lección, debes iniciar el curso.</p>
                  <p>¿Deseas iniciarlo ahora?</p>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" disabled={processing}>
                  Cancelar
                </Button>
              </DrawerClose>
              <Button
                variant="destructive"
                disabled={processing}
                onClick={handleStartCourse}
              >
                Iniciar curso
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent isSecondary>
            <DialogHeader isSecondary className="!pb-6">
              <DialogTitle>Iniciar curso</DialogTitle>
              <DialogDescription>
                Para comenzar con esta lección, debes iniciar el curso. ¿Deseas
                iniciarlo ahora?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter isSecondary>
              <DialogClose asChild>
                <Button variant="outline" disabled={processing}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={processing}
                onClick={handleStartCourse}
              >
                {processing ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Iniciar curso"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default memo(CourseList);
