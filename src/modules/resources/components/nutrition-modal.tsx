"use client";

import Image from "next/image";
import React from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
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

import { useModalHash } from "../hooks/use-modal-hash";

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
        <DrawerContent className="border-2 border-altern bg-altern-light p-6 pb-4 pt-0 dark:border-dark dark:bg-full-dark sm:p-8 sm:pt-12">
          <DrawerHeader>
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
            <DrawerDescription className="sr-only">
              Esto es una receta de {title}
            </DrawerDescription>
          </DrawerHeader>
          <div className="modal mt-3 overflow-y-auto rounded-md border border-altern-accent bg-altern py-0 pb-6 font-spacemono text-[#4a381c] dark:border-accent-dark dark:bg-dark dark:text-main-dark">
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
          </div>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl overflow-hidden rounded-xl border-2 border-altern bg-altern-light p-6 pb-4 pt-8 dark:border-dark dark:bg-full-dark sm:p-8 sm:pt-12">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Esto es una receta de {title}
          </DialogDescription>
          <div className="modal overflow-y-auto rounded-md border border-altern-accent bg-altern py-0 pb-6 font-spacemono text-[#4a381c] dark:border-accent-dark dark:bg-dark dark:text-main-dark">
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
          </div>
          <DialogFooter className="flex flex-row justify-end gap-2 border-t-1 border-gray-200 pt-4 text-main dark:border-dark md:px-6">
            <DialogTrigger asChild>
              <Button
                size="sm"
                radius="lg"
                variant="ghost"
                className="w-fit border border-altern-accent bg-altern-light text-sm font-medium text-main shadow-sm hover:!bg-transparent hover:opacity-80 dark:border-dark dark:bg-full-dark dark:text-white"
              >
                Cerrar
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default NutritionModal;
