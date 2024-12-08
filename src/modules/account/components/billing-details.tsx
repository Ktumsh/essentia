"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import PaymentModal from "@/modules/payment/components/payment-modal";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import CancelSubscriptionModal from "./cancel-subscription-modal";
import ChangePaymentModal from "./change-payment-modal";

interface BillingDetailsProps {
  billingDetails: any;
  clientSecret: string;
  profileData: UserProfileData | null;
}

const BillingDetails = ({
  billingDetails,
  clientSecret,
  profileData,
}: BillingDetailsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);

  const { isPremium } = profileData || {};

  const subscription = billingDetails?.subscription || {};
  const isSubscriptionCanceled = subscription?.status === "canceled";
  const isSubscriptionPending = subscription?.status === "pending";
  const isSubscriptionIncomplete = subscription?.status === "incomplete";

  const paymentMethod = billingDetails?.paymentMethod?.card || {};

  const planType =
    isSubscriptionPending || isSubscriptionIncomplete || !isPremium
      ? "Gratis"
      : (subscription?.items?.data?.[0]?.price?.nickname ?? "Gratis");

  const price =
    isSubscriptionPending || isSubscriptionIncomplete || !isPremium
      ? "0"
      : (subscription?.items?.data?.[0]?.price?.unit_amount?.toLocaleString(
          "es-CL",
        ) ?? "N/A");

  const renewalDate =
    subscription?.current_period_end &&
    !isSubscriptionPending &&
    !isSubscriptionIncomplete &&
    isPremium
      ? format(
          new Date(subscription.current_period_end * 1000),
          "dd 'de' MMM, yyyy",
          { locale: es },
        )
      : "No aplica";

  const paymentBrand = paymentMethod?.brand || "N/A";
  const paymentLast4 = paymentMethod?.last4 || "N/A";

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="rounded-lg border border-gray-200 bg-white dark:border-dark dark:bg-full-dark">
          <div className="px-5 py-4 text-main dark:text-white">
            <h3 className="flex flex-wrap items-center gap-x-2 pb-4 text-base font-semibold">
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
            </h3>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
              <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-6">
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-m dark:text-main-dark-m">
                    Precio/{planType === "Premium Plus" ? "Año" : "Mes"}
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {planType === "Gratis" ? "$0" : `$${price}`}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-m dark:text-main-dark-m">
                    Fecha de renovación
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {isSubscriptionCanceled
                      ? "No aplica"
                      : isSubscriptionIncomplete
                        ? "No aplica"
                        : renewalDate}
                  </div>
                </span>
              </div>
            </div>
          </div>
          <footer className="flex flex-col justify-between gap-4 rounded-none border-t border-gray-200 bg-gray-100 px-4 py-3 dark:border-dark dark:bg-dark/50 sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              {planType !== "Gratis" && !isSubscriptionIncomplete && (
                <Button
                  variant="outline"
                  onClick={() => setIsOpenCancel(true)}
                  className="border border-red-500 text-red-500 dark:border-red-500 dark:text-red-500"
                >
                  Cancelar suscripción
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsOpenPayment(true)}>
                {isSubscriptionCanceled ||
                isSubscriptionIncomplete ||
                !isPremium
                  ? "Mejorar a Premium"
                  : "Cambiar plan"}
              </Button>
            </div>
          </footer>
        </div>

        {billingDetails && (
          <div className="rounded-lg border border-gray-200 bg-white dark:border-dark dark:bg-full-dark">
            <div className="px-5 py-4 text-main dark:text-white">
              <h3 className="pb-4 text-base font-semibold">
                Administrar Información de Pago
              </h3>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
                <span className="flex items-center gap-4 text-sm">
                  {paymentBrand === "visa" && (
                    <Image
                      alt="logo for visa"
                      width={19}
                      height={12}
                      src="/cardbrands/visa.svg"
                      className="h-3 w-auto"
                    />
                  )}
                  {paymentBrand === "mastercard" && (
                    <Image
                      alt="logo for visa"
                      width={18}
                      height={12}
                      src="/cardbrands/mastercard.svg"
                      className="h-3 w-auto"
                    />
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-xs">••••</span>
                    <span className="text-xs">••••</span>
                    <span className="text-xs">••••</span>
                    <span>{paymentLast4 ?? "N/A"}</span>
                  </div>
                </span>
              </div>
            </div>
            <footer className="flex flex-col justify-between gap-4 rounded-none border-t border-gray-200 bg-gray-100 px-4 py-3 dark:border-dark dark:bg-dark/50 sm:flex-row sm:items-center">
              <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                  Cambiar método de pago
                </Button>
              </div>
            </footer>
          </div>
        )}
      </div>

      {billingDetails && (
        <>
          <ChangePaymentModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            paymentMethod={billingDetails.paymentMethod.customer}
            clientSecret={clientSecret}
          />
          <CancelSubscriptionModal
            isOpen={isOpenCancel}
            setIsOpen={setIsOpenCancel}
            billingDetails={billingDetails}
          />
        </>
      )}
      <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
    </>
  );
};

export default BillingDetails;
