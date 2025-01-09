"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LinkIcon } from "@/modules/icons/action";

const WelcomeModal = () => {
  const router = useRouter();
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
                ¡Bienvenid@!
              </DialogTitle>
              <DialogDescription className="sr-only">
                Un mensaje de bienvenida
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-1 flex-col gap-3 px-6 py-2 pt-6 text-center text-main dark:text-main-dark">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo-essentia.webp"
                  alt="Welcome"
                  width={40}
                  height={40}
                />
              </div>
              <div className="prose-sm">
                <h2 className="font-bold">¿Es tu primera vez?</h2>
                <p>
                  <span className="font-semibold">Essentia</span> es tu
                  plataforma esencial de salud y bienestar 🌿
                </p>
                <Link
                  href="/about"
                  target="_blank"
                  className="inline-flex flex-1 justify-center gap-1 leading-4 text-blue-600 hover:underline"
                >
                  <span className="font-semibold">Descubre Essentia</span>
                  <LinkIcon />
                </Link>
                <p>
                  Aún estamos en desarrollo, así que tu ayuda probando la web
                  será muy valiosa para mejorarla. ¡Gracias por tu apoyo!
                </p>
              </div>
            </div>
            <DialogFooter className="flex !flex-col justify-end gap-2 px-6 py-4 sm:space-x-0">
              <button aria-hidden="true" className="sr-only"></button>
              <Button
                radius="full"
                variant="outline"
                onClick={() => router.push("/login")}
              >
                Inicia sesión
              </Button>
              <Button
                radius="full"
                variant="alternative"
                className="text-sm"
                onClick={() => router.push("/signup")}
              >
                Crea una cuenta
              </Button>
            </DialogFooter>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WelcomeModal;
