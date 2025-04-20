"use client";

import { CheckCheck, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { PlayButton } from "@/components/button-kit/play-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { useScrollRef } from "@/hooks/use-scroll-ref";
import { cn, getRouteColor, getRouteIndex } from "@/lib/utils";
import { formatTitle } from "@/utils/format";

import RouteList from "./route-list";
import VideoModal from "./video-modal";
import { useRouteProgress } from "../_hooks/use-route-progress";

import type { Route } from "@/db/schema";
import type { Resources, Stages } from "@/types/resource";

interface ResourceWrapperProps {
  userId: string;
  resource: Route & Resources;
  stages: Stages[];
  isPremium?: boolean | null;
  completedLessons: string[];
  stageProgress: { [moduleId: string]: number };
  routeProgress: { completed: boolean; progress: number };
  routeInitialized: boolean;
}

const ResourceWrapper = ({
  userId,
  resource,
  stages,
  isPremium,
  completedLessons,
  stageProgress,
  routeProgress,
  routeInitialized,
}: ResourceWrapperProps) => {
  const {
    id,
    slug,
    title,
    name,
    subtitle,
    description,
    about,
    quote,
    videoTitle,
    videoLink,
    imageFull,
    component: Component,
    audience,
    benefits,
    learningOutcomes,
  } = resource;

  const router = useRouter();

  const route = { routeId: id, routeName: name };

  const [isOpenVideo, setIsOpenVideo] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const scrollRef = useScrollRef();

  useEffect(() => {
    const container = scrollRef?.current;
    const img = imageRef.current;
    if (!container || !img) return;

    const scrollHeight = container.scrollHeight - container.clientHeight;

    const ticking = { current: false };

    const updateParallax = () => {
      const progress = container.scrollTop / scrollHeight;
      const translateY = progress * 600;

      img.style.transform = `translateY(${translateY}px)`;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateParallax);
        ticking.current = true;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  const firstStage = stages?.[0].stage.slug;
  const firstLesson = stages?.[0].lessons[0].slug;

  const { processing, startRoute, continueRoute } = useRouteProgress({
    userId,
    routeId: id,
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

  const formatedTitle = formatTitle(name || title);

  const routeIndex = getRouteIndex(name || title);

  const lessons = stages.reduce((acc, curr) => acc + curr.lessons.length, 0);
  const reviews = stages.reduce((acc, curr) => acc + (curr.review ? 1 : 0), 0);

  return (
    <>
      <section
        id={`introduccion-a-${formatedTitle}`}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 before:absolute before:inset-0 before:z-1 before:size-full before:bg-blue-950/30 before:content-['']">
          <Image
            ref={imageRef}
            priority
            quality={100}
            src={imageFull}
            alt={name || title}
            width={1920}
            height={1280}
            className={cn(
              "size-full object-cover object-bottom brightness-[0.85] will-change-transform",
              routeIndex > 1 && routeIndex < 5 && "object-center",
            )}
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
              {subtitle}
            </Badge>
            <h1 className="font-merriweather mb-4 text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <div className="mb-6 max-w-lg">
              <q className="text-sm text-white/90 drop-shadow-md md:text-lg">
                {quote}
              </q>
            </div>
            <div className="flex flex-wrap gap-4">
              {!routeProgress.completed && !isPremiumResource && userId ? (
                <ArrowLeftButton
                  size="lg"
                  onClick={routeInitialized ? continueRoute : startRoute}
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
                    onClick={() => router.push(`/login?next=/${slug}`)}
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
                onClick={() => setIsOpenVideo(true)}
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
            route={route}
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
        <Component />
      </PageWrapper>
      <VideoModal
        videoTitle={videoTitle}
        videoLink={videoLink}
        isOpen={isOpenVideo}
        setIsOpen={setIsOpenVideo}
      />
    </>
  );
};

export default memo(ResourceWrapper);
