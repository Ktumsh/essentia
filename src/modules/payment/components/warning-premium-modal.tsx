"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarsIcon } from "@/modules/icons/common";

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
          className="max-w-sm gap-0 rounded-3xl border-none bg-light-gradient-v2 p-0 before:absolute before:inset-[2px] before:z-[-1] before:rounded-[23px] before:bg-white before:content-[''] dark:bg-dark-gradient-v2 before:dark:bg-full-dark sm:rounded-3xl"
        >
          <DialogHeader className="flex-col items-center justify-center rounded-3xl bg-light-gradient-v2 p-3 text-center text-main dark:bg-dark-gradient-v2 dark:text-white md:p-6">
            <DialogTitle className="font-sans text-2xl font-extrabold uppercase leading-normal tracking-widest text-white">
              Essentia Premium
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 p-3 text-center text-main dark:text-main-dark md:p-6">
            <p className="font-medium">
              Para acceder a todas las funcionalidades de Essentia AI, es
              necesario tener un plan premium.
            </p>
            <p className="text-sm text-main-h dark:text-main-dark-h">
              Actualiza al plan Premium para obtener acceso a todas las
              funcionalidades de Essentia AI.
            </p>
          </div>
          <DialogFooter className="justify-center p-3 !pt-0 md:p-6">
            <Button
              radius="full"
              fullWidth
              onClick={() => {
                setIsOpen(false);
                setIsOpenPayment(true);
              }}
              className="hover :shadow-lg group h-12 gap-3 bg-light-gradient-v2 px-6 shadow-none !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-full before:bg-white before:transition before:content-[''] hover:scale-105 hover:saturate-200 hover:before:opacity-0 dark:bg-dark-gradient-v2 before:dark:bg-full-dark"
            >
              <StarsIcon
                aria-hidden="true"
                className="stars-icon !size-5 focus:outline-none [&_*]:transition [&_*]:group-hover:fill-white"
              />
              <span className="bg-light-gradient-v2 bg-clip-text text-base font-extrabold tracking-widest text-transparent transition-colors group-hover:text-white dark:bg-dark-gradient-v2">
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
