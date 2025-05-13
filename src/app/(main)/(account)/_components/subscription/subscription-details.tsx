"use client";

import {
  CalendarSync,
  CalendarX,
  CircleDollarSign,
  Loader,
} from "lucide-react";
import { useState } from "react";

import { ClockLoopIcon } from "@/components/icons/clock-loop-icon";
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
import { Payment, Subscription } from "@/db/schema";
import { useTrial } from "@/hooks/use-trial";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import CancelSubscriptionModal from "./cancel-subscription-modal";
import { getPlanStatus, getPlanType } from "../../_lib/utils";
import InfoFieldItem from "../info-field-item";
import { TrialInfoPopover } from "../profile/info-popover";

interface SubscriptionDetailsProps {
  subscription: Subscription | null;
  payment: Payment | null;
}

const SubscriptionDetails = ({
  subscription,
  payment,
}: SubscriptionDetailsProps) => {
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
  const { subscription: sub, trial } = useUserSubscription();
  const { isTrialActive } = useTrial();

  const subscriptionPlan = sub?.plan;
  const isPremiumPlan = subscriptionPlan?.name === "Premium";
  const isPremiumPlusPlan = subscriptionPlan?.name === "Premium Plus";

  const trialExpiresAt = trial.expiresAt;
  const now = new Date();

  const daysLeft = Math.ceil(
    ((trialExpiresAt || now).getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  const trialMessage =
    daysLeft <= 0
      ? "Tu prueba gratuita ha finalizado"
      : daysLeft === 1
        ? "Te queda 1 día de tu prueba gratuita"
        : `Te quedan ${daysLeft} días de tu prueba gratuita`;

  const { amount } = payment || {};
  const { type, expiresAt, isPremium, status } = subscription || {};

  const planType = getPlanType(type!);

  const isCanceled = status === "canceled";

  const price = isPremium ? amount?.toLocaleString("es-CL") : "0";

  const renewalDate =
    isCanceled || !isPremium
      ? "No aplica"
      : formatDate(expiresAt!, "d 'de' MMMM, yyyy");

  const finishDate = isCanceled
    ? formatDate(expiresAt!, "d 'de' MMMM, yyyy")
    : "No aplica";

  return (
    <>
      <div className="flex w-full flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-x-2 text-base">
              <span>Resumen del plan</span>
              <Badge
                variant={
                  isTrialActive || isPremiumPlan
                    ? "premium"
                    : isPremiumPlusPlan
                      ? "premiumPlus"
                      : "outline"
                }
                className={cn(
                  !isPremium && !isTrialActive && "border-alternative",
                )}
              >
                {isTrialActive ? "Premium" : planType}
              </Badge>
              {isTrialActive && <TrialInfoPopover />}
            </CardTitle>
            <CardDescription className="space-y-1">
              <p>Este es el resumen de tu plan de Essentia.</p>
              <p>Puedes cambiar o mejorar tu plan en cualquier momento.</p>
            </CardDescription>
            {isTrialActive && (
              <div className="mt-3 w-full rounded-lg border border-indigo-300 bg-indigo-50 p-3 text-xs text-indigo-800 shadow-sm md:text-sm dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                <div className="inline-flex items-center gap-2">
                  <ClockLoopIcon className="size-3.5 md:size-4" />
                  <p className="font-medium">{trialMessage}</p>
                </div>
                <div className="bg-background relative mt-1 h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-premium absolute top-0 left-0 h-2 transition-all"
                    style={{
                      width: `${Math.min(((7 - daysLeft) / 7) * 100, 100)}%`,
                    }}
                  />
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 h-2 w-0.5 -translate-y-1/2 bg-indigo-50 dark:bg-indigo-950"
                      style={{
                        left: `${((i + 1) / 7) * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="border-border rounded-lg border px-4 py-3">
              <div className="grid flex-1 gap-4 md:grid-cols-4">
                <InfoFieldItem
                  field={`Precio/${planType === "Premium Plus" ? "Año" : "Mes"}`}
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
                  value={getPlanStatus(status!)}
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
          </CardContent>
          <CardFooter isSecondary>
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
              <Button
                variant="outline"
                onClick={() => setIsOpenPayment(true)}
                className="bg-background"
              >
                {isPremium ? "Cambiar plan" : "Mejorar a Premium"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {payment && (
        <>
          <CancelSubscriptionModal
            isOpen={isOpenCancel}
            setIsOpen={setIsOpenCancel}
            payment={payment}
            subscription={subscription}
          />
        </>
      )}
      <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
    </>
  );
};

export default SubscriptionDetails;
