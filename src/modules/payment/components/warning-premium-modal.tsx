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
import PaymentModal from "./payment-modal";
import { useEffect } from "react";
import { StarsIcon } from "@/modules/icons/common";

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
            "before:bg-white before:dark:bg-base-full-dark before:content-[''] before:absolute before:inset-[2px] before:rounded-[23px] before:z-[-1]",
          ],
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="p-3 flex-col text-center justify-center text-base-color dark:text-white md:p-6 bg-light-gradient-v2 dark:bg-dark-gradient-v2 rounded-3xl">
                <h2 className="text-2xl leading-normal font-extrabold uppercase tracking-widest text-white font-sans">
                  Essentia Premium
                </h2>
              </ModalHeader>
              <ModalBody className="p-3 md:p-6 text-base-color dark:text-base-color-dark text-center">
                <p className="font-medium">
                  Para acceder a todas las funcionalidades de Essentia AI, es
                  necesario tener un plan premium.
                </p>
                <p className="text-sm text-base-color-h dark:text-base-color-dark-h">
                  Actualiza al plan Premium para obtener acceso a todas las
                  funcionalidades de Essentia AI.
                </p>
              </ModalBody>
              <ModalFooter className="justify-center !pt-0 p-3 md:p-6">
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
                      className="size-5 stars-icon focus:outline-none [&_*]:group-data-[hover=true]:fill-white [&_*]:transition"
                    />
                  }
                  className="bg-light-gradient-v2 dark:bg-dark-gradient-v2 data-[hover=true]:saturate-200 data-[hover=true]:scale-105 data-[hover=true]:shadow-lg !transition before:bg-white before:dark:bg-base-full-dark before:content-[''] before:absolute before:inset-[2px] before:rounded-full before:z-[-1] data-[hover=true]:before:opacity-0 before:transition"
                >
                  <span className="text-transparent bg-clip-text bg-light-gradient-v2 dark:bg-dark-gradient-v2 font-extrabold tracking-widest group-data-[hover=true]:text-white transition-colors">
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
