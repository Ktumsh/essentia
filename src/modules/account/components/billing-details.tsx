"use client";

import { Button, Card, CardFooter, useDisclosure } from "@nextui-org/react";
import ChangePaymentModal from "./change-payment-modal";
import Image from "next/image";
import { cn } from "@/utils/common";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CancelSubscriptionModal from "./cancel-subscription-modal";
import PaymentModal from "@/modules/payment/components/payment-modal";
import { UserProfileData } from "@/types/session";

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
      : subscription?.items?.data?.[0]?.price?.nickname ?? "Gratis";

  const price =
    isSubscriptionPending || isSubscriptionIncomplete || !is_premium
      ? "0"
      : subscription?.items?.data?.[0]?.price?.unit_amount?.toLocaleString(
          "es-CL"
        ) ?? "N/A";

  const renewalDate =
    subscription?.current_period_end &&
    !isSubscriptionPending &&
    !isSubscriptionIncomplete &&
    is_premium
      ? format(
          new Date(subscription.current_period_end * 1000),
          "dd 'de' MMM, yyyy",
          { locale: es }
        )
      : "No aplica";

  const paymentBrand = paymentMethod?.brand || "N/A";
  const paymentLast4 = paymentMethod?.last4 || "N/A";

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Card
          shadow="none"
          className="rounded-lg bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark"
        >
          <div className="px-5 py-4 text-base-color dark:text-base-color-dark">
            <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
              <span>Resumen del Plan</span>
              <div
                className={cn(
                  "relative inline-flex shrink-0 items-center justify-center h-5 gap-1 px-2.5 text-xs rounded-full",
                  planType === "Premium" || planType === "Premium Plus"
                    ? "bg-light-gradient-v2 dark:bg-dark-gradient-v2 text-white"
                    : "bg-white dark:bg-base-full-dark border border-gray-300 dark:border-[#123a6f] text-base-color-h dark:text-base-color-dark"
                )}
              >
                {planType}
              </div>
            </h3>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-base-dark px-4 py-3">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-4">
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-base-color-m dark:text-base-color-dark-m">
                    Precio/{planType === "Premium Plus" ? "Año" : "Mes"}
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {planType === "Gratis" ? "$0" : `$${price}`}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-base-color-m dark:text-base-color-dark-m">
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
          <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 gap-4 rounded-none bg-gray-100 dark:bg-base-dark-50 border-t border-gray-200 dark:border-base-dark">
            <div className="flex flex-col w-full md:w-fit gap-2 sm:ml-auto sm:flex-row">
              {planType !== "Gratis" && !isSubscriptionIncomplete && (
                <Button
                  radius="sm"
                  size="sm"
                  onPress={onOpenCancelModal}
                  className="w-full md:w-fit shadow-sm text-red-500 dark:text-red-500/80 bg-white dark:bg-base-full-dark border border-red-500 dark:border-red-500/80 data-[hover=true]:bg-red-500 data-[hover=true]:dark:bg-red-500/80 data-[hover=true]:text-white data-[hover=true]:dark:text-white font-medium text-sm"
                >
                  Cancelar suscripción
                </Button>
              )}
              <Button
                radius="sm"
                size="sm"
                onPress={onOpenPaymentModal}
                className="w-full md:w-fit shadow-sm bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark font-medium text-sm text-base-color dark:text-base-color-dark"
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
            className="rounded-lg bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark"
          >
            <div className="px-5 py-4 text-base-color dark:text-base-color-dark">
              <h3 className="pb-4 text-base font-semibold">
                Administrar Información de Pago
              </h3>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-base-dark px-4 py-3">
                <span className="flex items-center gap-4 text-sm">
                  {paymentBrand === "visa" && (
                    <Image
                      alt="logo for visa"
                      width={19}
                      height={12}
                      src="/cardbrands/visa.svg"
                      className="w-auto h-3"
                    />
                  )}
                  {paymentBrand === "mastercard" && (
                    <Image
                      alt="logo for visa"
                      width={18}
                      height={12}
                      src="/cardbrands/mastercard.svg"
                      className="w-auto h-3"
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
            <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 gap-4 rounded-none bg-gray-100 dark:bg-base-dark-50 border-t border-gray-200 dark:border-base-dark">
              <div className="flex flex-col w-full md:w-fit gap-2 sm:ml-auto sm:flex-row">
                <Button
                  radius="sm"
                  onPress={onOpen}
                  size="sm"
                  className="w-full md:w-fit shadow-sm bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark font-medium text-sm text-base-color dark:text-base-color-dark"
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
