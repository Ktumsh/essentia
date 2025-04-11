"use client";

import { useEffect, useState } from "react";

import { SparklesButton } from "@/components/button-kit/sparkles-button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";

import PaymentModal from "./payment-modal";

interface WarningModalProps {
  isPremium: boolean | null;
  isPaymentModalOpen: boolean;
}

const WarningModal = ({ isPremium, isPaymentModalOpen }: WarningModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);

  useEffect(() => {
    if (!isPaymentModalOpen) {
      setIsOpen(true);
    }
  }, [isPaymentModalOpen, setIsOpen]);

  if (isPremium) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          isBlurred
          overlayClassName="bg-white/50 dark:bg-black/80"
          closeButton={false}
          className="before:bg-background max-w-sm! gap-0 rounded-3xl border-none bg-gradient-to-r from-indigo-500 to-pink-500 p-0 before:absolute before:inset-[2px] before:z-[-1] before:rounded-[23px] before:content-[''] sm:rounded-3xl"
        >
          <DialogHeader className="text-foreground flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 to-pink-500 p-3 text-center md:p-6">
            <DialogTitle className="font-merriweather text-2xl leading-normal font-extrabold tracking-widest text-white uppercase">
              Essentia Premium
            </DialogTitle>
          </DialogHeader>
          <div className="text-foreground flex flex-col gap-4 p-3 text-center text-sm md:p-6 md:text-base">
            <p>
              Para acceder a todas las funcionalidades de Essentia AI, es
              necesario tener un plan premium.
            </p>
            <p>
              Actualiza al plan Premium para obtener acceso a todas las
              funcionalidades de Essentia AI.
            </p>
          </div>
          <DialogFooter className="justify-center p-3 pt-0! md:p-6">
            <button aria-hidden className="sr-only"></button>
            <SparklesButton
              variant="gradient"
              onClick={() => {
                setIsOpen(false);
                setIsOpenPayment(true);
              }}
              className="h-12 w-full rounded-full text-base font-extrabold tracking-widest [&_svg]:size-5!"
            >
              Hazte premium
            </SparklesButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <PaymentModal
        featureType="chat"
        isOpen={isOpenPayment}
        setIsOpen={setIsOpenPayment}
      />
    </>
  );
};

export default WarningModal;
