"use client";

import { CheckCheck, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { PlayButton } from "@/components/button-kit/play-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { useIsMobile } from "@/hooks/use-mobile";
import { useParallax } from "@/hooks/use-parallax";
import { useScrollRef } from "@/hooks/use-scroll-ref";
import { getRouteColor, getRouteIndex } from "@/lib/utils";
import { cn , formatTitle } from "@/utils";


import RouteList from "./route-list";
import { useRouteProgress } from "../_hooks/use-route-progress";

import type { StageProgressType } from "@/db/querys/progress-querys";
import type { RouteResource, Stages } from "@/lib/types";

const VideoModal = dynamic(() => import("./video-modal"), {
  ssr: false,
});

interface RouteWrapperProps {
  userId: string;
  resource: RouteResource;
  stages: Stages[];
  isPremium?: boolean | null;
  completedLessons: string[];
  stageProgress: StageProgressType[];
  routeProgress: { completed: boolean; progress: number };
  routeInitialized: boolean;
  children?: React.ReactNode;
}

const RouteWrapper = ({
  userId,
  resource,
  stages,
  isPremium,
  completedLessons,
  stageProgress,
  routeProgress,
  routeInitialized,
  children,
}: RouteWrapperProps) => {
  const {
    id,
    slug,
    name,
    label,
    description,
    about,
    quote,
    image,
    videoTitle,
    videoLink,
    audience,
    benefits,
    learningOutcomes,
  } = resource;

  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollRef = useScrollRef();
  const isMobile = useIsMobile();

  const [openVideo, setOpenVideo] = useState(false);

  useParallax(isMobile ? null : scrollRef, imageRef, { factor: 500 });

  const { processing, startRoute, continueRoute } = useRouteProgress({
    userId,
    routeId: id,
    slug,
    firstStage: stages[0]?.stage.slug,
    firstLesson: stages[0]?.lessons[0].slug,
  });

  const lessons = useMemo(
    () => stages.reduce((sum, s) => sum + s.lessons.length, 0),
    [stages],
  );
  const reviews = useMemo(
    () => stages.reduce((sum, s) => sum + (s.review ? 1 : 0), 0),
    [stages],
  );
  const routeIndex = useMemo(() => getRouteIndex(name), [name]);
  const formattedTitle = useMemo(() => formatTitle(name), [name]);

  const handleStartOrContinue = useCallback(() => {
    if (routeInitialized) {
      continueRoute();
    } else {
      startRoute();
    }
  }, [routeInitialized, continueRoute, startRoute]);

  const handleAuthRedirect = useCallback(() => {
    router.push(`/login?next=/${slug}`);
  }, [router, slug]);

  return (
    <article id={slug}>
      <section
        id={`introduccion-a-${formattedTitle}`}
        className="relative overflow-hidden"
      >
        <div
          className={cn(
            "absolute inset-0 z-0 flex items-center before:absolute before:inset-0 before:z-1 before:size-full before:bg-blue-950/30 before:content-[''] md:items-end",
            routeIndex > 1 && routeIndex < 5 && "items-center",
          )}
        >
          <Image
            ref={imageRef}
            priority
            quality={100}
            src={image}
            alt={name}
            width={1920}
            height={1280}
            className="animate-fade-in size-full object-cover object-center brightness-[0.85] transition-transform [transition-timing-function:cubic-bezier(0,0,0,1)] will-change-transform md:h-auto"
          />
        </div>
        <div className="relative z-10 mx-auto flex h-96 max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center lg:px-8">
          <div className="my-auto max-w-2xl">
            <Badge
              className={cn(
                "mb-4 h-6 bg-linear-to-r/shorter px-3 text-white uppercase",
                getRouteColor(routeIndex, "gradient"),
                (routeIndex === 2 || routeIndex === 5) && "text-black",
              )}
            >
              {label}
            </Badge>
            <h1 className="font-merriweather mb-4 text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              {name}
            </h1>
            <div className="mb-6 max-w-lg">
              <q className="text-sm text-white/90 drop-shadow-md md:text-lg">
                {quote}
              </q>
            </div>
            <div className="flex flex-wrap gap-4">
              {!routeProgress.completed && userId ? (
                <ArrowLeftButton
                  size="lg"
                  onClick={handleStartOrContinue}
                  className={cn(
                    "flex-row-reverse rounded-lg bg-linear-to-r/shorter text-white duration-300 hover:scale-105 hover:saturate-150 [&_svg]:rotate-180",
                    getRouteColor(routeIndex, "gradient"),
                    (routeIndex === 2 || routeIndex === 5) && "text-black",
                  )}
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
              ) : (
                !routeProgress.completed && (
                  <ArrowLeftButton
                    size="lg"
                    onClick={handleAuthRedirect}
                    className={cn(
                      "flex-row-reverse rounded-lg bg-linear-to-r/shorter text-white duration-300 hover:scale-105 hover:saturate-150 [&_svg]:rotate-180",
                      getRouteColor(routeIndex, "gradient"),
                      (routeIndex === 2 || routeIndex === 5) && "text-black",
                    )}
                  >
                    Comenzar a aprender
                  </ArrowLeftButton>
                )
              )}
              {routeProgress.completed && userId && (
                <Button
                  size="lg"
                  onClick={() => {
                    toast.info("¡Felicidades! 🎉", {
                      description: "Haz completado la ruta ☺️",
                    });
                  }}
                  className={cn(
                    "rounded-lg bg-linear-to-r/shorter text-white duration-300 hover:scale-105 hover:saturate-150",
                    getRouteColor(routeIndex, "gradient"),
                    (routeIndex === 2 || routeIndex === 5) && "text-black",
                  )}
                >
                  Ruta completada
                  <CheckCheck />
                </Button>
              )}
              <PlayButton
                size="lg"
                variant="outline"
                onClick={() => setOpenVideo(true)}
                className="rounded-lg border-white/50 bg-white/20 text-white backdrop-blur-sm duration-300 hover:scale-105 hover:text-white hover:opacity-100 hover:saturate-150"
              >
                Ver video introductorio
              </PlayButton>
            </div>
          </div>
          <div className="hidden rounded-xl border-2 border-white/20 [background-image:var(--bento-gradient)] p-4 shadow-md backdrop-blur-md md:block lg:p-6">
            <div className="flex items-center gap-6 text-white">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{stages.length}</span>
                <span className="text-sm">Etapas</span>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{lessons}</span>
                <span className="text-sm">Lecciones</span>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{reviews}</span>
                <span className="text-sm">Revisiones</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageWrapper className="mt-6 md:mt-12">
        {stages && (
          <RouteList
            userId={userId}
            route={{ routeId: id, routeName: name }}
            stages={stages}
            about={about}
            slug={slug}
            completedLessons={completedLessons}
            stageProgress={stageProgress}
            routeProgress={routeProgress}
            routeInitialized={routeInitialized}
            isPremium={isPremium}
            description={description}
            audience={audience}
            benefits={benefits}
            learningOutcomes={learningOutcomes}
          />
        )}
        {children}
      </PageWrapper>
      <VideoModal
        videoTitle={videoTitle}
        videoLink={videoLink}
        isOpen={openVideo}
        setIsOpen={setOpenVideo}
      />
    </article>
  );
};

export default memo(RouteWrapper);
