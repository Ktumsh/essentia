import "@/styles/lite-youtube.css";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import LiteYouTubeEmbed from "react-lite-youtube-embed";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import { formatTitle } from "@/utils/format";

import { useModalHash } from "../_hooks/use-modal-hash";

type Modal = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
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
  const { isOpen, setIsOpen } = modal;
  const { videoTitle, videoLink } = video;

  const formatedTitle = formatTitle(videoTitle as string);

  useModalHash(formatedTitle, isOpen, setIsOpen);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        isBlurred
        closeButtonClass="text-white/80"
        className="max-w-5xl! gap-0 rounded-none border-none p-0"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">{videoTitle}</DialogTitle>
          <DialogDescription className="sr-only">
            Video sobre {videoTitle}
          </DialogDescription>
        </DialogHeader>
        {video && (
          <LiteYouTubeEmbed
            id={videoLink || ""}
            title={videoTitle || ""}
            wrapperClass="yt-wrap rounded-none!"
            playerClass="yt-player"
            activatedClass="yt-activated"
            poster="maxresdefault"
            webp
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
