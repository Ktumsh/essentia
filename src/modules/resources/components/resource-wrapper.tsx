"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { FC, useRef, useState } from "react";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "@/styles/lite-youtube.css";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { RESOURCES } from "@/consts/resources";
import { Markdown } from "@/modules/core/components/ui/renderers/markdown";
import { PlayIcon2 } from "@/modules/icons/action";
import { StarIcon } from "@/modules/icons/common";
import { TouchIcon } from "@/modules/icons/interface";
import { NextArrowIcon } from "@/modules/icons/navigation";
import { cn } from "@/utils/common";
import { formatTitle } from "@/utils/format";

import VideoModal from "./video-modal";

interface ResourceWrapperProps {
  params: { resource: string };
  isPremium?: boolean | null;
}

const ResourceWrapper: FC<ResourceWrapperProps> = ({ params, isPremium }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { resource } = params;

  const resourceData = RESOURCES.find((item) => item.resource === resource);

  if (!resourceData) return null;

  const {
    title,
    intro,
    description,
    quote,
    videoTitle,
    videoLink,
    imageFull,
    component: ContentComponent,
  } = resourceData;

  const formatedTitle = formatTitle(title);

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

  return (
    <>
      <div className="mx-auto min-h-full max-w-7xl flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:border md:border-y-0">
        <div className="select-none lg:px-6 lg:pb-6">
          <div className="mx-auto flex w-full flex-col">
            <div className="flex flex-col overflow-hidden md:overflow-visible lg:flex-row">
              <section
                id={`introduccion-a-${formatedTitle}`}
                data-id={`introduccion-a-${formatedTitle}`}
                data-name={`Introducción a ${title}`}
                className="relative z-10 flex aspect-[908/384] flex-1 overflow-hidden border !border-t-0 border-white shadow-md dark:border-accent-dark md:mb-5 lg:rounded-b-3xl"
              >
                <div className="absolute right-0 top-0 z-20 p-5">
                  <BetterTooltip side="right" content="Contenido recomendado">
                    <Badge className="w-12 max-w-full cursor-help justify-center bg-light-gradient shadow-md dark:bg-dark-gradient-v2">
                      <StarIcon className="w-4 text-white" />
                    </Badge>
                  </BetterTooltip>
                </div>
                <div className="group relative flex w-full flex-col justify-center overflow-hidden text-main">
                  <div className="absolute top-1 z-10 flex w-full shrink-0 flex-col items-start justify-start px-5 pt-3 transition-opacity duration-500 group-active:opacity-0 lg:group-hover:opacity-0">
                    <span className="font-motivasans font-bold uppercase text-white/60">
                      Introducción a
                    </span>
                    <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                      {title}
                    </h2>
                  </div>
                  <div className="absolute inset-0 z-10 flex size-full items-center justify-center opacity-0 transition duration-500 group-active:opacity-100 group-active:backdrop-blur-lg lg:group-hover:opacity-100 lg:group-hover:backdrop-blur-lg">
                    <div className="relative z-10 flex max-w-60 flex-col items-center justify-center transition duration-500 before:absolute before:inset-0 before:z-[-1] before:rounded-full before:bg-black/40 before:blur-xl group-active:scale-110 lg:max-w-2xl lg:group-hover:scale-110">
                      <q className="text-center font-medium text-white drop-shadow-sm lg:text-2xl">
                        {quote}
                      </q>
                    </div>
                  </div>
                  <Image
                    priority
                    width={780}
                    height={330}
                    quality={90}
                    src={imageFull}
                    alt={title}
                    className="relative z-0 flex aspect-[908/384] size-full !max-w-full items-center justify-center rounded-none object-cover object-center brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-full-dark/50 to-black/0 to-40%"></div>
                </div>
                <div className="absolute bottom-0 right-0 z-20 px-5 py-3">
                  <BetterTooltip content={videoTitle}>
                    <Button
                      variant="ghost"
                      radius="lg"
                      className="z-10 h-8 min-w-16 bg-black/40 backdrop-blur-sm backdrop-saturate-150 hover:bg-black/60"
                      onClick={() => setIsOpen(true)}
                    >
                      <PlayIcon2 className="group absolute left-1/2 top-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2 text-white" />
                    </Button>
                  </BetterTooltip>
                </div>
              </section>
              <section
                onMouseEnter={() => setShowIntro(false)}
                onMouseLeave={() => setShowIntro(true)}
                className="group hidden items-center md:max-w-md lg:flex"
              >
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
                        "rounded-r-lg border border-gray-200 bg-gray-100 dark:border-dark dark:bg-dark/50",
                    )}
                  >
                    {showIntro && (
                      <div
                        aria-hidden="true"
                        className="absolute -right-1 top-1 text-main-l dark:text-main-dark-m"
                      >
                        <TouchIcon className="animate-bounce-rotate size-10" />
                      </div>
                    )}
                    <div className="prose text-main antialiased will-change-transform dark:prose-invert dark:text-main-dark">
                      {showIntro ? (
                        <Markdown>{intro}</Markdown>
                      ) : (
                        <>
                          <h3>¿Qué es {title}?</h3>
                          <Markdown>{description}</Markdown>
                        </>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </section>
              <section
                ref={sectionRef}
                className="custom-scroll v2 group inline-flex flex-1 snap-x snap-mandatory overflow-x-auto lg:hidden"
              >
                <div className="prose-sm relative flex max-w-full shrink-0 snap-center flex-col justify-between p-6 pb-2 text-main dark:prose-invert dark:text-main-dark md:w-full">
                  <Markdown prose="prose-sm">{intro}</Markdown>
                  <div className="mt-2 flex w-full justify-end">
                    <button
                      aria-label="Ir al final"
                      onClick={() => scrollTo({ to: "end" })}
                    >
                      <NextArrowIcon className="size-8 text-main-l dark:text-main-dark-l" />
                    </button>
                  </div>
                </div>
                <div className="prose-sm relative flex max-w-full shrink-0 snap-center flex-col justify-between p-6 pb-2 text-main dark:prose-invert dark:text-main-dark md:w-full">
                  <h3 className="font-semibold text-[#111827] dark:text-white">
                    ¿Qué es {title}?
                  </h3>
                  <Markdown prose="prose-sm">{description}</Markdown>
                  <div className="mt-2 flex w-full justify-end">
                    <button
                      aria-label="Ir al final"
                      onClick={() => scrollTo({ to: "start" })}
                    >
                      <NextArrowIcon className="size-8 rotate-180 text-main-l dark:text-main-dark-l" />
                    </button>
                  </div>
                </div>
              </section>
            </div>
            <div
              id="content"
              className="relative text-main dark:text-main-dark"
            >
              <ContentComponent isPremium={isPremium} />
            </div>
          </div>
        </div>
      </div>
      <VideoModal video={video} modal={modal} />
    </>
  );
};

export default ResourceWrapper;
