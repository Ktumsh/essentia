"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { siteConfig } from "@/config/site";
import { usePlan } from "@/modules/core/hooks/use-current-plan";

import { PlanSelector } from "./plan-selector";
import { getPlanName } from "../lib/utils";
import { createSubscription } from "../pay/actions";

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PaymentModal = ({ isOpen, setIsOpen }: PaymentModalProps) => {
  const router = useRouter();
  const { currentPlan } = usePlan();
  const [selectedPlan, setSelectedPlan] = useState<string>(
    currentPlan === siteConfig.planPrices.free
      ? siteConfig.planPrices.premium
      : currentPlan || siteConfig.planPrices.free,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMobile = useIsMobile();

  const handleProceedToPayment = useCallback(async () => {
    if (selectedPlan === currentPlan) {
      toast.info("Ya tienes seleccionado tu plan actual.");
      return;
    }

    if (selectedPlan === siteConfig.planPrices.free) {
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
        priceId: selectedPlan,
      });
      router.push(subscriptionResponse.checkoutUrl);
    } catch {
      toast.error("Hubo un error creando tu suscripción");
      setIsLoading(false);
    }
  }, [selectedPlan, currentPlan, router]);

  const Content = useCallback(() => {
    return (
      <>
        {isMobile ? (
          <DrawerHeader>
            <DrawerTitle>Mejora tu Plan</DrawerTitle>
          </DrawerHeader>
        ) : (
          <DialogHeader isSecondary>
            <DialogTitle>Mejora tu Plan</DialogTitle>
            <DialogDescription>
              Actualiza al plan Premium para obtener acceso a todas las
              funcionalidades de Essentia AI.
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
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
            <Button
              variant="destructive"
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
                `Mejorar a ${getPlanName(selectedPlan)}`
              )}
            </Button>
          </DrawerFooter>
        ) : (
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              variant="destructive"
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
                `Mejorar a ${getPlanName(selectedPlan)}`
              )}
            </Button>
          </DialogFooter>
        )}
      </>
    );
  }, [selectedPlan, currentPlan, isLoading, handleProceedToPayment, isMobile]);

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
