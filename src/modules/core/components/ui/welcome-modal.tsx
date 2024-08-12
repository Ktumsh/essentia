"use client";

import { LinkIcon } from "@/modules/icons/action";
import { SettingsIcon } from "@/modules/icons/miscellaneus";
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
import { ArrowRightIcon } from "@radix-ui/react-icons";
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
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102]",
          base: "bg-light-gradient-v2 dark:bg-dark-gradient overflow-hidden",
          header:
            "flex-col text-center justify-center text-base-color dark:text-white",
          body: "text-base-color dark:text-gray-100 text-center",
          footer: "justify-center",
          closeButton:
            "text-base-color dark:text-white/80 hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>¡Bienvenido a Essentia!</h1>
                <Divider className="mt-3" />
              </ModalHeader>
              <ModalBody>
                <p>Estamos aún en desarrollo 😊...</p>
                <p>¡Esperamos darte la mejor experiencia!</p>
                <p className="text-sm">
                  Por lo que te recomendamos que{" "}
                  <Link href="/login" className="font-bold dark:text-white">
                    inicies tu sesión
                  </Link>{" "}
                  o{" "}
                  <Link href="/signup" className="font-bold dark:text-white">
                    crees una cuenta
                  </Link>
                  . Si detectas algún error, por favor crea una{" "}
                  <Link
                    href="https://github.com/Ktumsh/essentia/issues/new"
                    target="_blank"
                    className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
                  >
                    <span>&quot;Issue&quot;</span>
                    <LinkIcon />
                  </Link>{" "}
                  en nuestro{" "}
                  <Link
                    href="https://github.com/Ktumsh/essentia/issues/new"
                    target="_blank"
                    className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
                  >
                    <span>Github</span>
                    <LinkIcon />
                  </Link>{" "}
                  y la revisaremos. ¡Te agradecemos la visita!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  className="text-white bg-black/5 dark:bg-white/5 data-[hover=true]:bg-black/10 dark:data-[hover=true]:bg-white/10"
                >
                  Quizás más tarde
                </Button>
                <Button
                  as={Link}
                  href="/login"
                  color="danger"
                  onPress={onClose}
                  endContent={
                    <ArrowRightIcon className="size-4 motion-safe:group-data-[hover=true]:animate-[spinner-spin_0.8s_ease]" />
                  }
                  className="bg-light-gradient dark:bg-gradient-to-r from-cerise-red-600 to-cerise-red-800"
                >
                  Iniciar sesión
                </Button>
              </ModalFooter>
              <span className="grid place-content-center absolute inset-0 size-full z-[-1] opacity-10">
                <SettingsIcon className="size-[500px] text-base-color-d dark:text-base-color-dark-d motion-safe:animate-[spin_15s_linear_infinite]" />
              </span>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WelcomeModal;
