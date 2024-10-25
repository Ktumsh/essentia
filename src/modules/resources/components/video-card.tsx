"use client";

import { useDisclosure ,
  Card,
  CardBody,
  Image as ImageUI,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import Image from "next/image";
import { FC, useEffect } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import { PlayIcon } from "@/modules/icons/action";
import { Video } from "@/types/resource";
import { formatTitle } from "@/utils/format";

import { useModalHash } from "../hooks/use-modal-hash";


const getYouTubeThumbnail = (videoId: string) => {
  return `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`;
};

interface VideoCardProps {
  video: Video;
  setActiveVideo: (video: Video | null) => void;
  activeVideo: Video | null;
}

const VideoCard: FC<VideoCardProps> = ({
  video,
  setActiveVideo,
  activeVideo,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formatedTitle = formatTitle(video.title);

  useModalHash(formatedTitle, isOpen, onOpen, setActiveVideo, video);

  useEffect(() => {
    if (isOpen) {
      setActiveVideo(video);
    }
  }, [isOpen, setActiveVideo, video]);

  return (
    <>
      <Card
        id={formatedTitle}
        data-id={formatedTitle}
        data-name={video.title}
        radius="sm"
        classNames={{
          base: "col-span-12 md:col-span-6 border border-gray-100 dark:border-base-dark bg-white dark:bg-base-full-dark shadow-md",
          body: "p-0",
        }}
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-12 h-full items-center justify-center">
            <div className="relative col-span-5 size-full">
              <Card
                isPressable
                radius="sm"
                onPress={onOpen}
                classNames={{
                  base: "h-full",
                }}
              >
                <ImageUI
                  as={Image}
                  width={200}
                  height={113}
                  src={getYouTubeThumbnail(video.link)}
                  alt={video.title}
                  classNames={{
                    wrapper: "!max-w-none h-full rounded-md",
                    img: "object-cover h-full rounded-md",
                  }}
                />
                <PlayIcon className="group size-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
              </Card>
            </div>
            <div className="flex flex-col justify-center h-full col-span-7 p-3">
              <p className="line-clamp-4 text-xs sm:text-sm text-base-color-h dark:text-base-color-dark">
                {video.description}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
      <Modal
        backdrop="blur"
        radius="none"
        size="5xl"
        placement="center"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "z-[101]",
          wrapper: "z-[102]",
          closeButton:
            "z-10 hover:bg-black/5 active:bg-black/10 text-white transition-colors duration-150",
        }}
      >
        <ModalContent>
          {activeVideo && activeVideo.link === video.link && (
            <LiteYouTubeEmbed
              id={activeVideo.link}
              title={activeVideo.title}
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

export default VideoCard;
