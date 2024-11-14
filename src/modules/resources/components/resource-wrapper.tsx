"use client";

import {
  Button,
  Chip,
  Image as ImageUI,
  Modal,
  ModalContent,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "@/styles/lite-youtube.css";

import { RESOURCES } from "@/consts/resources";
import { Markdown } from "@/modules/core/components/ui/renderers/markdown";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { PlayIcon2 } from "@/modules/icons/action";
import { StarIcon } from "@/modules/icons/common";
import { TouchIcon } from "@/modules/icons/interface";
import { NextArrowIcon } from "@/modules/icons/navigation";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";
import { formatTitle } from "@/utils/format";

interface ResourceWrapperProps {
  params: { resource: string };
  profileData: UserProfileData | null;
}

interface ResourceData {
  videoTitle: string;
  videoLink: string;
  videoImage: string;
  imageFull: string;
  component: FC;
}

const ResourceWrapper: FC<ResourceWrapperProps> = ({ params, profileData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeVideo, setActiveVideo] = useState<ResourceData | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const { resource } = params;

  const resourceData = RESOURCES.find((item) => item.resource === resource);

  if (!resourceData) return null;

  const {
    title,
    intro,
    description,
    quote,
    videoTitle,
    imageFull,
    component: ContentComponent,
  } = resourceData;

  const formatedTitle = formatTitle(title);

  const handleOpenModal = (video: ResourceData) => {
    setActiveVideo(video);
    onOpen();
  };

  const scrollToEnd = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        left: sectionRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-dvh w-full flex-col pb-16 pt-14 md:pb-0">
        <div className="flex-1">
          <div className="mx-auto size-full max-w-8xl flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:border md:border-y-0">
            <div className="select-none md:pb-6 lg:px-6">
              <div className="mx-auto flex w-full flex-col">
                <div className="flex flex-col overflow-hidden md:flex-row md:overflow-visible">
                  <section
                    id={`introduccion-a-${formatedTitle}`}
                    data-id={`introduccion-a-${formatedTitle}`}
                    data-name={`Introducción a ${title}`}
                    className="relative z-10 flex aspect-[908/384] flex-1 overflow-hidden border !border-t-0 border-white shadow-md dark:border-accent-dark md:mb-5 lg:rounded-b-3xl"
                  >
                    <div className="absolute right-0 top-0 z-20 p-5">
                      <Tooltip
                        content="Contenido recomendado"
                        delay={800}
                        closeDelay={0}
                        classNames={{
                          content: tooltipStyles.content,
                        }}
                      >
                        <Chip
                          variant="shadow"
                          classNames={{
                            base: "w-12 max-w-full justify-center bg-light-gradient dark:bg-dark-gradient-v2 cursor-help",
                            content: "flex justify-center",
                          }}
                        >
                          <StarIcon className="w-4 text-white" />
                        </Chip>
                      </Tooltip>
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
                      <ImageUI
                        priority
                        as={Image}
                        width={908}
                        height={384}
                        quality={90}
                        src={imageFull}
                        alt={title}
                        classNames={{
                          wrapper:
                            "flex items-center justify-center !max-w-full aspect-[908/384]",
                          img: "aspect-[908/384] relative rounded-none brightness-95 object-cover object-center z-0",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-full-dark/50 to-black/0 to-40%"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 z-20 px-5 py-3">
                      <Tooltip
                        content={videoTitle}
                        delay={800}
                        closeDelay={0}
                        classNames={{
                          content: tooltipStyles.content,
                        }}
                      >
                        <Button
                          variant="flat"
                          className="z-10 h-8 min-w-16 bg-black/40 backdrop-blur-sm backdrop-saturate-150 data-[hover=true]:bg-black/60"
                          onPress={() => handleOpenModal({ ...resourceData })}
                        >
                          <PlayIcon2 className="group absolute left-1/2 top-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2 text-white" />
                        </Button>
                      </Tooltip>
                    </div>
                  </section>
                  {windowSize.width > 768 ? (
                    <section
                      onMouseEnter={() => setShowIntro(false)}
                      onMouseLeave={() => setShowIntro(true)}
                      className="group flex items-center md:max-w-md"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={showIntro ? "intro" : "description"}
                          initial={{
                            x: showIntro ? "0%" : "-100%",
                            opacity: 0,
                          }}
                          animate={{ x: "0%", opacity: 1 }}
                          exit={{
                            x: showIntro ? "0%" : "-100%",
                            opacity: 0,
                          }}
                          transition={{
                            x: { ease: "easeInOut", duration: 0.3 },
                            opacity: { ease: "linear", duration: 0.3 },
                          }}
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
                          <div className="prose text-main dark:prose-invert dark:text-main-dark">
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
                  ) : (
                    <section
                      ref={sectionRef}
                      className="custom-scroll v2 group relative inline-flex flex-1 snap-x snap-mandatory overflow-x-auto md:max-w-md"
                    >
                      <div className="prose-sm max-w-full shrink-0 snap-center p-6 text-main dark:prose-invert dark:text-main-dark">
                        <Markdown prose="prose-sm">{intro}</Markdown>
                        <button
                          aria-label="Ir al final"
                          className="absolute bottom-0 right-0 p-6"
                          onClick={scrollToEnd}
                        >
                          <NextArrowIcon className="size-8 text-main-l dark:text-main-dark-l" />
                        </button>
                      </div>
                      <div className="prose-sm max-w-full shrink-0 snap-center p-6 text-main dark:prose-invert dark:text-main-dark">
                        <h3 className="font-semibold text-[#111827] dark:text-white">
                          ¿Qué es {title}?
                        </h3>
                        <Markdown prose="prose-sm">{description}</Markdown>
                      </div>
                    </section>
                  )}
                </div>
                <div
                  id="content"
                  className="relative text-main dark:text-main-dark"
                >
                  <ContentComponent profileData={profileData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        backdrop="blur"
        radius="none"
        size="5xl"
        placement="center"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "z-[101] bg-white/50 dark:bg-black/80",
          wrapper: "z-[102]",
          closeButton:
            "z-10 hover:bg-black/5 active:bg-black/10 text-white transition-colors duration-150",
        }}
      >
        <ModalContent>
          {activeVideo && (
            <LiteYouTubeEmbed
              id={activeVideo.videoLink}
              title={activeVideo.videoTitle}
              wrapperClass="yt-wrap !rounded-none"
              playerClass="yt-player"
              activatedClass="yt-activated"
              poster="maxresdefault"
              webp
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResourceWrapper;
