"use client";

import Image from "next/image";
import { memo } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Markdown } from "@/modules/core/components/ui/renderers/markdown";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { ResourceCard } from "@/types/resource";

import { useModalHash } from "../hooks/use-modal-hash";

type Video = {
  videoTitle: string;
  videoLink: string;
  videoChannel?: string;
};

type Modal = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

interface Props {
  type: "article" | "routine";
  card: ResourceCard;
  video: Video;
  modal: Modal;
}

const CardModal = ({ props }: { props: Props }) => {
  const { type } = props;
  const { slug, title, category, image, body } = props.card;
  const { videoTitle, videoLink, videoChannel } = props.video;
  const { isOpen, setIsOpen } = props.modal;

  const windowSize = useWindowSize();

  const { width } = windowSize;

  const isMobile = width < 768;

  const isRoutine = type === "routine";

  useModalHash(slug, isOpen, setIsOpen);

  const Content = memo(() => {
    return (
      <ScrollArea className="w-full overflow-y-auto">
        <div className="visible relative p-6 md:p-8">
          <Markdown prose="prose-sm md:prose">{body}</Markdown>
        </div>
        {isRoutine && videoLink && (
          <div className="visible p-8 pt-0">
            <Badge className="mb-1">{videoChannel}</Badge>
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
      </ScrollArea>
    );
  });

  Content.displayName = "Content";

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
            <DrawerDescription className="sr-only">
              Este es un artículo de la categoría: {category}
            </DrawerDescription>
          </DrawerHeader>
          <div className="relative mt-3 h-52">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent to-70%" />
            <Image
              width={768}
              height={208}
              alt={title}
              src={image}
              className="h-full object-cover"
            />
            <div className="absolute left-6 top-6 max-w-80 md:left-8 md:top-8">
              <span className="text-tiny font-bold uppercase text-white/70">
                {category}
              </span>
              <h2 className="text-xl font-semibold text-white md:text-2xl">
                {title}
              </h2>
            </div>
          </div>
          <Content />
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          isBlurred
          closeButtonClass="text-white/80"
          className="max-w-3xl gap-0 overflow-hidden border-0 p-0 sm:rounded-3xl"
        >
          <DialogHeader className="relative h-52 w-full shrink-0">
            <DialogTitle className="sr-only">{title}</DialogTitle>
            <DialogDescription className="sr-only">
              Este es un artículo de la categoría: {category}
            </DialogDescription>
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
          </DialogHeader>
          <Content />
          <DialogFooter isSecondary className="justify-end">
            <DialogTrigger asChild>
              <Button variant="outline">Cerrar</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default CardModal;
