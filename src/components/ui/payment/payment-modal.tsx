"use client";

import { ChevronsDown, ChevronsUp, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { siteConfig } from "@/config/site.config";
import { usePlan } from "@/hooks/use-current-plan";
import { useIsMobile } from "@/hooks/use-mobile";
import { getPlanName, getPlanPrice } from "@/lib/utils";

import { createSubscription } from "./actions";
import { PlanSelector } from "./plan-selector";

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PaymentModal = ({ isOpen, setIsOpen }: PaymentModalProps) => {
  const router = useRouter();
  const { currentPlan } = usePlan();

  const [selectedPlan, setSelectedPlan] = useState<string>(
    currentPlan === siteConfig.plan.free
      ? siteConfig.plan.premium
      : currentPlan || siteConfig.plan.free,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMobile = useIsMobile();

  const isFree = selectedPlan === siteConfig.plan.free;

  const handleProceedToPayment = useCallback(async () => {
    if (selectedPlan === currentPlan) {
      toast.info("Ya tienes seleccionado tu plan actual.");
      return;
    }

    if (isFree) {
      toast.error(
        "Para seleccionar un plan gratuito debes cancelar tu suscripción actual.",
      );
      return;
    }

    if (!selectedPlan) {
      toast.error("Selecciona un plan");
      return;
    }

    setIsLoading(true);
    try {
      const subscriptionResponse = await createSubscription({
        priceId: getPlanPrice(selectedPlan),
      });
      router.push(subscriptionResponse.checkoutUrl);
    } catch {
      toast.error("Hubo un error creando tu suscripción");
      setIsLoading(false);
    }
  }, [selectedPlan, currentPlan, router, isFree]);

  const Content = useCallback(() => {
    return (
      <>
        {isMobile ? (
          <>
            <DrawerHeader>
              <DrawerTitle>Mejora tu Plan</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription className="mt-4 space-y-1.5 px-4 text-center text-sm">
              Actualiza al plan Premium para{" "}
              <span className="font-semibold text-green-500">
                obtener acceso a todas las funcionalidades
              </span>{" "}
              de Essentia AI.
            </DrawerDescription>
          </>
        ) : (
          <DialogHeader isSecondary>
            <BadgeAlert variant="success" />
            <DialogTitle>Mejora tu Plan</DialogTitle>
            <DialogDescription>
              Actualiza al plan Premium para{" "}
              <span className="font-semibold text-green-500">
                obtener acceso a todas las funcionalidades
              </span>{" "}
              de Essentia AI.
            </DialogDescription>
          </DialogHeader>
        )}
        <div className="p-4 md:p-6">
          <PlanSelector
            onSelect={setSelectedPlan}
            selectedPlanId={selectedPlan}
          />
        </div>

        {isMobile ? (
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button variant="mobile" className="justify-center">
                  Cancelar
                </Button>
              </DrawerClose>
            </div>
            <Button
              variant="mobile-danger"
              onClick={handleProceedToPayment}
              disabled={
                !selectedPlan || isLoading || selectedPlan === currentPlan
              }
            >
              {isLoading ? (
                <Loader className="size-4 animate-spin" />
              ) : selectedPlan === currentPlan ? (
                "Plan Actual"
              ) : (
                <>
                  {isFree ? <ChevronsDown /> : <ChevronsUp />}
                  {isFree ? "Degradar a" : "Mejorar a"}{" "}
                  {getPlanName(selectedPlan)}
                </>
              )}
            </Button>
          </DrawerFooter>
        ) : (
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline" radius="full">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              radius="full"
              onClick={handleProceedToPayment}
              disabled={
                !selectedPlan || isLoading || selectedPlan === currentPlan
              }
            >
              {isLoading ? (
                <Loader className="size-4 animate-spin" />
              ) : selectedPlan === currentPlan ? (
                "Plan Actual"
              ) : (
                <>
                  {isFree ? "Degradar a" : "Mejorar a"}{" "}
                  {getPlanName(selectedPlan)}
                  {isFree ? <ChevronsDown /> : <ChevronsUp />}
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </>
    );
  }, [
    selectedPlan,
    currentPlan,
    isLoading,
    handleProceedToPayment,
    isMobile,
    isFree,
  ]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="min-h-[60%]">
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
