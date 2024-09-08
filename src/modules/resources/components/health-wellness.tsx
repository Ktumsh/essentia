"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@nextui-org/react";
import { HEALTH_MODAL_DATA } from "@/consts/health-modal";
import RESOURCES_VIDEOS from "@/consts/resources-videos";
import { useState } from "react";
import { Video } from "@/types/resource";
import Link from "next/link";
import VideoCard from "./video-card";
import { HashIcon } from "@/modules/icons/common";
import { ModalComponent } from "@/modules/core/components/ui/modals/health-fitness-modal";

const videos: Video[] =
  RESOURCES_VIDEOS.find((section) => section.section === "HealthWellness")
    ?.videos || [];

const HealthWellness = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <>
      <section className="px-5 md:px-0 py-6">
        <div className="w-full px-3 mb-8">
          <h3 className="drop-shadow-md text-base-color dark:text-white">
            <Button
              as={Link}
              id="articulos-interesantes"
              data-id="articulos-interesantes"
              data-name="Artículos Interesantes"
              href="#articulos-interesantes"
              disableRipple
              radius="none"
              variant="flat"
              endContent={
                <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
              }
              className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
            >
              <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
                Artículos
              </span>
              Interesantes
            </Button>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {HEALTH_MODAL_DATA.map((modal, index) => (
            <ModalComponent
              key={index}
              tooltip="Ver artículo"
              modalTitle={modal.modalTitle}
              modalImage={modal.modalImage}
              modalBody={modal.modalBody}
              componentId=""
            />
          ))}
        </div>
      </section>

      <section className="px-5 md:px-0 py-6">
        <div className="w-full px-3 mb-6">
          <h3 className="drop-shadow-md text-base-color dark:text-white text-xl font-semibold">
            <Button
              as={Link}
              id="videos-recomendados"
              data-id="videos-recomendados"
              data-name="Videos Recomendados"
              href="#videos-recomendados"
              disableRipple
              radius="none"
              variant="flat"
              endContent={
                <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
              }
              className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
            >
              <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
                Videos
              </span>
              Recomendados
            </Button>
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-5">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
            />
          ))}
        </div>
      </section>

      <section className="px-5 md:px-0 py-6">
        <div className="w-full px-3 mb-6">
          <Button
            as={Link}
            id="podcasts-recomendados"
            data-id="podcasts-recomendados"
            data-name="Podcasts Recomendados"
            href="#podcasts-recomendados"
            disableRipple
            radius="none"
            variant="flat"
            endContent={
              <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
            }
            className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
          >
            <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Podcasts
            </span>
            Recomendados
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <iframe
            className="shadow-md bg-transparent"
            style={{ borderRadius: 16 }}
            src="https://open.spotify.com/embed/show/0aNjR24pN6QYOvGjqEZHRh?utm_source=generator"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="shadow-md bg-transparent"
            style={{ borderRadius: 16 }}
            src="https://open.spotify.com/embed/show/2nAf8IDQG1sPEwAKdG2DyM?utm_source=generator"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <iframe
            className="shadow-md bg-transparent"
            style={{ borderRadius: 16 }}
            src="https://open.spotify.com/embed/show/5YdWqfLVaREPm8rgwA2lkE?utm_source=generator"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default HealthWellness;
