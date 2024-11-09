"use client";

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image as ImageUI,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

import { StarIcon } from "@/modules/icons/common";
import { HeartIcon } from "@/modules/icons/miscellaneus";
import { EyeIcon } from "@/modules/icons/status";
import { cn } from "@/utils/common";
import { formatTitle } from "@/utils/format";

import { useModalHash } from "../hooks/use-modal-hash";

interface Props {
  modalSize?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
    | undefined;
  modalTitle: string;
  modalImage: string;
  modalBody: string;
  index: number;
}

const NutritionCarouselItem = ({
  modalSize = "3xl",
  modalTitle,
  modalImage,
  modalBody,
  index,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);

  const formatedTitle = formatTitle(modalTitle);

  useModalHash(formatedTitle, isOpen, onOpen);

  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  return (
    <>
      <Card
        id={formatedTitle}
        data-id={formatedTitle}
        data-name={modalTitle}
        shadow="sm"
        radius="none"
        isPressable={false}
        disableRipple
        className="on-scroll group block h-96 w-full select-none text-clip rounded border border-[#e6d5bc] bg-[#ece3d4] p-[10px] text-main-h shadow-lg !transition hover:shadow-md dark:border-dark dark:bg-full-dark dark:text-main-dark"
      >
        <div className="box- mx-[1%] h-full w-[98%] border border-[#c7a26b] bg-[#e6d5bc] p-[10px] dark:border-white/5 dark:bg-dark">
          <CardHeader className="pointer-events-none absolute top-8 z-20 flex-col !items-start px-0 opacity-0 transition-all duration-300 group-hover:px-8 group-hover:opacity-100">
            <EyeIcon className="size-6 text-white/60 drop-shadow-md transition group-hover:text-white" />
          </CardHeader>
          <div className="relative overflow-hidden">
            <Image
              priority={index < 3}
              loading={index > 2 ? "lazy" : "eager"}
              width={257}
              height={256}
              src={modalImage}
              alt={modalTitle}
              className="animate-fade-in z-0 h-64 w-full object-cover [content-visibility:auto]"
            />
            <div className="absolute inset-0 z-10 flex h-full translate-y-full scale-90 flex-col bg-gray-900/90 transition-transform duration-300 group-hover:translate-y-0">
              <div className="mx-auto flex h-full items-center justify-center">
                <Button
                  isIconOnly
                  size="sm"
                  variant="solid"
                  color="primary"
                  radius="full"
                  onPress={() => setIsLiked(!isLiked)}
                  className={cn(
                    isLiked && "!text-cerise-red-500",
                    "bg-transparent text-white/40 hover:text-white data-[hover=true]:opacity-100",
                  )}
                >
                  <HeartIcon />
                </Button>
              </div>
              <div className="mx-auto flex h-full items-center justify-center">
                <Button
                  variant="ghost"
                  radius="none"
                  size="lg"
                  onPress={() => {
                    onOpen();
                    history.replaceState(null, "", `#${formatedTitle}`);
                  }}
                  className="border-white font-spacemono font-medium uppercase text-white hover:!bg-white hover:text-black"
                >
                  Ver receta
                </Button>
              </div>
              <div className="mx-auto flex h-full items-center justify-center gap-3">
                {[...Array(5)].map((_, index) => (
                  <Button
                    key={index}
                    isIconOnly
                    size="sm"
                    variant="solid"
                    color="primary"
                    radius="full"
                    onPress={() => handleRating(index)}
                    className={cn(
                      rating > index && "!text-yellow-300",
                      "bg-transparent text-white/40 hover:text-white data-[hover=true]:opacity-100",
                    )}
                  >
                    <StarIcon />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <CardFooter className="bg-transparent px-0 text-small">
            <h3 className="text-start font-spacemono text-base uppercase text-[#4a381c] transition-colors group-hover:text-black dark:text-main-dark-h dark:group-hover:text-white">
              {modalTitle}
            </h3>
          </CardFooter>
        </div>
      </Card>
      <Modal
        placement="center"
        scrollBehavior="inside"
        size={modalSize}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="none"
        classNames={{
          wrapper: "overflow-hidden z-[999]",
          body: "text-[#4a381c] dark:text-main-dark bg-[#e6d5bc] dark:bg-dark border border-[#c7a26b] dark:border-white/10 py-0 pb-6 font-spacemono scrollbar-hide",
          base: "bg-[#ece3d4] dark:bg-full-dark border-2 border-[#e6d5bc] dark:border-none rounded p-6 sm:p-8 pt-8 sm:pt-12 pb-4 sm:pb-8",
          footer:
            "bg-[#e6d5bc] dark:bg-dark border border-t-0 border-[#c7a26b]",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
          backdrop: "z-[998]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="-mx-6">
                  <ImageUI
                    as={Image}
                    width={698}
                    height={256}
                    src={modalImage}
                    alt={modalTitle}
                    radius="none"
                    classNames={{
                      wrapper: "!max-w-full w-full h-64",
                      img: "aspect-auto object-cover object-center [content-visibility:auto]",
                    }}
                  />
                </div>
                <div className="w-full">
                  <h2 className="font-dmsans text-3xl font-bold">
                    {modalTitle}
                  </h2>
                  <hr className="mt-2 h-px w-full border-t-2 border-current" />
                </div>
                <div dangerouslySetInnerHTML={{ __html: modalBody }} />
              </ModalBody>
              <div className="mt-5 flex items-center justify-end">
                <Button
                  radius="lg"
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="text-[#4a381c] dark:text-main-dark-h"
                >
                  Cerrar
                </Button>
                <Button
                  isIconOnly
                  radius="lg"
                  aria-label="Like"
                  color="danger"
                  onPress={onClose}
                >
                  <HeartIcon className="size-6 text-white dark:text-white/80" />
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NutritionCarouselItem;
