"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";

import PaymentModal from "./payment-modal";
import { StarsIcon } from "../icons/common";

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
          className="from-gradient-from via-gradient-via to-gradient-to before:bg-background max-w-sm! gap-0 rounded-3xl border-none bg-gradient-to-r p-0 before:absolute before:inset-[2px] before:z-[-1] before:rounded-[23px] before:content-[''] sm:rounded-3xl dark:from-[-100%]"
        >
          <DialogHeader className="from-gradient-from via-gradient-via to-gradient-to text-foreground flex-col items-center justify-center rounded-3xl bg-gradient-to-r p-3 text-center md:p-6 dark:from-[-100%]">
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
            <Button
              radius="full"
              fullWidth
              onClick={() => {
                setIsOpen(false);
                setIsOpenPayment(true);
              }}
              className="group from-gradient-from via-gradient-via to-gradient-to before:bg-background relative z-0 h-12 gap-3 bg-gradient-to-r px-6 shadow-none transition! before:absolute before:inset-[2px] before:z-[-1] before:rounded-full before:transition before:content-[''] hover:scale-105 hover:shadow-lg hover:saturate-200 hover:before:opacity-0 dark:from-[-100%]"
            >
              <StarsIcon
                aria-hidden="true"
                className="stars-icon size-5! **:transition-all! group-hover:**:fill-white! focus:outline-hidden"
              />
              <span className="from-gradient-from via-gradient-via to-gradient-to bg-gradient-to-r bg-clip-text text-base font-extrabold tracking-widest text-transparent transition-colors group-hover:text-white dark:from-[-100%]">
                Hazte premium
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
    </>
  );
};

export default WarningModal;
