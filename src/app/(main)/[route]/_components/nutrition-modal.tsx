"use client";

import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useIsMobile } from "@/hooks/use-mobile";

import { useModalHash } from "../_hooks/use-modal-hash";

type Item = {
  slug: string;
  title: string;
  image: string;
  body: string;
};

type Modal = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

interface NutritionModalProps {
  item: Item;
  modal: Modal;
}

const NutritionModal = ({ item, modal }: NutritionModalProps) => {
  const { slug, title, image, body } = item;
  const { isOpen, setIsOpen } = modal;

  const isMobile = useIsMobile();

  useModalHash(slug, isOpen, setIsOpen);
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="border-border bg-accent dark:bg-popover border-2 p-6 pt-0 pb-4 sm:p-8 sm:pt-12">
          <DrawerHeader className="border-none">
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
            <DrawerDescription className="sr-only">
              Esto es una receta de {title}
            </DrawerDescription>
          </DrawerHeader>
          <div className="border-border bg-background text-foreground mt-3 overflow-hidden rounded-lg border py-0 pb-6">
            <ScrollArea className="h-[655px]">
              <div className="relative h-52 w-full shrink-0">
                <Image
                  width={768}
                  height={208}
                  src={image}
                  alt={title}
                  className="size-full object-cover [content-visibility:auto]"
                />
              </div>
              <div className="px-6 py-3">
                <h2 className="font-dmsans text-2xl font-bold md:text-3xl">
                  {title}
                </h2>
                <hr className="mt-2 h-px w-full border-t-2 border-current" />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: body }}
                className="flex px-6 py-3"
              />
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-border bg-accent dark:bg-popover max-w-3xl! rounded-xl border-2 p-6 pt-8 pb-4 sm:p-8 sm:pt-12">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Esto es una receta de {title}
          </DialogDescription>
          <div className="border-border bg-background text-foreground overflow-hidden rounded-lg border py-0">
            <ScrollArea className="h-[655px]">
              <div className="relative h-52 w-full shrink-0">
                <Image
                  width={768}
                  height={208}
                  src={image}
                  alt={title}
                  className="size-full object-cover [content-visibility:auto]"
                />
              </div>
              <div className="px-6 py-3">
                <h2 className="font-space-mono text-2xl font-bold md:text-3xl">
                  {title}
                </h2>
                <hr className="mt-2 h-px w-full border-t-2 border-current" />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: body }}
                className="**:font-space-mono flex px-6 py-3 pb-6"
              />
            </ScrollArea>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="outline">Cerrar</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default NutritionModal;
