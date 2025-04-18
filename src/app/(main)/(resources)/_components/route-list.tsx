import {
  Award,
  BookOpen,
  CheckCheck,
  CheckCircle2,
  Clock,
  Loader,
  TriangleAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { LoginButton } from "@/components/button-kit/login-button";
import { PlayButton } from "@/components/button-kit/play-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Progress } from "@/components/kit/progress";
import { StarsIcon } from "@/components/ui/icons/common";
import PaymentModal from "@/components/ui/payment/payment-modal";
import {
  cn,
  getProgressColor,
  getRouteColor,
  getRouteIndex,
} from "@/lib/utils";
import { LearningRoute } from "@/types/resource";

import ChapterList from "./chapter-list";
import InitializeRouteAlert from "./initialize-route-alert";
import RouteInfoPanel from "./route-info-panel";
import SectionTitle from "./section-title";
import { useRouteProgress } from "../_hooks/use-route-progress";

interface RouteListProps extends LearningRoute {
  description: string;
  audience: string[];
  benefits: string[];
  learningOutcomes: string[];
}

const RouteList = ({
  userId,
  route,
  stages,
  about,
  slug,
  completedLessons,
  routeProgress,
  stageProgress,
  routeInitialized,
  isPremium,
  description,
  audience,
  benefits,
  learningOutcomes,
}: RouteListProps) => {
  const { routeId, routeName } = route || {};

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);

  const firstStage = stages?.[0].stage.slug;
  const firstLesson = stages?.[0].lessons[0].slug;

  const lessons = stages.reduce((acc, curr) => acc + curr.lessons.length, 0);
  const reviews = stages.reduce((acc, curr) => acc + (curr.review ? 1 : 0), 0);

  const routeIndex = useMemo(() => getRouteIndex(routeName), [routeName]);

  const { processing, startRoute, continueRoute } = useRouteProgress({
    userId,
    routeId,
    slug,
    firstStage,
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
      toast.info("¡Hola! Para continuar con esta ruta debes iniciar sesión");
      return;
    }
    if (!routeInitialized) {
      setIsOpen(true);
    } else {
      router.push(href);
    }
  };

  const handleStartRoute = async () => {
    if (isPremiumResource) return;
    try {
      await startRoute();
    } catch (error) {
      console.error("Error al iniciar la ruta:", error);
    } finally {
      setIsOpen(false);
    }
  };

  if (stages?.length === 0) {
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
      <div className="relative mb-5 grid grid-cols-1 gap-6 md:gap-8 lg:col-[1/3] lg:grid-cols-[1fr_424px]">
        <section className="col-[1/2] row-[1/2]">
          <SectionTitle
            title={`Aprende sobre ${routeName}`}
            hash={`aprende-sobre-${slug}`}
          >
            {routeInitialized && (
              <Badge
                variant="warning"
                className={cn(
                  routeProgress.completed &&
                    "bg-linear-to-br text-white! shadow-sm",
                  getRouteColor(routeIndex, "gradient"),
                )}
              >
                {!routeProgress.completed && (
                  <span className="mr-2 size-1.5 rounded-full bg-amber-500" />
                )}
                {routeProgress.completed ? "Finalizado" : "En progreso"}
                {routeProgress.completed && (
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
          <RouteInfoPanel
            index={routeIndex}
            routeName={routeName}
            description={description}
            audience={audience}
            benefits={benefits}
          />
        </section>
        <section className="col-[1/2] row-[3/4] flex flex-col justify-start select-none lg:row-[2/6]">
          <div className="mb-4 flex flex-col space-y-1">
            <h4 className="font-merriweather text-lg font-semibold">
              Contenido de la ruta de aprendizaje
            </h4>
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
              <span>{stages?.length} etapas</span>
              <span aria-hidden="true">•</span>
              <span>{lessons} lecciones</span>
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
                    ¡Esta ruta es exclusiva para usuarios premium! 🌟
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
                    <LoginButton
                      onClick={() => router.push(`/login?next=/${slug}`)}
                      className="shadow-pretty w-full max-w-60 rounded-full focus:text-white active:shadow-xs"
                    >
                      Inicia sesión
                    </LoginButton>
                  )}
                </div>
              </div>
              <ChapterList
                routeIndex={routeIndex}
                stages={stages}
                routeSlug={slug}
                completedLessons={completedLessons}
                stageProgress={stageProgress}
                onLessonClick={handleLessonClick}
                isDisaled
              />
            </div>
          ) : (
            <ChapterList
              routeIndex={routeIndex}
              stages={stages}
              routeSlug={slug}
              completedLessons={completedLessons}
              stageProgress={stageProgress}
              onLessonClick={handleLessonClick}
            />
          )}
        </section>
        <section className="top-20 col-[1/2] row-[2/3] -mx-6 md:mx-0 lg:sticky lg:col-[2/3] lg:row-[1/4]">
          <Card className="dark:bg-accent/50 rounded-none bg-slate-50 md:rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                La ruta de aprendizaje incluye
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-4">
                <li className="flex flex-1 items-center gap-3">
                  <div className="border-background bg-primary/10 grid size-10 shrink-0 place-content-center rounded-full border-2">
                    <BookOpen className="text-primary size-4" />
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">
                      Etapas
                    </span>
                    <p className="block text-base font-medium">
                      {stages?.length} etapas
                    </p>
                  </div>
                </li>
                <li className="flex flex-1 items-center gap-3">
                  <div className="border-background bg-primary/10 grid size-10 shrink-0 place-content-center rounded-full border-2">
                    <Clock className="text-primary size-4" />
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">
                      Lecciones
                    </span>
                    <p className="block text-base font-medium">
                      {lessons} lecciones
                    </p>
                  </div>
                </li>
                <li className="col-span-2 flex flex-1 items-center gap-3">
                  <div className="border-background bg-primary/10 grid size-10 shrink-0 place-content-center rounded-full border-2">
                    <Award className="text-primary size-4" />
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">
                      Revisiones
                    </span>
                    <p className="block text-base font-medium">
                      {reviews} revisiones prácticas
                    </p>
                  </div>
                </li>
              </ul>
              <div className="space-y-2 pt-6">
                <h4 className="text-base font-medium">Lo que aprenderás</h4>
                <ul className="space-y-2.5">
                  {learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span className="text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            {!routeProgress.completed && !isPremiumResource && userId ? (
              <CardFooter>
                <ArrowLeftButton
                  disabled={processing}
                  onClick={routeInitialized ? continueRoute : startRoute}
                  className="w-full flex-row-reverse [&_svg]:rotate-180"
                >
                  {processing ? (
                    <>
                      <Loader className="animate-spin" />
                      Continuando...
                    </>
                  ) : routeInitialized ? (
                    "Continuar ruta"
                  ) : (
                    "Comenzar a aprender"
                  )}
                </ArrowLeftButton>
              </CardFooter>
            ) : (
              !routeProgress.completed &&
              !isPremiumResource && (
                <CardFooter>
                  <PlayButton
                    disabled={processing}
                    onClick={() => router.push(`/login?next=/${slug}`)}
                    className="w-full"
                  >
                    Comenzar a aprender
                  </PlayButton>
                </CardFooter>
              )
            )}
          </Card>
          {routeInitialized && (
            <div className="px-6 lg:px-0">
              <Card className="mt-5">
                <CardHeader isSecondary className="space-y-4">
                  <CardTitle className="text-lg">
                    Tu progreso de la ruta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="inline-flex w-full items-center justify-between text-sm">
                    <div className="inline font-medium">
                      <span>{routeProgress.progress}</span>
                      <span className="text-xs">%</span>{" "}
                      <span className="ml-1">completado</span>
                    </div>
                    <span className="text-sm text-slate-500">
                      {completedLessons.length}
                      <span className="text-xs">/</span>
                      {lessons} lecciones
                    </span>
                  </div>
                  <Progress
                    aria-label={`${routeProgress.progress}%`}
                    value={routeProgress.progress}
                    indicatorColor={getProgressColor(routeProgress.progress)}
                  />
                  {routeInitialized &&
                    !routeProgress.completed &&
                    !isPremiumResource &&
                    userId && (
                      <PlayButton
                        variant="outline"
                        disabled={processing}
                        onClick={routeInitialized ? continueRoute : startRoute}
                        className="bg-background w-full"
                      >
                        {processing ? (
                          <>
                            <Loader className="animate-spin" />
                            Continuando...
                          </>
                        ) : (
                          "Continúa donde lo dejaste"
                        )}
                      </PlayButton>
                    )}
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </div>
      <InitializeRouteAlert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleStartRoute={handleStartRoute}
        processing={processing}
      />
      <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
    </>
  );
};

export default RouteList;
