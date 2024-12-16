"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("welcome");

    if (!hasShown) {
      setIsOpen(true);
      sessionStorage.setItem("welcome", "true");
    }
  }, [setIsOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          closeButton={false}
          overlayClassName="bg-white/50"
          isBlurred
          className="flex max-w-xs flex-col gap-0 !rounded-3xl p-0"
        >
          <>
            <DialogHeader className="items-center px-6 py-4">
              <div className="absolute -left-1/2 top-[-820px] -z-10 size-[900px] -translate-x-32 rounded-full border-4 border-gray-200 bg-light-gradient-v2 dark:border-dark dark:bg-dark-gradient"></div>
              <DialogTitle className="text-3xl font-bold text-white">
                ¡Bienvenido!
              </DialogTitle>
              <DialogDescription className="sr-only">
                Una alerta de bienvenida
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-1 flex-col gap-3 px-6 py-2 pt-6 text-center text-main dark:text-main-dark">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo-essentia.webp"
                  alt="Welcome"
                  width={40}
                  height={60}
                  className="w-10"
                />
              </div>
              <div className="prose-sm">
                <h2 className="font-bold">¿Es tu primera vez?</h2>
                <p>
                  <span className="font-semibold">Essentia</span> es tu
                  plataforma esencial de salud y bienestar 🌿
                </p>
                <p>
                  Nos alegra que nos acompañes. Aún estamos en desarrollo, así
                  que tu ayuda probando la web será muy valiosa para mejorarla.
                  ¡Gracias por tu apoyo!
                </p>
              </div>
            </div>
            <DialogFooter className="flex !flex-col justify-end gap-2 px-6 py-4 sm:space-x-0">
              <Link
                href="/login"
                className="inline-flex h-8 w-full items-center justify-center rounded-full bg-gray-100 px-3 text-sm font-medium dark:bg-dark/50"
              >
                Inicia sesión
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-8 w-full items-center justify-center rounded-full bg-light-gradient from-cerise-red-600 to-cerise-red-800 px-3 text-sm font-medium text-white dark:bg-gradient-to-r"
              >
                Crea una cuenta
              </Link>
            </DialogFooter>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WelcomeModal;
