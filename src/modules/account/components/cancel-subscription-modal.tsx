"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useState, useTransition } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { Payment, Subscription } from "@/db/schema";
import { setUserPlan } from "@/modules/payment/pay/actions";
import ReasonCheckbox from "@/modules/premium/components/reason-checkbox";
import { formatDate } from "@/utils/format";

import { getPlanType } from "../lib/utils";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  billingDetails: Payment;
  subscription: Subscription;
}

const CancelSubscriptionModal = ({
  isOpen,
  setIsOpen,
  billingDetails,
  subscription,
}: CancelSubscriptionModalProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [cancelReason, setCancelReason] = useState<string>("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const { amount } = billingDetails;
  const { type, expiresAt } = subscription;

  const isMobile = useIsMobile();

  const planType = getPlanType(type!);

  const price = amount?.toLocaleString("es-CL");

  const renewalDate = formatDate(expiresAt!, "dd 'de' MMM, yyyy");

  const handleSetFreePlan = async () => {
    const combinedReasons = [...selectedReasons, cancelReason]
      .filter(Boolean)
      .join(". ");
    try {
      startTransition(async () => {
        const result = await setUserPlan(
          session as Session,
          siteConfig.planPrices.free,
          combinedReasons,
        );

        if (result.success) {
          toast.success(result.message);
          router.refresh();
          setIsOpen(false);
        } else {
          toast.error("Hubo un error al actualizar tu plan.");
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al actualizar tu plan.");
    }
  };

  const Content = useCallback(() => {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex w-full justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-dark dark:bg-dark/50">
          <span>
            <span className="text-sm font-medium text-main dark:text-main-dark">
              Plan {planType}
            </span>
            <span>
              {" "}
              - ${price}/{planType === "Premium Plus" ? "año" : "mes"}
            </span>
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-4 text-main dark:text-main-dark">
          <Separator />
          <p className="text-sm">Nos gustaría saber por qué cancelas.</p>
          <ReasonCheckbox
            selectedReasons={selectedReasons}
            onChange={setSelectedReasons}
          />
          <Textarea
            placeholder="Comparte con nosotros cómo podemos mejorar."
            onChange={(event) => setCancelReason(event.target.value)}
            className="min-h-20 w-full resize-none"
          />
        </div>
      </div>
    );
  }, [planType, price, selectedReasons]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cancelar suscripción</DrawerTitle>
            <DrawerDescription className="mt-4 px-4 text-start">
              Tu plan permanecerá activo hasta el final de tu período de
              facturación actual, {renewalDate}. Después de esa fecha, tu plan
              cambiará a gratuito y perderás acceso a las funcionalidades
              Premium.
            </DrawerDescription>
          </DrawerHeader>
          <Content />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleSetFreePlan}
            >
              {isPending && <Loader className="size-4 animate-spin" />}
              {isPending ? "Cancelando plan" : "Confirmar"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary>
          <DialogTitle>Cancelar suscripción</DialogTitle>
          <DialogDescription>
            Tu plan permanecerá activo hasta el final de tu período de
            facturación actual, {renewalDate}. Después de esa fecha, tu plan
            cambiará a gratuito y perderás acceso a las funcionalidades Premium.
          </DialogDescription>
        </DialogHeader>
        <Content />
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleSetFreePlan}
          >
            {isPending && <Loader className="size-4 animate-spin" />}
            {isPending ? "Cancelando plan" : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionModal;
