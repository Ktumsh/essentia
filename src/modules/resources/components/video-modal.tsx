import { Modal, ModalContent } from "@nextui-org/react";
import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import { formatTitle } from "@/utils/format";

import { useModalHash } from "../hooks/use-modal-hash";

type Modal = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

type Video = {
  videoTitle?: string;
  videoLink?: string;
};

interface VideoModalProps {
  video: Video;
  modal: Modal;
}

const VideoModal = ({ video, modal }: VideoModalProps) => {
  const { isOpen, onOpen, onOpenChange } = modal;
  const { videoTitle, videoLink } = video;

  const formatedTitle = formatTitle(videoTitle as string);

  useModalHash(formatedTitle, isOpen, onOpen);
  return (
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
        {video && (
          <LiteYouTubeEmbed
            id={videoLink || ""}
            title={videoTitle || ""}
            wrapperClass="yt-wrap !rounded-none"
            playerClass="yt-player"
            activatedClass="yt-activated"
            poster="maxresdefault"
            webp
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
