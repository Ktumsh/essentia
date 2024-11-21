"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SpinnerIcon } from "@/modules/icons/common";
import PaymentMethodForm from "@/modules/payment/components/payment-method-form";
import StripeWrapper from "@/modules/payment/components/stripe-wrapper";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface ChangePaymentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  paymentMethod: string;
  clientSecret: string;
}

const ChangePaymentModal = ({
  isOpen,
  setIsOpen,
  paymentMethod,
  clientSecret,
}: ChangePaymentModalProps) => {
  const isMobile = useIsMobile();

  const Content = useCallback(() => {
    return (
      <>
        {!clientSecret || !stripePromise ? (
          <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
            <SpinnerIcon className="size-6 animate-spin" />
            <h3 className="text-sm text-main-m dark:text-main-dark-m">
              Procesando
            </h3>
          </div>
        ) : (
          <StripeWrapper stripe={stripePromise} clientSecret={clientSecret}>
            <PaymentMethodForm customerId={paymentMethod} onClose={setIsOpen} />
          </StripeWrapper>
        )}
      </>
    );
  }, [clientSecret, paymentMethod, setIsOpen]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cambiar método de pago</DrawerTitle>
          </DrawerHeader>
          <Content />
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary>
            <DialogTitle>Cambiar método de pago</DialogTitle>
            <DialogDescription className="sr-only">
              Cambiar método de pago
            </DialogDescription>
          </DialogHeader>
          <Content />
        </DialogContent>
      </Dialog>
    );
  }
};

export default ChangePaymentModal;
