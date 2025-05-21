"use client";

import {
  CalendarSync,
  CalendarX,
  CircleDollarSign,
  Clock,
  Loader,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import PaymentModal from "@/components/ui/payment/payment-modal";
import useSubscription from "@/hooks/use-subscription";
import { useTrial } from "@/hooks/use-trial";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import InfoFieldItem from "../info-field-item";
import CancelSubscriptionModal from "./cancel-subscription-modal";
import { getPlanStatus, getPlanType, getTrialMessage } from "../../_lib/utils";
import { TrialInfoPopover } from "../profile/info-popover";

const SubscriptionDetails = () => {
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const { payment } = useSubscription();
  const { subscription, trial } = useUserSubscription();
  const { isTrialActive } = useTrial();

  // Datos actuales
  const subscriptionPlan = subscription?.plan;
  const userSubscription = subscription?.subscription;

  const type = userSubscription?.type;
  const futureType = userSubscription?.futureType;
  const isPremium = userSubscription?.isPremium;
  const isCanceled = userSubscription?.status === "canceled";
  const expiresAt = userSubscription?.expiresAt;
  const subscriptionStatus = userSubscription?.status ?? "paused";

  const planType = getPlanType(type!);
  const price = subscriptionPlan?.price?.toLocaleString("es-CL") || "0";

  // Tipos de plan para botones y badges
  const isPremiumPlan = subscriptionPlan?.name === "Premium";
  const isPremiumPlusPlan = subscriptionPlan?.name === "Premium Plus";

  const trialExpiresAt = trial.expiresAt;
  const trialMessage = isTrialActive ? getTrialMessage(trialExpiresAt!) : null;

  const renewalDate =
    !isPremium || isCanceled
      ? "No aplica"
      : formatDate(expiresAt!, "d 'de' MMMM, yyyy");

  const finishDate = isCanceled
    ? formatDate(expiresAt!, "d 'de' MMMM, yyyy")
    : "No aplica";

  const badgeVariant = isTrialActive
    ? "premium"
    : isPremiumPlan
      ? "premium"
      : isPremiumPlusPlan
        ? "premiumPlus"
        : "outline";

  const badgeLabel = isTrialActive ? "Premium" : planType;

  return (
    <>
      <div className="flex w-full flex-col gap-8">
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-x-2 text-base">
              <span>Resumen del plan</span>
              <Badge
                variant={badgeVariant}
                className={cn(
                  !isPremium && !isTrialActive && "border-alternative",
                )}
              >
                {badgeLabel}
              </Badge>
              {isTrialActive && <TrialInfoPopover />}
            </CardTitle>

            <CardDescription className="space-y-1">
              <p>Este es el resumen de tu plan de Essentia.</p>
              <p>Puedes cambiar o mejorar tu plan en cualquier momento.</p>
            </CardDescription>

            {isTrialActive && (
              <div className="mt-3 w-full rounded-xl border border-dashed border-indigo-300 bg-indigo-50 p-3 text-xs shadow-sm md:text-sm dark:border-indigo-700 dark:bg-indigo-950">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-primary flex items-center gap-2">
                    <Clock className="size-4" />
                    <p className="font-medium">{trialMessage}</p>
                  </div>
                  <p className="text-primary text-xs">
                    Expira el {formatDate(trialExpiresAt!, "d 'de' MMMM, yyyy")}
                  </p>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <div className="bg-background rounded-xl border px-4 py-3">
              <div className="grid gap-4 md:grid-cols-4">
                <InfoFieldItem
                  field="Precio/Mes"
                  value={`$ ${price}`}
                  icon={CircleDollarSign}
                />
                <InfoFieldItem
                  field="Fecha de renovación"
                  value={renewalDate}
                  icon={CalendarSync}
                />
                <InfoFieldItem
                  field="Fecha de finalización"
                  value={finishDate}
                  icon={CalendarX}
                />
                <InfoFieldItem
                  field="Estado"
                  value={getPlanStatus(subscriptionStatus)}
                  icon={Loader}
                />
              </div>
            </div>

            {isCanceled && (
              <div className="text-foreground/80 mt-4 space-y-1 text-sm">
                <p className="text-red-500">
                  Tu plan ha sido cancelado y perderás acceso a las
                  funcionalidades Premium a partir de la fecha de finalización.
                </p>
                <p>
                  Si deseas reactivar tu plan, puedes hacerlo una vez haya
                  finalizado.
                </p>
              </div>
            )}

            {futureType && (
              <div className="mt-4 space-y-1 text-sm text-yellow-600 dark:text-yellow-400">
                <p>
                  Tienes un cambio de plan programado a{" "}
                  <strong>{getPlanType(futureType)}</strong>. Este se aplicará
                  automáticamente al finalizar tu periodo actual, el{" "}
                  <strong>{formatDate(expiresAt!, "d 'de' MMMM, yyyy")}</strong>
                  .
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              {isPremium && !isCanceled && (
                <Button
                  variant="outline"
                  onClick={() => setIsOpenCancel(true)}
                  className="bg-background border border-red-500! text-red-500!"
                >
                  Cancelar suscripción
                </Button>
              )}
              {!isPremiumPlusPlan && (
                <Button
                  variant="outline"
                  onClick={() => setOpenPayment(true)}
                  className="bg-background"
                >
                  {isPremiumPlan ? "Mejorar plan" : "Actualizar a Premium"}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>

      {payment && !isCanceled && (
        <CancelSubscriptionModal
          isOpen={isOpenCancel}
          setIsOpen={setIsOpenCancel}
          payment={payment}
          subscription={userSubscription ?? null}
        />
      )}

      <PaymentModal isOpen={openPayment} setIsOpen={setOpenPayment} />
    </>
  );
};

export default SubscriptionDetails;
