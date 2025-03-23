"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import useSubscription from "@/hooks/use-subscription";
import { PaymentHistory } from "@/types/common";

import SubscriptionsStg from "./subscriptions-stg";

interface SubscriptionsStgWrpProps {
  paymentHistory: PaymentHistory[];
}

const SubscriptionsStgWrp = ({ paymentHistory }: SubscriptionsStgWrpProps) => {
  const isMobile = useIsMobile();

  const { subscription, payment } = useSubscription();

  if (!isMobile) return null;
  return (
    <SubscriptionsStg
      subscription={subscription}
      payment={payment}
      paymentHistory={paymentHistory}
    />
  );
};

export default SubscriptionsStgWrp;
