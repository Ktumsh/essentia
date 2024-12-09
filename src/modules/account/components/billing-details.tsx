"use client";

import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";

import { Button } from "@/components/ui/button";
import { Payment, Subscription } from "@/db/schema";
import PaymentModal from "@/modules/payment/components/payment-modal";
import { cn } from "@/utils/common";
import { formatDate } from "@/utils/format";

import CancelSubscriptionModal from "./cancel-subscription-modal";
import { getPlanType } from "../lib/utils";

interface BillingDetailsProps {
  subscription: Subscription;
  billingDetail: Payment & { card: Stripe.PaymentMethod.Card | undefined };
}

const BillingDetails = ({
  subscription,
  billingDetail,
}: BillingDetailsProps) => {
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);

  const { amount } = billingDetail;
  const { type, expiresAt, isPremium } = subscription;

  const paymentMethod = billingDetail.card;

  const planType = getPlanType(type!);

  const price = isPremium ? amount?.toLocaleString("es-CL") : "0";

  const renewalDate = isPremium
    ? formatDate(expiresAt!, "dd 'de' MMM, yyyy")
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
                    ${price}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-m dark:text-main-dark-m">
                    Fecha de renovación
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {renewalDate}
                  </div>
                </span>
              </div>
            </div>
          </div>
          <footer className="flex flex-col justify-between gap-4 rounded-none border-t border-gray-200 bg-gray-100 px-4 py-3 dark:border-dark dark:bg-dark/50 sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              {isPremium && (
                <Button
                  variant="outline"
                  onClick={() => setIsOpenCancel(true)}
                  className="border border-red-500 text-red-500 dark:border-red-500 dark:text-red-500"
                >
                  Cancelar suscripción
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsOpenPayment(true)}>
                {isPremium ? "Cambiar plan" : "Mejorar a Premium"}
              </Button>
            </div>
          </footer>
        </div>

        {billingDetail && (
          <div className="rounded-lg border border-gray-200 bg-white dark:border-dark dark:bg-full-dark">
            <div className="px-5 py-4 text-main dark:text-white">
              <h3 className="pb-4 text-base font-semibold">
                Información de Pago
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
          </div>
        )}
      </div>

      {billingDetail && (
        <>
          <CancelSubscriptionModal
            isOpen={isOpenCancel}
            setIsOpen={setIsOpenCancel}
            billingDetails={billingDetail}
            subscription={subscription}
          />
        </>
      )}
      <PaymentModal isOpen={isOpenPayment} setIsOpen={setIsOpenPayment} />
    </>
  );
};

export default BillingDetails;
