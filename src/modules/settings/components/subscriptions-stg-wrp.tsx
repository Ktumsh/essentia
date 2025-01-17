"use client";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { PaymentHistory } from "@/types/common";

import SubscriptionsStg from "./subscriptions-stg";

import type { Payment, Subscription } from "@/db/schema";

interface SubscriptionsStgWrpProps {
  subscription: Subscription;
  subscriptionDetails: Payment | null;
  paymentHistory: PaymentHistory[];
}

const SubscriptionsStgWrp = ({
  subscription,
  subscriptionDetails,
  paymentHistory,
}: SubscriptionsStgWrpProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;
  return (
    <SubscriptionsStg
      subscription={subscription}
      subscriptionDetails={subscriptionDetails}
      paymentHistory={paymentHistory}
    />
  );
};

export default SubscriptionsStgWrp;
