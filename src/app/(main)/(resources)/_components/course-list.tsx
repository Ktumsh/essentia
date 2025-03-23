import {
  BookCheck,
  BookOpenText,
  CheckCheck,
  LibraryBig,
  Loader,
  LogIn,
  Play,
  TriangleAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/kit/badge";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { Progress } from "@/components/kit/progress";
import { StarsIcon } from "@/components/ui/icons/common";
import PaymentModal from "@/components/ui/payment/payment-modal";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  cn,
  getProgressColor,
  getResourceColor,
  getResourceIndex,
} from "@/lib/utils";
import { Course } from "@/types/resource";

import ChapterList from "./chapter-list";
import SectionTitle from "./section-title";
import { useCourseProgress } from "../_hooks/use-course-progress";

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
      toast.info("¡Hola! Para continuar con el curso debes iniciar sesión");
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
      <Card className="border-red-200 dark:border-red-900">
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
        <section className="col-[1/2] row-[1/2]">
          <SectionTitle
            title={`Aprende sobre ${resourceName}`}
            hash={`aprende-sobre-${slug}`}
          >
            {courseInitialized && (
              <Badge
                variant="warning"
                className={cn(
                  courseProgress.completed &&
                    "bg-linear-to-br text-white! shadow-sm",
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
          </SectionTitle>
          <div className="mb-4 flex flex-col space-y-1">
            <p className="text-foreground/80 dark:prose-invert text-sm md:text-base">
              {about}
            </p>
          </div>
        </section>
        <section className="col-[1/2] row-[3/4] flex flex-col justify-start select-none lg:row-[2/6]">
          <div className="mb-4 flex flex-col space-y-1">
            <h4 className="font-merriweather text-lg font-semibold">
              Contenido del curso
            </h4>
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
              <span>{modules?.length} secciones</span>
              <span aria-hidden="true">•</span>
              <span>{classes} clases</span>
            </div>
          </div>
          {isPremiumResource ? (
            <div className="relative mb-4 flex flex-col space-y-1">
              <div
                aria-hidden="true"
                className="animate-fade-in border-border absolute inset-0 z-10 mb-0! rounded-2xl border bg-white/50 p-6 backdrop-blur-md duration-2000 ease-in-out dark:bg-black/10"
              >
                <div className="animate-slide-up flex size-full flex-col items-center justify-center gap-4">
                  <p className="text-center font-semibold md:text-lg">
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
        <section className="top-5 col-[1/2] row-[2/3] -mx-6 md:mx-0 lg:sticky lg:col-[2/3] lg:row-[1/4]">
          <Card className="dark:bg-accent/50 bg-accent rounded-none border-y md:rounded-2xl md:border">
            <CardHeader isSecondary>
              <CardTitle className="text-center text-lg">
                El curso incluye
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                <li className="bg-background flex flex-1 items-center justify-center rounded-xl p-2">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-muted-foreground block text-sm">
                        Módulos
                      </span>
                      <LibraryBig className="text-muted-foreground size-3.5" />
                    </div>
                    <p className="block text-base">
                      {modules?.length} secciones
                    </p>
                  </div>
                </li>
                <li className="bg-background flex flex-1 items-center justify-center rounded-xl p-2">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">
                        Lecciones
                      </span>
                      <BookOpenText className="text-muted-foreground size-3.5" />
                    </div>
                    <p className="block text-base">{classes} clases</p>
                  </div>
                </li>
                <li className="bg-background col-span-2 flex flex-1 items-center justify-center rounded-xl p-2">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">
                        Exámenes
                      </span>
                      <BookCheck className="text-muted-foreground size-3.5" />
                    </div>
                    <p className="block text-base">{exams} evaluaciones</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            {!courseProgress.completed && !isPremiumResource && userId ? (
              <CardFooter>
                <Button
                  fullWidth
                  radius="full"
                  disabled={processing}
                  onClick={courseInitialized ? continueCourse : startCourse}
                >
                  {!processing && <Play />}
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
                    fullWidth
                    radius="full"
                    disabled={processing}
                    onClick={() => router.push(`/login?redirect=/${slug}`)}
                  >
                    {!processing && <Play />}
                    Inicia sesión para continuar
                  </Button>
                </CardFooter>
              )
            )}
          </Card>
          {courseInitialized && (
            <div className="px-6 lg:px-0">
              <Card className="mt-5 rounded-xl">
                <CardHeader isSecondary className="space-y-4">
                  <CardTitle className="text-lg">
                    Tu progreso del curso
                  </CardTitle>
                  <CardDescription>
                    <div className="inline font-semibold">
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
              <BadgeAlert variant="question" />
              <DialogTitle>Iniciar curso</DialogTitle>
              <DialogDescription>
                Para comenzar con esta lección, debes iniciar el curso. ¿Deseas
                iniciarlo ahora?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter isSecondary>
              <DialogClose asChild>
                <Button variant="outline" radius="full" disabled={processing}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                disabled={processing}
                radius="full"
                onClick={handleStartCourse}
              >
                {processing ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>Iniciar curso</>
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
