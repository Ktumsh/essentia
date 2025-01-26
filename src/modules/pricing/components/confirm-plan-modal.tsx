"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { createSubscription } from "@/modules/payment/pay/actions";

interface ConfirmPlanModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedPlan: string | null;
  title: string;
  isUserPremium: boolean | null;
}

const ConfirmPlanModal = ({
  isOpen,
  setIsOpen,
  selectedPlan,
  title,
  isUserPremium,
}: ConfirmPlanModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const handleProceedToPayment = useCallback(async () => {
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
  }, [selectedPlan, router]);

  const modalTitle = useMemo(() => {
    return isUserPremium ? `Cambiar a ${title}` : `Mejorar a ${title}`;
  }, [isUserPremium, title]);

  const Description = useCallback(() => {
    if (isUserPremium) {
      return (
        <>
          Al <span className="font-semibold">continuar</span>, tu plan se
          actualizará a {title} junto con todos sus beneficios.
        </>
      );
    } else {
      return (
        <>
          Al <span className="font-semibold">continuar</span>, tu plan se
          actualizará a {title} y obtendrás acceso a todas las funcionalidades
          de Essentia AI.
        </>
      );
    }
  }, [isUserPremium, title]);

  const Content = useCallback(() => {
    return (
      <>
        {isMobile ? (
          <DrawerHeader>
            <DrawerTitle>{modalTitle}</DrawerTitle>
            <DrawerDescription className="mt-4 px-4 text-start">
              <Description />
            </DrawerDescription>
          </DrawerHeader>
        ) : (
          <DialogHeader isSecondary className="pb-6!">
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              <Description />
            </DialogDescription>
          </DialogHeader>
        )}

        {isMobile ? (
          <DrawerFooter>
            <Button
              variant="destructive"
              onClick={handleProceedToPayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Continuar"
              )}
            </Button>
          </DrawerFooter>
        ) : (
          <DialogFooter isSecondary>
            <Button
              variant="destructive"
              onClick={handleProceedToPayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Continuar"
              )}
            </Button>
          </DialogFooter>
        )}
      </>
    );
  }, [isLoading, handleProceedToPayment, isMobile, modalTitle, Description]);

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

export default ConfirmPlanModal;
