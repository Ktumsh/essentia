"use client";

import { Button, Card, CardFooter, useDisclosure } from "@nextui-org/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenCancelModal,
    onOpen: onOpenCancelModal,
    onOpenChange: onOpenChangeCancelModal,
  } = useDisclosure();
  const {
    isOpen: isOpenPaymentModal,
    onOpen: onOpenPaymentModal,
    onOpenChange: onOpenChangePaymentModal,
  } = useDisclosure();
  const { is_premium } = profileData || {};

  const subscription = billingDetails?.subscription || {};
  const isSubscriptionCanceled = subscription?.status === "canceled";
  const isSubscriptionPending = subscription?.status === "pending";
  const isSubscriptionIncomplete = subscription?.status === "incomplete";

  const paymentMethod = billingDetails?.paymentMethod?.card || {};

  const planType =
    isSubscriptionPending || isSubscriptionIncomplete || !is_premium
      ? "Gratis"
      : (subscription?.items?.data?.[0]?.price?.nickname ?? "Gratis");

  const price =
    isSubscriptionPending || isSubscriptionIncomplete || !is_premium
      ? "0"
      : (subscription?.items?.data?.[0]?.price?.unit_amount?.toLocaleString(
          "es-CL",
        ) ?? "N/A");

  const renewalDate =
    subscription?.current_period_end &&
    !isSubscriptionPending &&
    !isSubscriptionIncomplete &&
    is_premium
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
        <Card
          shadow="none"
          className="rounded-lg border border-gray-200 bg-white dark:border-dark dark:bg-full-dark"
        >
          <div className="px-5 py-4 text-main dark:text-white">
            <h3 className="flex flex-wrap items-center gap-x-2 pb-4 text-base font-semibold">
              <span>Resumen del Plan</span>
              <div
                className={cn(
                  "relative inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-xs",
                  planType === "Premium" || planType === "Premium Plus"
                    ? "bg-light-gradient-v2 text-white dark:bg-dark-gradient-v2"
                    : "dark:border-accent-dark border border-gray-300 bg-white text-main-h dark:bg-full-dark dark:text-main-dark",
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
          <CardFooter className="flex flex-col justify-between gap-4 rounded-none border-t border-gray-200 bg-gray-100 px-4 py-3 dark:border-dark dark:bg-dark/50 sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              {planType !== "Gratis" && !isSubscriptionIncomplete && (
                <Button
                  radius="sm"
                  size="sm"
                  onPress={onOpenCancelModal}
                  className="w-full border border-red-500 bg-white text-sm font-medium text-red-500 shadow-sm data-[hover=true]:bg-red-500 data-[hover=true]:text-white dark:border-red-500/80 dark:bg-full-dark dark:text-red-500/80 data-[hover=true]:dark:bg-red-500/80 data-[hover=true]:dark:text-white md:w-fit"
                >
                  Cancelar suscripción
                </Button>
              )}
              <Button
                radius="sm"
                size="sm"
                onPress={onOpenPaymentModal}
                className="w-full border border-gray-200 bg-white text-sm font-medium text-main shadow-sm dark:border-dark dark:bg-full-dark dark:text-white md:w-fit"
              >
                {isSubscriptionCanceled ||
                isSubscriptionIncomplete ||
                !is_premium
                  ? "Mejorar a Premium"
                  : "Cambiar plan"}
              </Button>
            </div>
          </CardFooter>
        </Card>

        {billingDetails && (
          <Card
            shadow="none"
            className="rounded-lg border border-gray-200 bg-white dark:border-dark dark:bg-full-dark"
          >
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
            <CardFooter className="flex flex-col justify-between gap-4 rounded-none border-t border-gray-200 bg-gray-100 px-4 py-3 dark:border-dark dark:bg-dark/50 sm:flex-row sm:items-center">
              <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
                <Button
                  radius="sm"
                  onPress={onOpen}
                  size="sm"
                  className="w-full border border-gray-200 bg-white text-sm font-medium text-main shadow-sm dark:border-dark dark:bg-full-dark dark:text-white md:w-fit"
                >
                  Cambiar método de pago
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>

      {billingDetails && (
        <>
          <ChangePaymentModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            paymentMethod={billingDetails.paymentMethod.customer}
            clientSecret={clientSecret}
          />
          <CancelSubscriptionModal
            isOpen={isOpenCancelModal}
            onOpenChange={onOpenChangeCancelModal}
            billingDetails={billingDetails}
          />
        </>
      )}
      <PaymentModal
        isOpen={isOpenPaymentModal}
        onOpenChange={onOpenChangePaymentModal}
      />
    </>
  );
};

export default BillingDetails;
