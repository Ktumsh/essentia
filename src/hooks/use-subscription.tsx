"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import type { Payment, Subscription } from "@/db/schema";

const SubscriptionContext = createContext<{
  subscription: Subscription | null;
  setSubscription: React.Dispatch<React.SetStateAction<Subscription | null>>;
  payment: Payment | null;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
} | null>(null);

interface SubscriptionProviderProps {
  initialSubscription: Subscription | null;
  initialPayment: Payment | null;
  children: ReactNode;
}

export const SubscriptionProvider = ({
  initialSubscription,
  initialPayment,
  children,
}: SubscriptionProviderProps) => {
  const [subscription, setSubscription] = useState<Subscription | null>(
    initialSubscription,
  );

  const [payment, setPayment] = useState<Payment | null>(initialPayment);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        setSubscription,
        payment,
        setPayment,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription debe ser usado dentro de un SubscriptionProvider",
    );
  }
  return context;
};

export default useSubscription;
