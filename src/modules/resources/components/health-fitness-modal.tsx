"use client";

import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Image as ImageUI,
  ScrollShadow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRef, useEffect, FC } from "react";

import useWindowSize from "@/modules/core/hooks/use-window-size";
import { HeartIcon } from "@/modules/icons/miscellaneus";
import { EyeIcon } from "@/modules/icons/status";
import { useModalHash } from "@/modules/resources/hooks/use-modal-hash";
import { formatTitle } from "@/utils/format";

interface Props {
  modalSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  modalTitle: string;
  modalImage: string;
  modalBody: string;
  componentId?: string;
}

export const ModalComponent: FC<Props> = ({
  modalSize = "3xl",
  modalTitle,
  modalImage,
  modalBody,
  componentId,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formatedTitle = formatTitle(modalTitle);
  const componentRef = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();

  useEffect(() => {
    if (isOpen && componentId) {
      const component = document.getElementById(componentId);
      if (component && componentRef.current) {
        const clonedNode = component.cloneNode(true) as HTMLElement;
        componentRef.current.innerHTML = "";
        componentRef.current.appendChild(clonedNode);
        component.style.display = "none";
      }
    }
  }, [isOpen, componentId]);

  useEffect(() => {
    if (!isOpen && componentId) {
      const component = document.getElementById(componentId);
      if (component) {
        component.style.display = "block";
      }
    }
  }, [isOpen, componentId]);

  useModalHash(formatedTitle, isOpen, onOpen);

  return (
    <>
      <Card
        id={formatedTitle}
        data-id={formatedTitle}
        data-name={modalTitle}
        radius="sm"
        isPressable
        onPress={() => {
          onOpen();
          history.replaceState(null, "", `#${formatedTitle}`);
        }}
        className="group grid grid-cols-12 flex-row text-clip border border-gray-200 bg-gray-100 text-main-h shadow-none !transition dark:border-dark dark:bg-dark/50 dark:text-main-dark md:flex md:flex-col"
      >
        <CardHeader className="absolute top-1 z-10 hidden flex-col !items-start opacity-0 transition-all group-hover:px-6 group-hover:opacity-100 md:flex">
          <EyeIcon className="size-6 text-white/60 drop-shadow-md transition group-hover:text-white" />
        </CardHeader>
        <div className="col-span-5 flex h-28 justify-center p-2 md:h-52 md:w-full">
          <ImageUI
            as={Image}
            width={310}
            height={192}
            quality={90}
            alt={modalTitle}
            radius="sm"
            classNames={{
              wrapper: "max-w-full",
              img: "z-0 !h-full md:!h-48 object-cover shadow-lg shadow-black/20 group-hover:scale-95",
            }}
            src={modalImage}
          />
        </div>
        <CardFooter className="col-span-7 size-full bg-transparent text-small md:h-auto">
          <p className="text-start font-semibold transition-colors group-hover:text-black dark:group-hover:text-white">
            {modalTitle}
          </p>
        </CardFooter>
      </Card>
      <Modal
        placement="center"
        scrollBehavior="inside"
        size={windowSize.width > 768 ? modalSize : "full"}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        classNames={{
          backdrop: "z-[101] bg-white/50 dark:bg-black/80",
          wrapper: "overflow-hidden z-[102]",
          body: "py-6",
          base: "bg-white dark:bg-full-dark max-h-[calc(100%_-_10rem)] lg:max-h-[calc(100%_-_7.5rem)]",
          header: "border-b-1 border-gray-200 dark:border-dark",
          footer: "border-t-1 border-gray-200 dark:border-dark",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-grotesk text-xl font-bold text-main dark:text-main-dark">
                <q>{modalTitle}</q>
              </ModalHeader>
              <ScrollShadow className="custom-scroll v2" size={80}>
                <ModalBody>
                  <div
                    dangerouslySetInnerHTML={{ __html: modalBody }}
                    className="prose text-main dark:prose-invert dark:text-main-dark"
                  />
                  <div ref={componentRef}></div>
                </ModalBody>
              </ScrollShadow>
              <ModalFooter className="text-main dark:text-main-dark">
                <Button
                  radius="sm"
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="data-[hover=true]:bg-black/5 data-[hover=true]:dark:bg-white/5"
                >
                  Cerrar
                </Button>
                <Button
                  isIconOnly
                  radius="sm"
                  aria-label="Like"
                  color="danger"
                  onPress={onClose}
                >
                  <HeartIcon className="size-6 text-white dark:text-white/80" />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
