"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";

import { SpinnerIcon } from "@/modules/icons/common";
import PaymentMethodForm from "@/modules/payment/components/payment-method-form";
import StripeWrapper from "@/modules/payment/components/stripe-wrapper";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface ChangePaymentModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  paymentMethod: string;
  clientSecret: string;
}

const ChangePaymentModal = ({
  isOpen,
  onOpenChange,
  paymentMethod,
  clientSecret,
}: ChangePaymentModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="sm"
      placement="center"
      classNames={{
        backdrop: "z-[101] bg-black/80",
        wrapper: "z-[102] pointer-events-auto",
        base: "bg-white dark:bg-full-dark min-h-[381px] md:min-h-[429px]",
        closeButton:
          "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="p-3 md:p-6 items-center">
              <div className="flex-col">
                <h2 className="text-lg font-semibold md:text-xl text-main dark:text-white">
                  Cambiar método de pago
                </h2>
              </div>
            </ModalHeader>
            <ModalBody className="!pt-0 p-3 md:p-6">
              {!clientSecret || !stripePromise ? (
                <div className="flex flex-col flex-1 justify-center items-center h-full gap-2">
                  <SpinnerIcon className="size-6 animate-spin" />
                  <h3 className="text-sm text-main-m dark:text-main-dark-m">
                    Procesando
                  </h3>
                </div>
              ) : (
                <StripeWrapper
                  stripe={stripePromise}
                  clientSecret={clientSecret}
                >
                  <PaymentMethodForm
                    customerId={paymentMethod}
                    onClose={onClose}
                  />
                </StripeWrapper>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ChangePaymentModal;
