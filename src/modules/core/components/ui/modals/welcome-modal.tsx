"use client";

import {
  Button,
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
        placement="center"
        hideCloseButton
        classNames={{
          backdrop: "z-[101] bg-white/50 dark:bg-black/50",
          wrapper: "z-[102]",
          base: "bg-white dark:bg-full-dark overflow-hidden rounded-3xl border border-gray-200 dark:border-dark",
          header:
            "flex-col text-center justify-center text-main dark:text-white",
          body: "text-main dark:text-gray-100 text-center",
        }}
      >
        <ModalContent>
          <>
            <ModalHeader>
              <div className="absolute -left-1/2 top-[-826px] -z-10 size-[900px] -translate-x-32 rounded-full border-4 border-bittersweet-400 bg-gray-200 dark:border-cerise-red-600 dark:bg-dark"></div>
              <h1 className="font-motivasans text-2xl font-bold text-main dark:text-main-dark">
                ¡Bienvenid@!
              </h1>
            </ModalHeader>
            <ModalBody className="pt-8 text-main dark:text-main-dark">
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
              <p className="text-sm text-main-m dark:text-main-dark-m">
                <span className="text-main dark:text-main-dark">Essentia</span>{" "}
                es tu plataforma esencial de salud y bienestar 🌿
              </p>
              <p className="text-sm text-main-m dark:text-main-dark-m">
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
                className="bg-gray-200 text-sm dark:bg-white/10"
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
                className="bg-light-gradient from-cerise-red-600 to-cerise-red-800 text-sm dark:bg-gradient-to-r"
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
