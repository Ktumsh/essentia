"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { createSubscription } from "@/components/ui/payment/actions";
import { useIsMobile } from "@/hooks/use-mobile";
import { getPlanPrice } from "@/lib/utils";

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
        priceId: getPlanPrice(selectedPlan),
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

  const description = useMemo(() => {
    if (isUserPremium) {
      return (
        <>
          Al <span className="font-semibold text-green-500">continuar</span>, tu
          plan se actualizará a {title} junto con todos sus beneficios.
        </>
      );
    } else {
      return (
        <>
          Al <span className="font-semibold text-green-500">continuar</span>, tu
          plan se actualizará a{" "}
          <span className="font-semibold text-green-500">{title}</span> y
          obtendrás acceso a todas las funcionalidades de Essentia AI.
        </>
      );
    }
  }, [isUserPremium, title]);

  const Content = useCallback(() => {
    return (
      <>
        {isMobile ? (
          <>
            <DrawerHeader>
              <DrawerTitle>{modalTitle}</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription className="mt-4 px-4 text-start">
              {description}
            </DrawerDescription>
          </>
        ) : (
          <DialogHeader isSecondary className="pb-6!">
            <BadgeAlert variant="success" />
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}

        {isMobile ? (
          <DrawerFooter>
            <Button
              variant="mobile-danger"
              radius="full"
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
              radius="full"
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
  }, [isLoading, handleProceedToPayment, isMobile, modalTitle, description]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="min-h-[40%]">
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
