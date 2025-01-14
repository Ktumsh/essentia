"use client";

import { BadgeDollarSign } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Payment, Subscription } from "@/db/schema";
import { CalendarSync } from "@/modules/icons/miscellaneus";
import PaymentModal from "@/modules/payment/components/payment-modal";
import { cn } from "@/utils/common";
import { formatDate } from "@/utils/format";

import CancelSubscriptionModal from "./cancel-subscription-modal";
import { getPlanType } from "../lib/utils";

interface SubscriptionDetailsProps {
  subscription: Subscription;
  subscriptionDetails: Payment | null;
}

const SubscriptionDetails = ({
  subscription,
  subscriptionDetails,
}: SubscriptionDetailsProps) => {
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);

  const { amount } = subscriptionDetails || {};
  const { type, expiresAt, isPremium } = subscription;

  const planType = getPlanType(type!);

  const price = isPremium ? amount?.toLocaleString("es-CL") : "0";

  const renewalDate = isPremium
    ? formatDate(expiresAt!, "d 'de' MMMM, yyyy")
    : "No aplica";

  return (
    <>
      <div className="flex w-full flex-col gap-8">
        <Card className="text-main dark:text-white">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-x-2 text-base">
              <span>Resumen del Plan</span>
              <div
                className={cn(
                  "relative inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-xs",
                  planType === "Premium" || planType === "Premium Plus"
                    ? "bg-light-gradient-v2 text-white dark:bg-dark-gradient-v2"
                    : "border border-gray-300 bg-white text-main-h dark:border-accent-dark dark:bg-full-dark dark:text-main-dark",
                )}
              >
                {planType}
              </div>
            </CardTitle>
            <CardDescription className="space-y-1">
              <p>Este es el resumen de tu plan de Essentia.</p>
              <p>Puedes cambiar o mejorar tu plan en cualquier momento.</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
              <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-6">
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                    <span>
                      <BadgeDollarSign strokeWidth={1.5} className="size-3" />
                    </span>
                    <span>
                      Precio/{planType === "Premium Plus" ? "Año" : "Mes"}
                    </span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    $ {price}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                    <span>
                      <CalendarSync strokeWidth={1.5} className="size-3" />
                    </span>
                    <span>Fecha de renovación</span>
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
              {isPremium && (
                <Button
                  radius="lg"
                  variant="outline"
                  onClick={() => setIsOpenCancel(true)}
                  className="border !border-red-500 !text-red-500"
                >
                  Cancelar suscripción
                </Button>
              )}
              <Button
                radius="lg"
                variant="outline"
                onClick={() => setIsOpenPayment(true)}
              >
                {isPremium ? "Cambiar plan" : "Mejorar a Premium"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {subscriptionDetails && (
        <>
          <CancelSubscriptionModal
            isOpen={isOpenCancel}
            setIsOpen={setIsOpenCancel}
            subscriptionDetails={subscriptionDetails}
            subscription={subscription}
          />
        </>
      )}
      <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
    </>
  );
};

export default SubscriptionDetails;
