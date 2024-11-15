"use client";

import { Button, Modal, ModalContent } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

import useWindowSize from "@/modules/core/hooks/use-window-size";

import { useModalHash } from "../hooks/use-modal-hash";

type Item = {
  slug: string;
  title: string;
  image: string;
  body: string;
};

type Modal = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

interface NutritionModalProps {
  item: Item;
  modal: Modal;
}

const NutritionModal = ({ item, modal }: NutritionModalProps) => {
  const { slug, title, image, body } = item;
  const { isOpen, onOpen, onOpenChange } = modal;

  const windowSize = useWindowSize();

  const { width } = windowSize;

  useModalHash(slug, isOpen, onOpen);
  return (
    <Modal
      placement="center"
      scrollBehavior="inside"
      size={width > 1280 ? "3xl" : width > 768 ? "5xl" : "full"}
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="none"
      classNames={{
        backdrop: "z-[101] bg-white/50 dark:bg-black/80",
        wrapper: "overflow-hidden z-[102]",
        base: "bg-altern-light dark:bg-full-dark border-2 border-altern dark:border-dark rounded-xl p-6 sm:p-8 pt-8 sm:pt-12 pb-4 sm:pb-8 max-h-[calc(100%_-_2rem)] xl:max-h-[calc(100%_-_7.5rem)] overflow-hidden",
        closeButton:
          "text-main-h dark:text-white/80 hover:bg-black/10 active:bg-black/15 dark:hover:bg-white/10 dark:active:bg-white/15 transition-colors z-10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div className="custom-scroll v3 overflow-y-auto rounded-md border border-altern-accent bg-altern py-0 pb-6 font-spacemono text-[#4a381c] dark:border-accent-dark dark:bg-dark dark:text-main-dark">
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
            <footer className="flex flex-row justify-end gap-2 border-t-1 border-gray-200 pt-4 text-main dark:border-dark md:px-6">
              <Button
                radius="sm"
                size="sm"
                onPress={onClose}
                className="w-full border border-altern-accent bg-altern text-sm font-medium text-main shadow-sm dark:border-dark dark:bg-dark dark:text-white md:w-fit md:bg-altern-light dark:md:bg-full-dark"
              >
                Cerrar
              </Button>
            </footer>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NutritionModal;
