"use client";

import { CalendarSync, CircleDollarSign } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { StarsIcon } from "@/components/ui/icons/common";
import PaymentModal from "@/components/ui/payment/payment-modal";
import { Payment, Subscription } from "@/db/schema";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import CancelSubscriptionModal from "./cancel-subscription-modal";
import { getPlanType } from "../../_lib/utils";

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

  const { amount } = payment || {};
  const { type, expiresAt, isPremium, status } = subscription || {};

  const planType = getPlanType(type!);

  const price = isPremium ? amount?.toLocaleString("es-CL") : "0";

  const renewalDate = isPremium
    ? formatDate(expiresAt!, "d 'de' MMMM, yyyy")
    : "No aplica";

  return (
    <>
      <div className="flex w-full flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-x-2 text-base">
              <span>Resumen del plan</span>
              <div
                className={cn(
                  "text-foreground/80 border-border dark:border-alternative relative inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border px-2 py-0.5 text-xs font-normal shadow-xs",
                  {
                    "from-gradient-from via-gradient-via to-gradient-to border-none bg-gradient-to-r font-medium text-white! dark:from-[-100%]":
                      isPremium,
                  },
                )}
              >
                {isPremium && <StarsIcon className="size-3 **:fill-white" />}
                {planType}
              </div>
            </CardTitle>
            <CardDescription className="space-y-1">
              <p>Este es el resumen de tu plan de Essentia.</p>
              <p>Puedes cambiar o mejorar tu plan en cualquier momento.</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-border rounded-lg border px-4 py-3">
              <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-6">
                <span className="flex flex-col">
                  <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal">
                    <span>
                      <CircleDollarSign className="size-3" />
                    </span>
                    <span className="text-nowrap">
                      Precio/{planType === "Premium Plus" ? "Año" : "Mes"}
                    </span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    $ {price}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal">
                    <span>
                      <CalendarSync className="size-3" />
                    </span>
                    <span className="text-nowrap">Fecha de renovación</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {renewalDate}
                  </div>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter isSecondary>
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              {isPremium && status !== "canceled" && (
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
