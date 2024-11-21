"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { SpinnerIcon } from "@/modules/icons/common";
import { setUserPlan } from "@/modules/payment/pay/actions";
import ReasonCheckbox from "@/modules/premium/components/reason-checkbox";
import { Session } from "@/types/session";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  billingDetails: any;
}

const CancelSubscriptionModal = ({
  isOpen,
  setIsOpen,
  billingDetails,
}: CancelSubscriptionModalProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [cancelReason, setCancelReason] = useState<string>("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const subscription = billingDetails.subscription;
  const subscriptionItems = subscription.items.data[0].price;
  const planType = subscriptionItems.nickname ?? "N/A";

  const price = subscriptionItems.unit_amount.toLocaleString("es-CL");

  const renewalDate = format(
    new Date(subscription.current_period_end * 1000),
    "dd 'de' MMM, yyyy",
    { locale: es },
  );

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-6">
        <DialogHeader>
          <DialogTitle>¿Estás seguro que quieres cancelar?</DialogTitle>
          <DialogDescription className="sr-only">
            ¿Estás seguro que quieres cancelar?
          </DialogDescription>
        </DialogHeader>
        <div>
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
        </div>
        <div>
          <p className="text-sm text-main-h dark:text-main-dark-h">
            Tu plan permanecerá activo hasta el final de tu período de
            facturación actual, {renewalDate}. Después de esa fecha, tu plan
            cambiará a gratuito y perderás acceso a las funcionalidades Premium.
          </p>
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
              className="min-h-[60px] w-full resize-none p-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleSetFreePlan}
          >
            {isPending ? <SpinnerIcon className="size-4 animate-spin" /> : null}
            {isPending ? "Cancelando plan" : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionModal;
