"use client";

import { loadStripe } from "@stripe/stripe-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="space-y-1.5">
          <DialogTitle>Cambiar método de pago</DialogTitle>
          <DialogDescription className="sr-only">
            Cambiar método de pago
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};

export default ChangePaymentModal;
