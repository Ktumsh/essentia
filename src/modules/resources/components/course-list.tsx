import {
  BookCheck,
  BookOpenText,
  CheckCheck,
  Hash,
  LibraryBig,
  Loader,
  LogIn,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useMemo, useState } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { useToast } from "@/components/hooks/use-toast";
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
import { ToastAction } from "@/components/ui/toast";
import { getResourceColor, getResourceIndex } from "@/modules/core/lib/utils";
import { PlayIcon } from "@/modules/icons/action";
import { StarsIcon } from "@/modules/icons/common";
import PaymentModal from "@/modules/payment/components/payment-modal";
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
  isPremium,
}: Course) => {
  const { resourceId, resourceName } = resource || {};

  const router = useRouter();

  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);

  const { toast } = useToast();

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

  const isPremiumResource =
    [
      "ejercicios-y-fitness",
      "nutricion-y-alimentacion",
      "bienestar-emocional",
      "salud-y-educacion-sexual",
      "salud-en-todas-las-edades",
    ].includes(slug) && !isPremium;

  const handleLessonClick = (href: string) => {
    if (isPremiumResource) return;

    if (!userId) {
      toast({
        title: "¡Hola usuario!",
        description: "Inicia sesión para continuar con el curso",
        action: (
          <ToastAction
            altText="Inicia sesión"
            onClick={() => router.push(`/login?redirect=/${slug}`)}
          >
            Inicia sesión
          </ToastAction>
        ),
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
    if (isPremiumResource) return;
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
      <Card className="text-main border-red-200 dark:border-red-900 dark:text-white">
        <CardHeader className="flex-row items-center gap-2">
          <TriangleAlert className="size-5 text-red-500" />
          <CardDescription className="mt-0! text-base">
            Hubo un error al cargar el contenido del curso.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <>
      <div className="relative mb-5 grid grid-cols-1 gap-6 lg:col-[1/3] lg:grid-cols-[1fr_424px]">
        <section className="col-[1/2] row-[1/2] px-6 lg:px-0">
          <div className="relative mb-2 flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-4">
            <h3 className="text-main dark:text-white">
              <Link
                id={`aprende-sobre-${slug}`}
                data-id={`aprende-sobre-${slug}`}
                data-name={`Aprende sobre ${resourceName}`}
                href={`#aprende-sobre-${slug}`}
                className="group inline-flex h-auto w-fit items-center gap-0 bg-transparent text-2xl font-bold text-balance transition hover:opacity-80 md:text-3xl lg:px-0"
              >
                Aprende sobre {resourceName}
                <Hash
                  strokeWidth={1.5}
                  className="ml-1 size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            </h3>
            {courseInitialized && (
              <Badge
                variant="outline"
                className={cn(
                  "w-fit shrink-0 border-amber-600/60 bg-amber-600/10 text-amber-500 hover:bg-amber-600/10 dark:border-amber-600/60 dark:bg-amber-600/10 dark:text-amber-500",
                  courseProgress.completed &&
                    "border-transparent! bg-linear-to-br text-white! shadow-sm",
                  getResourceColor(resourceIndex, "gradient"),
                )}
              >
                {!courseProgress.completed && (
                  <span className="mr-2 size-1.5 rounded-full bg-amber-500" />
                )}
                {courseProgress.completed ? "Finalizado" : "En progreso"}
                {courseProgress.completed && (
                  <CheckCheck className="ml-1.5 size-3.5" />
                )}
              </Badge>
            )}
          </div>
          <div className="text-main mb-4 flex flex-col space-y-1 dark:text-white">
            <p className="prose-sm text-main-h md:prose dark:text-main-dark">
              {about}
            </p>
          </div>
        </section>
        <section className="col-[1/2] row-[3/4] flex flex-col justify-start px-6 select-none lg:row-[2/6] lg:px-0">
          <div className="text-main mb-4 flex flex-col space-y-1 dark:text-white">
            <h4 className="text-lg font-semibold">Contenido del curso</h4>
            <div className="text-main-m dark:text-main-dark-m flex flex-wrap items-center gap-2 text-sm">
              <span>{modules?.length} secciones</span>
              <span aria-hidden="true">•</span>
              <span>{classes} clases</span>
            </div>
          </div>
          {isPremiumResource ? (
            <div className="text-main relative mb-4 flex flex-col space-y-1">
              <div
                aria-hidden="true"
                className="animate-fade-in dark:border-dark absolute inset-0 z-10 rounded-lg border border-gray-200 bg-white/50 p-6 backdrop-blur-xs duration-2000 ease-in-out dark:bg-black/10"
              >
                <div className="slideup flex size-full flex-col items-center justify-center gap-4">
                  <p className="text-main text-center font-semibold md:text-lg dark:text-white">
                    ¡Este curso es exclusivo para usuarios premium! 🌟
                  </p>
                  {userId ? (
                    <Button
                      variant="gradient"
                      fullWidth
                      radius="full"
                      onClick={() => setIsOpenPayment(true)}
                      className="shadow-pretty max-w-60 focus:text-white active:shadow-xs"
                    >
                      <StarsIcon
                        aria-hidden="true"
                        className="size-4 **:fill-white focus:outline-hidden"
                      />
                      Hazte premium
                    </Button>
                  ) : (
                    <Button
                      variant="gradient"
                      fullWidth
                      radius="full"
                      onClick={() => router.push(`/login?redirect=/${slug}`)}
                      className="shadow-pretty max-w-60 focus:text-white active:shadow-xs"
                    >
                      <LogIn
                        aria-hidden="true"
                        className="size-4 **:fill-white focus:outline-hidden"
                      />
                      Inicia sesión
                    </Button>
                  )}
                </div>
              </div>
              <ChapterList
                modules={modules}
                resourceSlug={slug}
                completedLessons={completedLessons}
                moduleProgress={moduleProgress}
                onLessonClick={handleLessonClick}
                isDisaled
              />
            </div>
          ) : (
            <ChapterList
              modules={modules}
              resourceSlug={slug}
              completedLessons={completedLessons}
              moduleProgress={moduleProgress}
              onLessonClick={handleLessonClick}
            />
          )}
        </section>
        <section className="top-5 col-[1/2] row-[2/3] lg:sticky lg:col-[2/3] lg:row-[1/4]">
          <Card className="text-main dark:bg-dark/50 rounded-none border-y bg-gray-100 md:rounded-xl md:border dark:text-white">
            <CardHeader isSecondary>
              <CardTitle className="text-center text-lg tracking-normal">
                El curso incluye
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                <li className="dark:bg-full-dark flex flex-1 items-center justify-center rounded-lg bg-white p-2">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-main-m dark:text-main-dark-m block text-sm">
                        Módulos
                      </span>
                      <LibraryBig
                        strokeWidth={1.5}
                        className="text-main-m dark:text-main-dark-m size-3.5"
                      />
                    </div>
                    <p className="block">{modules?.length} secciones</p>
                  </div>
                </li>
                <li className="dark:bg-full-dark flex flex-1 items-center justify-center rounded-lg bg-white p-2">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-main-m dark:text-main-dark-m text-sm">
                        Lecciones
                      </span>
                      <BookOpenText
                        strokeWidth={1.5}
                        className="text-main-m dark:text-main-dark-m size-3.5"
                      />
                    </div>
                    <p className="block">{classes} clases</p>
                  </div>
                </li>
                <li className="dark:bg-full-dark col-span-2 flex flex-1 items-center justify-center rounded-lg bg-white p-2">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-main-m dark:text-main-dark-m text-sm">
                        Exámenes
                      </span>
                      <BookCheck
                        strokeWidth={1.5}
                        className="text-main-m dark:text-main-dark-m size-3.5"
                      />
                    </div>
                    <p className="block">{exams} evaluaciones</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            {!courseProgress.completed && !isPremiumResource && userId ? (
              <CardFooter>
                <Button
                  variant="destructive"
                  fullWidth
                  radius="full"
                  disabled={processing}
                  onClick={courseInitialized ? continueCourse : startCourse}
                >
                  {!processing && <PlayIcon strokeWidth={1.5} />}
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
              !courseProgress.completed &&
              !isPremiumResource && (
                <CardFooter>
                  <Button
                    variant="destructive"
                    fullWidth
                    radius="full"
                    disabled={processing}
                    onClick={() => router.push(`/login?redirect=/${slug}`)}
                  >
                    {!processing && <PlayIcon strokeWidth={1.5} />}
                    Inicia sesión para continuar
                  </Button>
                </CardFooter>
              )
            )}
          </Card>
          {courseInitialized && (
            <div className="px-6 lg:px-0">
              <Card className="text-main mt-5 rounded-xl dark:text-white">
                <CardHeader isSecondary className="space-y-4">
                  <CardTitle className="text-lg tracking-normal">
                    Tu progreso del curso
                  </CardTitle>
                  <CardDescription>
                    <div className="text-main inline font-semibold dark:text-white">
                      <span>{courseProgress.progress}</span>
                      <span className="text-xs">%</span>{" "}
                    </div>
                    <span className="ml-1">completado</span>
                  </CardDescription>
                  <Progress
                    aria-label={`${courseProgress.progress}%`}
                    value={courseProgress.progress}
                    indicatorColor={getProgressColor(courseProgress.progress)}
                  />
                </CardHeader>
              </Card>
            </div>
          )}
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
            <DialogHeader isSecondary className="pb-6!">
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
      <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
    </>
  );
};

export default memo(CourseList);
