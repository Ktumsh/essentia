"use client";

import {
  Modal,
  Button,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import { useEffect } from "react";

import { StarsIcon } from "@/modules/icons/common";

import PaymentModal from "./payment-modal";

interface WarningModalProps {
  isPremium: boolean | null;
  isPaymentModalOpen: boolean;
}

const WarningModal = ({ isPremium, isPaymentModalOpen }: WarningModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenPayment,
    onOpen: onOpenPayment,
    onOpenChange: onOpenChangePayment,
  } = useDisclosure();

  useEffect(() => {
    if (!isPaymentModalOpen) {
      onOpen();
    }
  }, [isPaymentModalOpen, onOpen]);

  if (isPremium) return null;

  return (
    <>
      <Modal
        backdrop="blur"
        size="sm"
        placement="center"
        hideCloseButton
        classNames={{
          backdrop: "z-[101] bg-white/50 dark:bg-black/50",
          wrapper: "z-[102] pointer-events-auto",
          base: [
            "bg-light-gradient-v2 dark:bg-dark-gradient-v2 rounded-3xl",
            "before:bg-white before:dark:bg-full-dark before:content-[''] before:absolute before:inset-[2px] before:rounded-[23px] before:z-[-1]",
          ],
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex-col justify-center rounded-3xl bg-light-gradient-v2 p-3 text-center text-main dark:bg-dark-gradient-v2 dark:text-white md:p-6">
                <h2 className="font-sans text-2xl font-extrabold uppercase leading-normal tracking-widest text-white">
                  Essentia Premium
                </h2>
              </ModalHeader>
              <ModalBody className="p-3 text-center text-main dark:text-main-dark md:p-6">
                <p className="font-medium">
                  Para acceder a todas las funcionalidades de Essentia AI, es
                  necesario tener un plan premium.
                </p>
                <p className="text-sm text-main-h dark:text-main-dark-h">
                  Actualiza al plan Premium para obtener acceso a todas las
                  funcionalidades de Essentia AI.
                </p>
              </ModalBody>
              <ModalFooter className="justify-center p-3 !pt-0 md:p-6">
                <Button
                  radius="full"
                  fullWidth
                  size="lg"
                  onPress={() => {
                    onClose();
                    onOpenPayment();
                  }}
                  startContent={
                    <StarsIcon
                      aria-hidden="true"
                      className="stars-icon size-5 focus:outline-none [&_*]:transition [&_*]:group-data-[hover=true]:fill-white"
                    />
                  }
                  className="bg-light-gradient-v2 !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-full before:bg-white before:transition before:content-[''] data-[hover=true]:scale-105 data-[hover=true]:shadow-lg data-[hover=true]:saturate-200 data-[hover=true]:before:opacity-0 dark:bg-dark-gradient-v2 before:dark:bg-full-dark"
                >
                  <span className="bg-light-gradient-v2 bg-clip-text font-extrabold tracking-widest text-transparent transition-colors group-data-[hover=true]:text-white dark:bg-dark-gradient-v2">
                    Hazte premium
                  </span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <PaymentModal isOpen={isOpenPayment} onOpenChange={onOpenChangePayment} />
    </>
  );
};

export default WarningModal;
