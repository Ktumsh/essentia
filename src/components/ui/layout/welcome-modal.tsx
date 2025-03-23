"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";

import { LinkIcon } from "../icons/action";

const WelcomeModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sessionKey = "usrWlcShwn";

    const hasShown = sessionStorage.getItem(sessionKey);

    if (!hasShown) {
      setIsOpen(true);
      sessionStorage.setItem(sessionKey, "true");
    }
  }, [setIsOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          closeButton={false}
          overlayClassName="bg-white/50"
          isBlurred
          className="flex max-w-sm! flex-col gap-0 rounded-3xl! p-0"
        >
          <>
            <DialogHeader className="items-center px-6 py-4">
              <div className="border-border from-gradient-from via-gradient-via to-gradient-to absolute top-[-820px] left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full border-4 bg-gradient-to-r"></div>
              <DialogTitle className="font-merriweather text-3xl font-bold text-white">
                ¡Bienvenid@!
              </DialogTitle>
              <DialogDescription className="sr-only">
                Un mensaje de bienvenida
              </DialogDescription>
            </DialogHeader>
            <div className="text-foreground flex flex-1 flex-col gap-3 px-6 py-2 pt-6 text-center">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo-essentia.webp"
                  alt="Welcome"
                  width={40}
                  height={40}
                />
              </div>
              <div className="prose-sm">
                <h2 className="font-merriweather font-bold">
                  ¿Es tu primera vez?
                </h2>
                <p>
                  <span className="font-semibold">Essentia</span> es tu
                  plataforma esencial de salud y bienestar 🌿
                </p>
                <Link
                  href="/about"
                  target="_blank"
                  className="inline-flex flex-1 justify-center gap-1 leading-4 text-blue-500 hover:underline"
                >
                  <span className="font-semibold">Descubre Essentia</span>
                  <LinkIcon />
                </Link>
              </div>
            </div>
            <DialogFooter className="flex flex-col! justify-end gap-2 px-6 py-4 sm:space-x-0">
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
