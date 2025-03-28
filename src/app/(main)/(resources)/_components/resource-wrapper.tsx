"use client";

import { ChevronsLeft, TextSearch } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import Image from "next/image";
import { memo, useRef, useState } from "react";

import "@/styles/lite-youtube.css";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { Markdown } from "@/components/markdown";
import { PlayIcon } from "@/components/ui/icons/action";
import { cn, getResourceDetails, getResourceIndex } from "@/lib/utils";
import { formatTitle } from "@/utils/format";

import ResourceBadge from "./resource-badge";
import VideoModal from "./video-modal";

import type { Resource } from "@/db/schema";
import type { Modules, Resources } from "@/types/resource";

interface ResourceWrapperProps {
  userId: string;
  resource: Resource & Resources;
  modules: Modules[];
  isPremium?: boolean | null;
  completedLessons: string[];
  moduleProgress: { [moduleId: string]: number };
  courseProgress: { completed: boolean; progress: number };
  courseInitialized: boolean;
}

const ResourceWrapper = ({
  userId,
  resource,
  modules,
  isPremium,
  completedLessons,
  moduleProgress,
  courseProgress,
  courseInitialized,
}: ResourceWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const {
    id,
    slug,
    title,
    name,
    subtitle,
    description,
    about,
    intro,
    quote,
    videoTitle,
    videoLink,
    imageFull,
    component: Component,
  } = resource;

  const formatedTitle = formatTitle(name || title);

  const resourceIndex = getResourceIndex(name || title);

  const resourceDetails = getResourceDetails(name || title);

  const scrollTo = ({ to }: { to: "start" | "end" }) => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        left: to === "start" ? 0 : sectionRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  const video = {
    videoTitle,
    videoLink,
  };

  const modal = {
    isOpen,
    setIsOpen,
  };

  const animationVariants: Variants = {
    initial: (showIntro: boolean) => ({
      x: showIntro ? "0%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: "0%",
      opacity: 1,
    },
    exit: (showIntro: boolean) => ({
      x: showIntro ? "0%" : "-100%",
      opacity: 0,
    }),
  };

  const transitionSettings = {
    x: { ease: "easeInOut", duration: 0.3 },
    opacity: { ease: "linear", duration: 0.3 },
  };

  const componentProps = {
    userId,
    resource: { resourceId: id, resourceName: name },
    modules,
    about,
    slug,
    completedLessons,
    moduleProgress,
    courseProgress,
    courseInitialized,
    isPremium,
  };

  return (
    <>
      <section
        id={`introduccion-a-${formatedTitle}`}
        className="relative z-10 col-[1/2] row-[1/2] -mx-6 flex aspect-908/384 flex-1 flex-col overflow-hidden md:mx-0 lg:flex-row lg:rounded-b-2xl"
      >
        <ResourceBadge
          resourceIndex={resourceIndex}
          resourceDetails={resourceDetails}
          className="absolute top-0 right-0 p-5"
        />
        <div className="group text-foreground relative flex w-full flex-col justify-center overflow-hidden">
          <div className="absolute top-0 z-10 flex w-full shrink-0 flex-col items-start justify-start px-5 pt-3 transition-opacity duration-500 group-active:opacity-0 lg:group-hover:opacity-0">
            <span className="font-semibold text-white/70 uppercase">
              {subtitle}
            </span>
            <h2 className="font-merriweather text-2xl font-bold text-white md:text-3xl">
              {name || title}
            </h2>
          </div>
          <div className="absolute inset-0 z-10 flex size-full items-center justify-center opacity-0 transition duration-500 group-active:opacity-100 group-active:backdrop-blur-lg md:group-hover:opacity-100 md:group-hover:backdrop-blur-lg">
            <div className="relative z-10 inline-flex transition duration-500 before:absolute before:inset-0 before:z-[-1] before:rounded-full before:bg-black/40 before:blur-xl">
              <q className="font-merriweather px-10 text-center font-medium text-white md:text-xl xl:text-2xl">
                {quote}
              </q>
            </div>
          </div>
          <Image
            priority
            width={780}
            height={330}
            quality={80}
            src={imageFull}
            alt={name || title}
            className="relative z-0 flex aspect-908/384 size-full max-w-full! items-center justify-center rounded-none object-cover object-center brightness-95"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/0 to-40%"></div>
        </div>
        <div className="absolute right-0 bottom-0 z-20 px-5 py-3">
          <BetterTooltip content="Ver video presentación">
            <Button
              aria-label="Ver video presentación"
              variant="ghost"
              radius="sm"
              className="z-10 aspect-video h-8 bg-black/40 backdrop-blur-xs backdrop-saturate-150 transition! hover:bg-black/60!"
              onClick={() => setIsOpen(true)}
            >
              <PlayIcon className="group absolute top-1/2 left-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2 text-white" />
              <span className="sr-only">Ver video presentación</span>
            </Button>
          </BetterTooltip>
        </div>
      </section>
      <section className="group relative col-[2/3] row-[1/2] hidden items-center md:max-w-md lg:flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={showIntro ? "intro" : "description"}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={showIntro}
            variants={animationVariants}
            transition={transitionSettings}
            className={cn(
              "relative w-full p-6",
              !showIntro &&
                "bg-accent dark:bg-accent/50 border-border rounded-2xl border",
            )}
          >
            <div className="prose text-foreground dark:prose-invert antialiased will-change-transform">
              {showIntro ? (
                <Markdown>{intro}</Markdown>
              ) : (
                <>
                  <h3>¿Qué es {name}?</h3>
                  <Markdown>{description}</Markdown>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          key={showIntro ? "intro" : "description"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: showIntro ? 0.8 : 1.4,
            ease: "easeInOut",
          }}
          className="absolute right-0 bottom-0 flex px-5"
        >
          <button
            aria-label={
              showIntro ? "Mostrar descripción" : "Mostrar introducción"
            }
            className="text-muted-foreground"
            onClick={() => setShowIntro(!showIntro)}
          >
            {showIntro ? (
              <TextSearch className="size-8" />
            ) : (
              <ChevronsLeft className="size-8" />
            )}
          </button>
        </motion.div>
      </section>
      <section
        ref={sectionRef}
        className="group col-[1/2] row-[2/3] inline-flex flex-1 snap-x snap-mandatory overflow-x-auto lg:hidden"
      >
        <div className="prose-sm text-foreground dark:prose-invert relative flex max-w-full shrink-0 snap-center flex-col justify-between pb-2 md:w-full md:px-6">
          <Markdown className="prose-sm">{intro}</Markdown>
          <div className="mt-2 flex w-full justify-end">
            <button
              aria-label="Ir al final"
              onClick={() => scrollTo({ to: "end" })}
            >
              <ChevronsLeft className="text-muted-foreground size-8 rotate-180" />
            </button>
          </div>
        </div>
        <div className="prose-sm text-foreground dark:prose-invert relative flex max-w-full shrink-0 snap-center flex-col justify-between pb-2 md:w-full md:px-6">
          <h3 className="font-semibold text-[#111827] dark:text-white">
            ¿Qué es {name}?
          </h3>
          <Markdown className="prose-sm">{description}</Markdown>
          <div className="mt-2 flex w-full justify-end">
            <button
              aria-label="Ir al final"
              onClick={() => scrollTo({ to: "start" })}
            >
              <ChevronsLeft className="text-foreground-l-l size-8" />
            </button>
          </div>
        </div>
      </section>
      <Component {...componentProps} />
      <VideoModal video={video} modal={modal} />
    </>
  );
};

export default memo(ResourceWrapper);
