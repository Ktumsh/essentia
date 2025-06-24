"use client";

import { useSearchParams } from "next/navigation";
import { memo, Suspense } from "react";

import CanceledState from "./canceled-state";
import ErrorState from "./error-state";
import LoadingState from "./loading-state";
import SuccessState from "./success-state";
import { usePaymentVerification } from "../_hooks/use-payment-verification";
import { getTitleStatus } from "../_lib/utils";

import type { Payment } from "@/db/schema";

interface PaymentContentProps {
  title: string;
  message?: string;
  paymentDetails?: Payment;
  renewalDate?: Date | null;
}

const PaymentContentInner = ({
  title,
  message,
  paymentDetails,
  renewalDate,
}: PaymentContentProps) => {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const titleStatus = getTitleStatus(title);
  const planType = paymentDetails?.plan || "premium";

  const { isVerified, isLoading } = usePaymentVerification(
    sessionId,
    titleStatus,
  );

  if (isVerified === null || isLoading) {
    return <LoadingState />;
  }

  if (!isVerified && titleStatus !== "canceled") {
    return <ErrorState />;
  }

  if (titleStatus === "canceled") {
    return <CanceledState />;
  }

  if (titleStatus === "success" && paymentDetails) {
    return (
      <SuccessState
        title={title}
        message={message}
        paymentDetails={paymentDetails}
        planType={planType}
        renewalDate={renewalDate}
      />
    );
  }

  return <ErrorState />;
};

const PaymentContent = (props: PaymentContentProps) => (
  <Suspense fallback={<LoadingState />}>
    <PaymentContentInner {...props} />
  </Suspense>
);

export default memo(PaymentContent);
