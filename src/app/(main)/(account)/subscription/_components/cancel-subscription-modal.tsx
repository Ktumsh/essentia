"use client";

import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import ReasonCheckbox from "@/app/(public)/planes/_components/reason-checkbox";
import { setUserPlan } from "@/app/payment/actions";
import { BadgeAlert } from "@/components/ui/badge-alert";
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
import { siteConfig } from "@/config/site.config";
import { Payment, Subscription } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "@/utils";

import { getPlanType } from "../../_lib/utils";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  payment: Payment | null;
  subscription: Subscription | null;
}

const CancelSubscriptionModal = ({
  isOpen,
  setIsOpen,
  payment,
  subscription,
}: CancelSubscriptionModalProps) => {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [cancelReason, setCancelReason] = useState<string>("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { amount } = payment || {};
  const { type, expiresAt } = subscription || {};

  const isMobile = useIsMobile();

  const planType = getPlanType(type!);

  const price = amount?.toLocaleString("es-CL");

  const renewalDate = formatDate(expiresAt!, "dd 'de' MMM, yyyy");

  const handleSetFreePlan = async () => {
    const combinedReasons = [...selectedReasons, cancelReason]
      .filter(Boolean)
      .join(". ");

    if (!combinedReasons) {
      setError("Debes seleccionar al menos una razón.");
      return;
    }
    try {
      startTransition(async () => {
        const result = await setUserPlan(
          session,
          siteConfig.plan.free,
          combinedReasons,
        );

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
        window.location.reload();
        setIsOpen(false);
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al actualizar tu plan.");
    }
  };

  const Content = useCallback(() => {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="border-border dark:bg-accent/50 flex w-full justify-between rounded-lg border bg-slate-50 p-4">
          <span>
            <span className="text-foreground text-sm font-medium">
              Plan {planType}
            </span>
            <span>
              {" "}
              - ${price}/{planType === "Premium Plus" ? "año" : "mes"}
            </span>
          </span>
        </div>
        <form className="text-foreground mt-4 flex flex-col gap-4">
          <Separator />
          <p className="text-sm">Nos gustaría saber por qué cancelas.</p>
          <ReasonCheckbox
            selectedReasons={selectedReasons}
            onChange={setSelectedReasons}
            setError={setError}
          />
          <Textarea
            placeholder="Comparte con nosotros cómo podemos mejorar."
            onChange={(event) => setCancelReason(event.target.value)}
            className="min-h-20 w-full resize-none"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>
    );
  }, [planType, price, selectedReasons, error]);

  const description = useMemo(() => {
    return (
      <p>
        Tu plan permanecerá activo hasta el final de tu período de facturación
        actual,{" "}
        <span className="font-semibold text-amber-500">{renewalDate}</span>.
        Después de esa fecha, tu plan cambiará a gratuito y{" "}
        <span className="font-semibold text-amber-500">
          perderás acceso a las funcionalidades Premium
        </span>
        .
      </p>
    );
  }, [renewalDate]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cancelar suscripción</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription asChild className="mt-4 px-4 text-start">
            {description}
          </DrawerDescription>
          <Content />
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button variant="mobile" className="justify-center">
                  Cancelar
                </Button>
              </DrawerClose>
            </div>
            <Button
              variant="mobile-primary"
              disabled={isPending}
              onClick={handleSetFreePlan}
            >
              {isPending && <Loader className="animate-spin" />}
              {isPending ? null : "Confirmar"}
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
          <BadgeAlert variant="warning" />
          <DialogTitle>Cancelar suscripción</DialogTitle>
          <DialogDescription asChild>{description}</DialogDescription>
        </DialogHeader>
        <Content />
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button variant="outline" radius="full">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            radius="full"
            disabled={isPending}
            onClick={handleSetFreePlan}
          >
            {isPending && <Loader className="size-4 animate-spin" />}
            {isPending ? null : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionModal;
