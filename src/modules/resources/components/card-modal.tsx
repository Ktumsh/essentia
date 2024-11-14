"use client";

import {
  Button,
  ScrollShadow,
  Modal,
  ModalContent,
  Chip,
} from "@nextui-org/react";
import Image from "next/image";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import { Markdown } from "@/modules/core/components/ui/renderers/markdown";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { ModalSize } from "@/types/common";
import { ResourceCard } from "@/types/resource";
import { formatTitle } from "@/utils/format";

import { useModalHash } from "../hooks/use-modal-hash";

type Video = {
  videoTitle: string;
  videoLink: string;
  videoChannel?: string;
};

type Modal = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  modalSize: ModalSize;
};

interface Props {
  type: "article" | "routine";
  card: ResourceCard;
  video: Video;
  modal: Modal;
}

const CardModal = ({ props }: { props: Props }) => {
  const { type } = props;
  const { title, category, image, body } = props.card;
  const { videoTitle, videoLink, videoChannel } = props.video;
  const { isOpen, onOpen, onOpenChange, modalSize } = props.modal;

  const windowSize = useWindowSize();

  const isRoutine = type === "routine";

  const formatedTitle = formatTitle(title);

  useModalHash(formatedTitle, isOpen, onOpen);

  return (
    <>
      <Modal
        placement="center"
        scrollBehavior="inside"
        size={windowSize.width > 768 ? modalSize : "full"}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "z-[101] bg-white/50 dark:bg-black/80",
          wrapper: "overflow-hidden z-[102]",
          body: "py-6",
          base: "bg-white dark:bg-full-dark max-h-[calc(100%_-_10rem)] lg:max-h-[calc(100%_-_7.5rem)] md:rounded-3xl overflow-hidden",
          closeButton:
            "text-white/80 hover:bg-black/10 active:bg-black/15 dark:hover:bg-white/10 dark:active:bg-white/15 transition-colors z-10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <header className="animate-header visible relative h-52 w-full shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent to-70%" />
                <Image
                  width={768}
                  height={208}
                  alt={title}
                  src={image}
                  className="size-full object-cover"
                />
                <div className="absolute left-8 top-8 max-w-80">
                  <span className="text-tiny font-bold uppercase text-white/70">
                    {category}
                  </span>
                  <h2 className="text-xl font-semibold text-white md:text-2xl">
                    {title}
                  </h2>
                </div>
              </header>
              <ScrollShadow className="custom-scroll v2 overflow-y-auto hover:visible md:invisible">
                <div className="visible relative flex p-8">
                  <Markdown prose="prose-sm md:prose">{body}</Markdown>
                </div>
                {isRoutine && videoLink && (
                  <div className="visible p-8 pt-0">
                    <Chip
                      size="sm"
                      classNames={{
                        base: "bg-gray-200 dark:bg-dark mb-1",
                        content: "text-main dark:text-main-dark",
                      }}
                    >
                      {videoChannel}
                    </Chip>
                    <h3 className="mb-3 text-lg font-semibold md:text-xl">
                      {videoTitle}
                    </h3>
                    <LiteYouTubeEmbed
                      id={videoLink}
                      title={videoTitle || "Video de la rutina"}
                      poster="maxresdefault"
                      wrapperClass="yt-wrap"
                      playerClass="yt-player"
                      activatedClass="yt-activated"
                      aspectHeight={9}
                      aspectWidth={16}
                      muted
                      webp
                    />
                  </div>
                )}
              </ScrollShadow>
              <footer className="flex flex-row justify-end gap-2 border-t-1 border-gray-200 px-6 py-4 text-main dark:border-dark">
                <Button
                  radius="sm"
                  size="sm"
                  onPress={onClose}
                  className="w-full border border-gray-200 bg-gray-100 text-sm font-medium text-main shadow-sm dark:border-dark dark:bg-dark dark:text-white md:w-fit md:bg-white dark:md:bg-full-dark"
                >
                  Cerrar
                </Button>
                {/* <Button
              isIconOnly
              radius="sm"
              aria-label="Like"
              color="danger"
              onPress={onClose}
            >
              <HeartIcon className="size-6 text-white dark:text-white/80" />
            </Button> */}
              </footer>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardModal;
