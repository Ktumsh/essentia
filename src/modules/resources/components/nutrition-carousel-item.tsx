"use client";

import { formatTitle } from "@/utils/format";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

import { useState } from "react";
import { useModalHash } from "../hooks/use-modal-hash";
import { EyeIcon } from "@/modules/icons/status";
import { HeartIcon } from "@/modules/icons/miscellaneus";
import { StarIcon } from "@/modules/icons/common";
import { cn } from "@/utils/common";

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
}

const NutritionCarouselItem = ({
  modalSize = "3xl",
  modalTitle,
  modalImage,
  modalBody,
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
        className="group h-96 w-full block p-[10px] text-base-color-h dark:text-base-color-dark bg-[#ece3d4] dark:bg-base-full-dark border border-[#e6d5bc] dark:border-base-dark !transition overflow-clip on-scroll rounded shadow-lg hover:shadow-md select-none"
      >
        <div className="h-full w-[98%] box- mx-[1%] p-[10px] bg-[#e6d5bc] dark:bg-base-dark border border-[#c7a26b] dark:border-white/5">
          <CardHeader className="absolute top-8 flex-col !items-start opacity-0 group-hover:opacity-100 px-0 group-hover:px-8 transition-all duration-300 z-20 pointer-events-none">
            <EyeIcon className="size-6 drop-shadow-md text-white/60 group-hover:text-white transition" />
          </CardHeader>
          <div className="relative overflow-hidden">
            <Image
              radius="none"
              src={modalImage}
              alt={modalTitle}
              classNames={{
                wrapper: "overflow-hidden min-w-full",
              }}
              className="z-0 w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex flex-col h-full scale-90 bg-gray-900/90 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center justify-center h-full mx-auto">
                <Button
                  isIconOnly
                  size="sm"
                  variant="solid"
                  color="primary"
                  radius="full"
                  onPress={() => setIsLiked(!isLiked)}
                  className={cn(
                    isLiked && "!text-cerise-red-500",
                    "bg-transparent text-white/40 hover:text-white data-[hover=true]:opacity-100"
                  )}
                >
                  <HeartIcon />
                </Button>
              </div>
              <div className="flex items-center justify-center h-full mx-auto">
                <Button
                  variant="ghost"
                  radius="none"
                  size="lg"
                  onPress={() => {
                    onOpen();
                    history.replaceState(null, "", `#${formatedTitle}`);
                  }}
                  className="text-white border-white hover:!bg-white hover:text-black uppercase font-spacemono font-medium"
                >
                  Ver receta
                </Button>
              </div>
              <div className="flex items-center justify-center h-full mx-auto gap-3">
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
                      "bg-transparent text-white/40 hover:text-white data-[hover=true]:opacity-100"
                    )}
                  >
                    <StarIcon />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <CardFooter className="text-small bg-transparent px-0">
            <h3 className="text-base uppercase font-spacemono text-start text-[#4a381c] dark:text-base-color-dark-h group-hover:text-black dark:group-hover:text-white transition-colors">
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
          body: "text-[#4a381c] dark:text-base-color-dark bg-[#e6d5bc] dark:bg-base-dark border border-[#c7a26b] dark:border-white/10 py-0 pb-6 font-spacemono scrollbar-hide",
          base: "bg-[#ece3d4] dark:bg-base-full-dark border-2 border-[#e6d5bc] dark:border-none rounded p-6 sm:p-8 pt-8 sm:pt-12 pb-4 sm:pb-8",
          footer:
            "bg-[#e6d5bc] dark:bg-base-dark border border-t-0 border-[#c7a26b]",
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
                  <Image
                    src={modalImage}
                    alt={modalTitle}
                    classNames={{
                      wrapper: "!max-w-full w-full h-64",
                    }}
                    className="z-0 size-full object-cover object-center rounded-none"
                  />
                </div>
                <div className="w-full">
                  <h2 className="text-3xl font-bold font-dmsans">
                    {modalTitle}
                  </h2>
                  <hr className="w-full h-px border-t-2 border-current mt-2" />
                </div>
                <div dangerouslySetInnerHTML={{ __html: modalBody }} />
              </ModalBody>
              <div className="flex justify-end items-center mt-5">
                <Button
                  radius="lg"
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="text-[#4a381c] dark:text-base-color-dark-h"
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
