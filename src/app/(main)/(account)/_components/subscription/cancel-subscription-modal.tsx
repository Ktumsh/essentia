"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import ReasonCheckbox from "@/app/(main)/pricing/_components/reason-checkbox";
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
import { Separator } from "@/components/kit/separator";
import { Textarea } from "@/components/kit/textarea";
import { setUserPlan } from "@/components/ui/payment/actions";
import { siteConfig } from "@/config/site.config";
import { Payment, Subscription } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "@/utils/format";

import { getPlanType } from "../../_lib/utils";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  subscriptionDetails: Payment;
  subscription: Subscription;
}

const CancelSubscriptionModal = ({
  isOpen,
  setIsOpen,
  subscriptionDetails,
  subscription,
}: CancelSubscriptionModalProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [cancelReason, setCancelReason] = useState<string>("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const { amount } = subscriptionDetails;
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
        <div className="border-border dark:bg-accent/50 flex w-full justify-between rounded-lg border bg-slate-50 p-4">
          <span>
            <span className="text-main dark:text-main-dark text-sm font-medium">
              Plan {planType}
            </span>
            <span>
              {" "}
              - ${price}/{planType === "Premium Plus" ? "año" : "mes"}
            </span>
          </span>
        </div>
        <div className="text-main dark:text-main-dark mt-4 flex flex-col gap-4">
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
              variant="mobile-danger"
              disabled={isPending}
              onClick={handleSetFreePlan}
            >
              {isPending && <Loader className="size-4 animate-spin" />}
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
