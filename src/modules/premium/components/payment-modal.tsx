"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSteps } from "@/modules/chatbot/hooks/use-steps";
import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";
import { CopyIcon } from "@/modules/icons/action";
import { WarningCircledIcon } from "@/modules/icons/common";
import PaymentForm from "@/modules/payment/components/payment-form";
import StripeWrapper from "@/modules/payment/components/stripe-wrapper";
import { createSubscription } from "@/modules/payment/pay/actions";

interface PricingCardProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedPlan: string | null;
  title: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

const CARD_NUMBER = "4242 4242 4242 4242";

const PaymentModal = ({
  isOpen,
  setIsOpen,
  selectedPlan,
  title,
}: PricingCardProps) => {
  const isMobile = useIsMobile();
  const { currentStep, nextStep } = useSteps();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cardholderName, setCardholderName] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 });

  const handleProceedToPayment = useCallback(async () => {
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
  }, [cardholderName, nextStep, selectedPlan]);

  const handleCopy = useCallback(() => {
    copyToClipboard(CARD_NUMBER);
    toast.success("Tarjeta copiada");
  }, [copyToClipboard]);

  const Content = useCallback(() => {
    return (
      <>
        {currentStep === 0 ? (
          <>
            {isMobile ? (
              <DrawerHeader>
                <DrawerTitle>Seleccionaste el plan {title}</DrawerTitle>
                <DrawerDescription className="mt-4 px-4 text-start">
                  Para continuar con la suscripción, proporciona el nombre del
                  titular de la suscripción.
                </DrawerDescription>
              </DrawerHeader>
            ) : (
              <DialogHeader isSecondary>
                <DialogTitle>Mejora tu Plan</DialogTitle>
                <DialogDescription>
                  Para continuar con la suscripción, proporciona el nombre del
                  titular de la suscripción.
                </DialogDescription>
              </DialogHeader>
            )}{" "}
            <div className="p-4 md:p-6">
              <div className="mt-6 flex w-full flex-col space-y-2">
                <Label htmlFor="cardholderName">
                  Nombre del titular de la suscripción
                </Label>
                <Input
                  name="cardholderName"
                  type="text"
                  required
                  value={cardholderName}
                  placeholder="Ingresa el nombre del titular de la suscripción"
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </div>
            </div>
            {isMobile ? (
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="secondary">Cancelar</Button>
                </DrawerClose>
                <Button
                  variant="destructive"
                  onClick={handleProceedToPayment}
                  disabled={!selectedPlan || !cardholderName || isLoading}
                >
                  {isLoading && <Loader className="size-4 animate-spin" />}
                  {isLoading ? null : "Mejorar a " + title}
                </Button>
              </DrawerFooter>
            ) : (
              <DialogFooter isSecondary>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  disabled={!selectedPlan || !cardholderName || isLoading}
                  onClick={handleProceedToPayment}
                >
                  {isLoading && <Loader className="size-4 animate-spin" />}
                  {isLoading ? null : "Mejorar a " + title}
                </Button>
              </DialogFooter>
            )}
          </>
        ) : (
          <>
            {isMobile ? (
              <DrawerHeader>
                <DrawerTitle>Suscribirse a Premium</DrawerTitle>
                <DrawerDescription asChild>
                  <div className="mt-4 space-y-2 px-6 text-start">
                    <p>
                      No te preocupes, es un pago simulado, no se harán cargos
                      reales.
                    </p>
                    <p>
                      Puedes usar la tarjeta{" "}
                      <span className="font-semibold">{CARD_NUMBER}</span> para
                      realizar el proceso.
                    </p>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
            ) : (
              <DialogHeader isSecondary className="flex-row">
                <DialogTitle>Suscribirse a Premium</DialogTitle>
                <DialogDescription className="sr-only">
                  Suscribirse a Premium
                </DialogDescription>
                <Popover>
                  <PopoverTrigger className="!mt-0">
                    <Badge variant="destructive" className="ml-3 gap-1">
                      <WarningCircledIcon className="size-3.5" />
                      Pago simulado (presiona aquí)
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent className="space-y-1.5">
                    <p className="text-balance text-xs text-main-h dark:text-main-dark-h">
                      El pago es simulado y no se realizará ningún cargo real.
                      Usa la tarjeta de prueba{" "}
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
            )}
            {!selectedPlan || !cardholderName || !clientSecret ? (
              <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
                <Loader className="size-6" />
                <h3 className="text-sm text-main-m dark:text-main-dark-m">
                  Procesando
                </h3>
              </div>
            ) : (
              <StripeWrapper stripe={stripePromise} clientSecret={clientSecret}>
                <PaymentForm
                  onClose={setIsOpen}
                  cardholderName={cardholderName}
                  priceId={selectedPlan}
                />
              </StripeWrapper>
            )}
          </>
        )}
      </>
    );
  }, [
    cardholderName,
    clientSecret,
    isMobile,
    selectedPlan,
    title,
    handleCopy,
    handleProceedToPayment,
    currentStep,
    isLoading,
    setIsOpen,
  ]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <Content />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent isSecondary>
        <Content />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
