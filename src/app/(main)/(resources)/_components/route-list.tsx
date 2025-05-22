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
import PaymentModal from "@/components/ui/payment/payment-modal";
import { startReview } from "@/db/querys/progress-querys";
import {
  cn,
  getProgressColor,
  getRouteColor,
  getRouteIndex,
} from "@/lib/utils";

import InitializeRouteAlert from "./initialize-route-alert";
import RouteInfoPanel from "./route-info-panel";
import SectionTitle from "./section-title";
import StageList from "./stage-list";
import { useRouteProgress } from "../_hooks/use-route-progress";
import { getEstimatedReviewTime } from "../_lib/utils";

import type { LearningRoute } from "@/lib/types";

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

  const handleLessonClick = (href: string) => {
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
    try {
      await startRoute();
    } catch (error) {
      console.error("Error al iniciar la ruta:", error);
    } finally {
      setIsOpen(false);
    }
  };

  const handleStartReview = async (stageSlug: string, reviewId?: string) => {
    if (!userId || !reviewId) return;

    await startReview({ userId, reviewId });
    router.push(`/${slug}/${stageSlug}/review`);
  };

  if (stages?.length === 0) {
    return (
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="flex-row items-center gap-2">
          <TriangleAlert className="size-5 text-red-500" />
          <CardDescription className="mt-0! text-base">
            Hubo un error al cargar el contenido de la ruta.
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
          <StageList
            routeIndex={routeIndex}
            stages={stages}
            routeSlug={slug}
            completedLessons={completedLessons}
            stageProgress={stageProgress}
            onLessonClick={handleLessonClick}
          />
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
            {!routeProgress.completed && userId ? (
              <CardFooter>
                <ArrowLeftButton
                  disabled={processing}
                  onClick={routeInitialized ? continueRoute : startRoute}
                  className="w-full flex-row-reverse [&_svg]:rotate-180"
                >
                  {processing ? (
                    <>
                      <Loader className="animate-spin" />
                      {routeInitialized ? "Continuando..." : "Iniciando..."}
                    </>
                  ) : routeInitialized ? (
                    "Continuar ruta"
                  ) : (
                    "Comenzar a aprender"
                  )}
                </ArrowLeftButton>
              </CardFooter>
            ) : (
              !routeProgress.completed && (
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
              <Card className="bg-muted mt-5">
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
                  {routeInitialized && !routeProgress.completed && userId && (
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
          {routeInitialized && userId && (
            <div className="mt-5 px-6 lg:px-0">
              {(() => {
                const availableReviews = stages.filter(({ stage, review }) => {
                  const progress = stageProgress.find(
                    (sp) => sp.stageId === stage.id,
                  );
                  return review && progress?.completed;
                });

                if (availableReviews.length === 0) return null;

                return (
                  <Card className="border border-dashed border-indigo-200 dark:border-indigo-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base font-semibold md:text-lg">
                        <div className="grid place-content-center rounded-full bg-amber-100 p-2 dark:bg-amber-900/50">
                          <Award className="size-4 shrink-0 text-amber-500" />
                        </div>
                        Revisiones prácticas disponibles
                      </CardTitle>
                      <CardDescription className="text-xs md:text-sm">
                        Refuerza tu aprendizaje al finalizar cada etapa.
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-col gap-4">
                        {availableReviews.map(({ stage, review }) => {
                          const estimatedTime = getEstimatedReviewTime(
                            review?.questionCount || 0,
                          );
                          const prog = stageProgress.find(
                            (p) => p.stageId === stage.id,
                          )!;
                          const isReviewDone = prog.reviewCompleted;
                          const reviewScore = prog.reviewScore ?? null;

                          return (
                            <div
                              key={stage.id}
                              className="hover:shadow-little-pretty flex flex-1 items-center justify-between gap-4 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-100 to-indigo-300 p-3 transition duration-300 md:p-4 dark:border-indigo-900 dark:from-indigo-950 dark:to-indigo-800"
                            >
                              <div className="flex flex-col gap-0.5">
                                <h4 className="text-xs font-medium md:text-sm">
                                  {stage.title}
                                </h4>
                                <p className="text-muted-foreground text-xxs md:text-xs">
                                  Tiempo estimado: {estimatedTime} min
                                </p>
                                {isReviewDone && reviewScore !== null && (
                                  <span className="text-xxs font-medium text-indigo-600 md:text-xs dark:text-indigo-400">
                                    % de logro: {reviewScore}%
                                  </span>
                                )}
                              </div>

                              {isReviewDone ? (
                                <div className="flex flex-col items-center gap-2">
                                  <Badge
                                    variant="premium"
                                    className="pl-1.5! font-normal shadow-sm"
                                  >
                                    🏅 ¡Realizada!
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="bg-background/50 h-6 gap-1 rounded-sm border-0 px-2! text-xs font-normal backdrop-blur-sm [&__svg]:size-3.5!"
                                    onClick={() =>
                                      router.push(
                                        `/${slug}/${stage.slug}/review`,
                                      )
                                    }
                                  >
                                    Ver resultados
                                  </Button>
                                </div>
                              ) : (
                                <PlayButton
                                  size="sm"
                                  variant="gradient"
                                  onClick={() =>
                                    handleStartReview(stage.slug, review?.id)
                                  }
                                  className="h-6 gap-1 rounded-sm px-2! text-xs [&__svg]:size-3.5!"
                                >
                                  Realizar
                                </PlayButton>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
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
