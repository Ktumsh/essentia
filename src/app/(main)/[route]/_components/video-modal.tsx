import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import LiteYouTubeEmbed from "react-lite-youtube-embed";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatTitle } from "@/utils";

import { useModalHash } from "../_hooks/use-modal-hash";

interface VideoModalProps {
  videoTitle?: string;
  videoLink?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const VideoModal = ({
  videoTitle,
  videoLink,
  isOpen,
  setIsOpen,
}: VideoModalProps) => {
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
        {videoLink && (
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
