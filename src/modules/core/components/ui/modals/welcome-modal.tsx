"use client";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const WelcomeModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const hasShown = sessionStorage.getItem("welcomeModal");

    if (!hasShown) {
      onOpen();
      sessionStorage.setItem("welcomeModal", "true");
    }
  }, [onOpen]);

  return (
    <>
      <Modal
        size="xs"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        hideCloseButton
        classNames={{
          backdrop: "z-[101] bg-white/50 dark:bg-black/80",
          wrapper: "z-[102]",
          base: "bg-white dark:bg-base-full-dark overflow-hidden rounded-3xl border border-gray-200 dark:border-base-dark",
          header:
            "flex-col text-center justify-center text-base-color dark:text-white",
          body: "text-base-color dark:text-gray-100 text-center",
          closeButton:
            "text-base-color dark:text-white/80 hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent>
          <>
            <ModalHeader>
              <div className="absolute -top-[826px] -left-1/2 -translate-x-32 size-[900px] bg-gray-200 dark:bg-base-dark border-4 border-bittersweet-400 dark:border-cerise-red-600  rounded-full -z-10"></div>
              <h1 className="text-base-color dark:text-base-color-dark font-motivasans text-2xl font-bold">
                ¡Bienvenid@!
              </h1>
            </ModalHeader>
            <ModalBody className="pt-8 text-base-color dark:text-base-color-dark">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo-essentia.webp"
                  alt="Welcome"
                  width={40}
                  height={60}
                  className="w-10"
                />
              </div>
              <h2 className="font-bold">¿Es tu primera vez?</h2>
              <p className="text-sm text-base-color-m dark:text-base-color-dark-m">
                <span className="text-base-color dark:text-base-color-dark">
                  Essentia
                </span>{" "}
                es tu plataforma esencial de salud y bienestar 🌿
              </p>
              <p className="text-sm text-base-color-m dark:text-base-color-dark-m">
                Nos alegra que nos acompañes. Aún estamos en desarrollo, así que
                tu ayuda probando la web será muy valiosa para mejorarla.
                ¡Gracias por tu apoyo!
              </p>
            </ModalBody>
            <ModalFooter className="flex-col">
              <Button
                as={Link}
                href="/login"
                fullWidth
                size="sm"
                radius="full"
                className="text-sm bg-gray-200 dark:bg-white/10"
              >
                Inicia sesión
              </Button>
              <Button
                as={Link}
                href="/signup"
                color="danger"
                fullWidth
                size="sm"
                radius="full"
                className="text-sm bg-light-gradient dark:bg-gradient-to-r from-cerise-red-600 to-cerise-red-800"
              >
                Crea una cuenta
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WelcomeModal;
