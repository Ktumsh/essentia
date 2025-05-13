"use client";

import Image from "next/image";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { ScrollArea } from "@/components/kit/scroll-area";
import { Markdown } from "@/components/markdown";
import { useIsMobile } from "@/hooks/use-mobile";

import { useModalHash } from "../_hooks/use-modal-hash";

import type { ExcerciseVideoType } from "@/db/data/exercise-video-data";
import type { ArticleType } from "@/lib/types";

interface CardModalProps {
  type: "article" | "routine";
  item: ArticleType & ExcerciseVideoType;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CardModal = (props: CardModalProps) => {
  const { type, open, setOpen } = props;
  const {
    slug,
    title,
    category,
    image,
    body,
    title: videoTitle,
    link: videoLink,
    channel: videoChannel,
  } = props.item;

  const isMobile = useIsMobile();

  const isRoutine = type === "routine";

  useModalHash(slug, open, setOpen);

  const content = (
    <ScrollArea className="w-full overflow-y-auto">
      <div className="visible relative p-6 md:p-8">
        <Markdown className="prose-sm md:prose! md:text-base!">{body}</Markdown>
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

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="border-b-0">
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
            <DrawerDescription className="sr-only">
              Este es un artículo de la categoría: {category}
            </DrawerDescription>
          </DrawerHeader>
          <div className="relative mt-3 h-52">
            <div className="absolute inset-0 bg-linear-to-b from-black/60 to-transparent to-70%" />
            <Image
              width={768}
              height={208}
              alt={title}
              src={image}
              className="h-full object-cover"
            />
            <div className="absolute top-6 left-6 max-w-80 md:top-8 md:left-8">
              <span className="text-sm font-semibold text-white/70 uppercase">
                {category}
              </span>
              <h2 className="font-merriweather text-xl font-semibold text-white md:text-2xl">
                {title}
              </h2>
            </div>
          </div>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        isBlurred
        closeButtonClass="text-white"
        className="max-w-3xl! gap-0 overflow-hidden border-0 p-0 sm:rounded-3xl"
      >
        <DialogHeader className="relative h-52 w-full shrink-0">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Este es un artículo de la categoría: {category}
          </DialogDescription>
          <div className="absolute inset-0 bg-linear-to-b from-black/60 to-transparent to-70%" />
          <Image
            width={768}
            height={208}
            alt={title}
            src={image}
            className="size-full object-cover"
          />
          <div className="absolute top-8 left-8 max-w-80">
            <span className="text-tiny font-semibold text-white/70 uppercase">
              {category}
            </span>
            <h2 className="font-merriweather text-xl font-semibold text-white md:text-2xl">
              {title}
            </h2>
          </div>
        </DialogHeader>
        {content}
        <DialogFooter isSecondary className="justify-end">
          <DialogTrigger asChild>
            <Button variant="outline" radius="full">
              Cerrar
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
