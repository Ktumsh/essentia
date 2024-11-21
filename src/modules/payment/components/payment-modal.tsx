"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BetterTooltip } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";
import { usePlan } from "@/modules/core/hooks/use-current-plan";
import { CopyIcon } from "@/modules/icons/action";
import { SpinnerIcon, WarningCircledIcon } from "@/modules/icons/common";
import { cn } from "@/utils/common";

import PaymentForm from "./payment-form";
import { PlanSelector } from "./plan-selector";
import StripeWrapper from "./stripe-wrapper";
import { useSteps } from "../../chatbot/hooks/use-steps";
import { createSubscription } from "../pay/actions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

const CARD_NUMBER = "4242 4242 4242 4242";

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PaymentModal = ({ isOpen, setIsOpen }: PaymentModalProps) => {
  const { currentPlan } = usePlan();
  const { currentStep, nextStep } = useSteps();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    currentPlan === siteConfig.planPrices.free
      ? siteConfig.planPrices.premium
      : null,
  );

  const [cardholderName, setCardholderName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 });

  const handlePlanSelect = (priceId: string) => {
    setSelectedPlan(priceId);
  };

  const handleProceedToPayment = async () => {
    if (selectedPlan === siteConfig.planPrices.free) {
      toast.error(
        "Para seleccionar un plan gratuito debes cancelar tu suscripción actual.",
      );
      return;
    }
    if (!selectedPlan || !cardholderName) {
      toast.error(
        "Selecciona un plan y proporciona el nombre del titular de la suscripción",
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
    } catch {
      toast.error("Hubo un error creando tu suscripción");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    copyToClipboard(CARD_NUMBER);
    toast.success("Tarjeta copiada");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        {currentStep === 0 ? (
          <>
            <DialogHeader className="space-y-1.5">
              <DialogTitle>Mejora tu Plan</DialogTitle>
              <DialogDescription>
                Actualiza al plan Premium para obtener acceso a todas las
                funcionalidades de Essentia AI.
              </DialogDescription>
            </DialogHeader>
            <PlanSelector onSelect={handlePlanSelect} />
            <div>
              <label
                htmlFor="cardholderName"
                className="text-sm text-main dark:text-main-dark"
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
                  "mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 p-3 pr-[26px] text-sm leading-none shadow-sm focus:outline-none dark:border-accent-dark dark:bg-dark",
                  "focus:border-[hsla(6,_93%,_71%,_50%)] focus:shadow-[0px_1px_1px_rgba(0,_0,_0,_0.03),_0px_3px_6px_rgba(0,_0,_0,_0.02),_0_0_0_3px_hsla(6,_93%,_71%,_25%),_0_1px_1px_0_rgba(0,_0,_0,_0.08)]",
                  "focus:dark:shadow-[0px_1px_1px_rgba(0,_0,_0,_0.03),_0px_3px_6px_rgba(0,_0,_0,_0.02),_0_0_0_3px_hsla(343,_58%,_50%,_25%),_0_1px_1px_0_rgba(255,_255,_255,_0.12))] focus:dark:border-[hsla(343,_58%,_50%,_50%)]",
                )}
              />
            </div>

            <DialogFooter>
              <Button onClick={() => setIsOpen(false)} variant="ghost">
                Cancelar
              </Button>
              <BetterTooltip
                content={
                  !selectedPlan && !cardholderName
                    ? "Selecciona un plan y proporciona un titular"
                    : !selectedPlan
                      ? "Selecciona un plan"
                      : !cardholderName
                        ? "Proporciona un titular"
                        : ""
                }
              >
                <Button
                  variant="destructive"
                  onClick={handleProceedToPayment}
                  disabled={!selectedPlan || !cardholderName || isLoading}
                >
                  {isLoading ? (
                    <SpinnerIcon className="size-4 animate-spin" />
                  ) : null}
                  {isLoading ? "Procesando..." : "Mejorar a Premium"}
                </Button>
              </BetterTooltip>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="flex-row">
              <DialogTitle>Suscribirse a Premium</DialogTitle>
              <Popover>
                <PopoverTrigger>
                  <Badge variant="destructive" className="ml-3">
                    <WarningCircledIcon className="size-4" />
                    Pago simulado (presiona aquí)
                  </Badge>
                </PopoverTrigger>
                <PopoverContent className="space-y-1.5">
                  <p className="text-balance text-xs text-main-h dark:text-main-dark-h">
                    El pago es simulado y no se realizará ningún cargo real. Usa
                    la tarjeta de prueba{" "}
                    <button
                      className="inline-flex items-center gap-1"
                      onClick={() => handleCopy()}
                    >
                      {CARD_NUMBER}
                      <CopyIcon className="!size-3" />
                    </button>{" "}
                    con{" "}
                    <strong className="text-main dark:text-main-dark">
                      CVC 123
                    </strong>{" "}
                    y una{" "}
                    <strong className="text-main dark:text-main-dark">
                      fecha de expiración futura
                    </strong>
                    .
                  </p>
                </PopoverContent>
              </Popover>
            </DialogHeader>
            <div>
              {!selectedPlan || !cardholderName || !clientSecret ? (
                <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
                  <SpinnerIcon className="size-6" />
                  <h3 className="text-sm text-main-m dark:text-main-dark-m">
                    Procesando
                  </h3>
                </div>
              ) : (
                <StripeWrapper
                  stripe={stripePromise}
                  clientSecret={clientSecret}
                >
                  <PaymentForm
                    onClose={setIsOpen}
                    cardholderName={cardholderName}
                    priceId={selectedPlan}
                  />
                </StripeWrapper>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
