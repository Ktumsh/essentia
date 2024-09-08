"use client";

import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Image as UIImage,
  Tooltip,
  ScrollShadow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useRef, useEffect, FC } from "react";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { formatTitle } from "@/utils/format";
import { useModalHash } from "@/modules/resources/hooks/use-modal-hash";
import { EyeIcon } from "@/modules/icons/status";
import { HeartIcon } from "@/modules/icons/miscellaneus";
import Image from "next/image";

interface Props {
  tooltip: string;
  modalSize?: string;
  modalTitle: string;
  modalImage: string;
  modalBody: string;
  componentId?: string;
}

export const ModalComponent: FC<Props> = ({
  tooltip,
  modalSize = "2xl",
  modalTitle,
  modalImage,
  modalBody,
  componentId,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const formatedTitle = formatTitle(modalTitle);
  const componentRef = useRef<HTMLDivElement>(null);

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
      <Tooltip
        content={tooltip}
        closeDelay={0}
        placement="top-end"
        classNames={{
          content: tooltipStyles.content,
        }}
      >
        <Card
          id={formatedTitle}
          data-id={formatedTitle}
          data-name={modalTitle}
          shadow="sm"
          isPressable
          onPress={() => {
            onOpen();
            history.replaceState(null, "", `#${formatedTitle}`);
          }}
          className="group h-64 rounded-xl text-base-color-h dark:text-base-color-dark bg-white dark:bg-base-full-dark border border-gray-100 dark:border-base-dark shadow-md !transition overflow-clip on-scroll"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start opacity-0 group-hover:opacity-100 group-hover:px-6 transition-all">
            <EyeIcon className="size-6 drop-shadow-md text-white/60 group-hover:text-white transition" />
          </CardHeader>
          <UIImage
            as={Image}
            width={305}
            height={206}
            quality={90}
            removeWrapper
            alt={modalTitle}
            className="z-0 w-full h-52 object-cover rounded-xl shadow-lg shadow-black/20 group-hover:scale-95"
            src={modalImage}
          />
          <CardFooter className="text-small justify-center bg-transparent">
            <q className="text-base font-bold text-start group-hover:text-black dark:group-hover:text-white transition-colors">
              {modalTitle}
            </q>
          </CardFooter>
        </Card>
      </Tooltip>
      <Modal
        placement="center"
        scrollBehavior="inside"
        size={modalSize as any}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          backdrop: "z-[101]",
          wrapper: "overflow-hidden z-[102]",
          body: "py-6",
          base: "bg-white dark:bg-base-dark max-h-[calc(100%_-_10rem)] lg:max-h-[calc(100%_-_7.5rem)]",
          header: "border-b-1 border-gray-200 dark:border-base-color-m",
          footer: "border-t-1 border-gray-200 dark:border-base-color-m",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-base-color dark:text-base-color-dark font-grotesk font-bold text-xl">
                <q>{modalTitle}</q>
              </ModalHeader>
              <ScrollShadow className="custom-scroll" size={80}>
                <ModalBody className="text-base-color-h dark:text-base-color-dark-h">
                  <div dangerouslySetInnerHTML={{ __html: modalBody }} />
                  <div ref={componentRef}></div>
                </ModalBody>
              </ScrollShadow>
              <ModalFooter className="text-base-color dark:text-base-color-dark">
                <Button
                  radius="lg"
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="data-[hover=true]:bg-black/5 data-[hover=true]:dark:bg-white/5"
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
