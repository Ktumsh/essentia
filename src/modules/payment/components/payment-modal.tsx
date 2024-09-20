"use client";

import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useSteps } from "../../chatbot/hooks/use-steps";
import { PlanSelector } from "./plan-selector";
import StripeWrapper from "./stripe-wrapper";
import { PaymentForm } from "./payment-form";
import { useEffect, useState } from "react";
import { SpinnerIcon } from "@/modules/icons/status";
import { useSession } from "next-auth/react";

const PaymentModal = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const { currentStep, nextStep } = useSteps();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (status === "loading") return;

      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/payment/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 5000 }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error al crear el PaymentIntent:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [session, status]);

  return (
    <ModalContent>
      {(onClose) => (
        <>
          {currentStep === 0 ? (
            <>
              <ModalHeader className="p-3 md:p-6">
                <div className="flex-col">
                  <h2 className="text-lg font-semibold md:text-xl text-base-color dark:text-white">
                    Mejora tu Plan
                  </h2>
                  <p className="font-normal text-sm text-base-color-h dark:text-base-color-dark-h">
                    Actualiza al plan Premium para obtener acceso a todas las
                    funcionalidades de Essentia AI.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody className="!pt-0 p-3 md:p-6">
                <PlanSelector />
              </ModalBody>

              <ModalFooter className="!pt-0 p-3 md:p-6 justify-between md:justify-end">
                <Button
                  onPress={onOpenChange}
                  variant="light"
                  className="rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-dark"
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={nextStep}
                  className="rounded-md"
                >
                  Mejorar a premium
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader className="p-3 md:p-6">
                <h2 className="text-lg font-semibold md:text-xl text-base-color dark:text-white">
                  Suscribirse a Premium
                </h2>
              </ModalHeader>
              <ModalBody className="!pt-0 p-3 md:p-6">
                {isLoading ? (
                  <div className="flex flex-col flex-1 justify-center items-center h-full gap-2">
                    <SpinnerIcon className="size-6" />
                    <h3 className="text-sm text-base-color-m dark:text-base-color-dark-m">
                      Procesando
                    </h3>
                  </div>
                ) : (
                  clientSecret && (
                    <StripeWrapper clientSecret={clientSecret}>
                      <PaymentForm onClose={onClose} />
                    </StripeWrapper>
                  )
                )}
              </ModalBody>
            </>
          )}
        </>
      )}
    </ModalContent>
  );
};

export default PaymentModal;
