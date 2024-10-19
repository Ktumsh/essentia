"use client";

import { tooltipStyles } from "@/styles/tooltip-styles";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Popover,
  PopoverTrigger,
  Chip,
  PopoverContent,
  Snippet,
} from "@nextui-org/react";
import { cn } from "@/utils/common";

import StripeWrapper from "@/modules/payment/components/stripe-wrapper";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { useSteps } from "@/modules/chatbot/hooks/use-steps";
import { useState } from "react";
import { SpinnerIcon, WarningCircledIcon } from "@/modules/icons/common";
import PaymentForm from "@/modules/payment/components/payment-form";
import { createSubscription } from "@/modules/payment/pay/actions";
import { CopyIcon } from "@/modules/icons/action";

interface PricingCardProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedPlan: string | null;
  title: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const PaymentModal = ({
  isOpen,
  onOpenChange,
  selectedPlan,
  title,
}: PricingCardProps) => {
  const { currentStep, nextStep } = useSteps();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cardholderName, setCardholderName] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleProceedToPayment = async () => {
    if (!selectedPlan || !cardholderName) {
      toast.error(
        "Selecciona un plan y proporciona el nombre del titular de la suscripción"
      );
      return;
    }
    setIsLoading(true);
    try {
      const subscriptionResponse = await createSubscription({
        cardholderName,
        priceId: selectedPlan,
        paymentMethodId: "",
      });
      setClientSecret(subscriptionResponse.clientSecret);
      nextStep();
    } catch (err: any) {
      toast.error("Hubo un error creando tu suscripción");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      size="lg"
      radius="sm"
      placement="center"
      classNames={{
        backdrop: "z-[101] bg-black/80",
        wrapper: "z-[102] pointer-events-auto",
        base: [
          "bg-white dark:bg-base-full-dark",
          currentStep === 1 && "min-h-[485px] md:min-h-[505px]",
        ],
        closeButton:
          "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {currentStep === 0 ? (
              <>
                <ModalHeader className="p-3 md:p-6">
                  <div className="flex-col">
                    <h2 className="text-lg font-semibold md:text-xl text-base-color dark:text-white">
                      Seleccionaste el plan {title}
                    </h2>
                    <p className="font-normal text-sm text-base-color-h dark:text-base-color-dark-h">
                      Para continuar con la suscripción, proporciona el nombre
                      del titular de la suscripción.
                    </p>
                  </div>
                </ModalHeader>
                <ModalBody className="!pt-0 p-3 md:p-6">
                  <div>
                    <label
                      htmlFor="cardholderName"
                      className="text-sm text-base-color dark:text-base-color-dark"
                    >
                      Nombre del titular de la suscripción
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      required
                      value={cardholderName}
                      placeholder="Ingresa el nombre del titular de la suscripción"
                      onChange={(e) => setCardholderName(e.target.value)}
                      className={cn(
                        "mt-1 block w-full p-3 pr-[26px] text-sm leading-none bg-gray-100 dark:bg-base-dark border border-gray-300 dark:border-[#123a6f] rounded-md shadow-sm focus:outline-none",
                        "focus:border-[hsla(6,_93%,_71%,_50%)] focus:shadow-[0px_1px_1px_rgba(0,_0,_0,_0.03),_0px_3px_6px_rgba(0,_0,_0,_0.02),_0_0_0_3px_hsla(6,_93%,_71%,_25%),_0_1px_1px_0_rgba(0,_0,_0,_0.08)]",
                        "focus:dark:border-[hsla(343,_58%,_50%,_50%)] focus:dark:shadow-[0px_1px_1px_rgba(0,_0,_0,_0.03),_0px_3px_6px_rgba(0,_0,_0,_0.02),_0_0_0_3px_hsla(343,_58%,_50%,_25%),_0_1px_1px_0_rgba(255,_255,_255,_0.12))]"
                      )}
                    />
                  </div>
                </ModalBody>

                <ModalFooter className="!pt-0 p-3 md:p-6 justify-between md:justify-end">
                  <Button
                    onPress={onClose}
                    variant="light"
                    className="rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-dark"
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="danger"
                    onPress={handleProceedToPayment}
                    className="rounded-md"
                    isDisabled={!selectedPlan || !cardholderName || isLoading}
                    startContent={
                      isLoading ? (
                        <SpinnerIcon className="size-4 animate-spin" />
                      ) : null
                    }
                  >
                    {isLoading ? "Procesando..." : "Mejorar a Premium"}
                  </Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalHeader className="p-3 md:p-6 items-center">
                  <h2 className="text-lg font-semibold md:text-xl text-base-color dark:text-white">
                    Suscribirse a Premium
                  </h2>
                  <Popover
                    backdrop="blur"
                    placement="top"
                    classNames={{
                      base: ["max-w-96", tooltipStyles.arrow],
                      content: ["items-start", tooltipStyles.content],
                    }}
                  >
                    <PopoverTrigger>
                      <Chip
                        as="button"
                        variant="flat"
                        color="danger"
                        size="sm"
                        startContent={<WarningCircledIcon className="size-4" />}
                        className="ml-3 appearance-none"
                      >
                        Pago simulado (haz clic)
                      </Chip>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold dark:text-base-color-dark">
                          Pago simulado
                        </div>
                        <div className="text-xs text-base-color-h dark:text-base-color-dark-h">
                          El pago es simulado y no se realizará ningún cargo
                          real. Usa la tarjeta de prueba{" "}
                          <Snippet
                            size="sm"
                            hideSymbol
                            copyIcon={<CopyIcon />}
                            tooltipProps={{
                              content: "Copiar",
                              classNames: {
                                content: tooltipStyles.content,
                              },
                            }}
                            classNames={{
                              base: "bg-gray-100 dark:bg-base-full-dark",
                              copyButton:
                                "!size-4 min-w-0 [&_svg]:size-3 [&_svg]:text-base-color-m dark:[&_svg]:text-base-color-dark-m",
                            }}
                          >
                            4242 4242 4242 4242
                          </Snippet>{" "}
                          con{" "}
                          <strong className="text-base-color dark:text-base-color-dark">
                            CVC 123
                          </strong>{" "}
                          y una{" "}
                          <strong className="text-base-color dark:text-base-color-dark">
                            fecha de expiración futura
                          </strong>
                          .
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </ModalHeader>
                <ModalBody className="!pt-0 p-3 md:p-6">
                  {!selectedPlan || !cardholderName || !clientSecret ? (
                    <div className="flex flex-col flex-1 justify-center items-center h-full gap-2">
                      <SpinnerIcon className="size-6" />
                      <h3 className="text-sm text-base-color-m dark:text-base-color-dark-m">
                        Procesando
                      </h3>
                    </div>
                  ) : (
                    <StripeWrapper
                      stripe={stripePromise}
                      clientSecret={clientSecret}
                    >
                      <PaymentForm
                        onClose={onClose}
                        cardholderName={cardholderName}
                        priceId={selectedPlan}
                      />
                    </StripeWrapper>
                  )}
                </ModalBody>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
