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
}

const ConfirmPlanModal = ({
  isOpen,
  setIsOpen,
  selectedPlan,
  title,
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

  const Content = useCallback(() => {
    return (
      <>
        {isMobile ? (
          <DrawerHeader>
            <DrawerTitle>Mejora tu Plan</DrawerTitle>
            <DrawerDescription className="mt-4 px-4 text-start">
              Actualiza al plan {title} para obtener acceso a todas las
              funcionalidades de Essentia AI.
            </DrawerDescription>
          </DrawerHeader>
        ) : (
          <DialogHeader isSecondary>
            <DialogTitle>Mejora tu Plan</DialogTitle>
            <DialogDescription>
              Actualiza al plan {title} para obtener acceso a todas las
              funcionalidades de Essentia AI.
            </DialogDescription>
          </DialogHeader>
        )}
        <div className="p-4 md:p-6">
          <p className="mt-3 text-sm text-main-h dark:text-main-dark-h">
            Confirma para proceder con la actualización a {title}.
          </p>
        </div>

        {isMobile ? (
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DrawerClose>
            <Button
              variant="destructive"
              onClick={handleProceedToPayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                `Mejorar a ${title}`
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
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                `Mejorar a ${title}`
              )}
            </Button>
          </DialogFooter>
        )}
      </>
    );
  }, [title, isLoading, handleProceedToPayment, isMobile]);

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
