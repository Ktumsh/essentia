"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

import { UserSubscriptionInfo } from "@/db/querys/user-querys";

interface UserSubscriptionContextValue {
  trial: UserSubscriptionInfo["trial"];
  subscription: UserSubscriptionInfo["subscription"];
  setTrial: (trial: UserSubscriptionInfo["trial"]) => void;
  setSubscription: (sub: UserSubscriptionInfo["subscription"]) => void;
}

const UserSubscriptionContext =
  createContext<UserSubscriptionContextValue | null>(null);

export function UserSubscriptionProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: UserSubscriptionInfo;
}) {
  const [trial, setTrial] = useState(initialData.trial);
  const [subscription, setSubscription] = useState(initialData.subscription);

  const value = useMemo(
    () => ({ trial, subscription, setTrial, setSubscription }),
    [trial, subscription],
  );

  return (
    <UserSubscriptionContext.Provider value={value}>
      {children}
    </UserSubscriptionContext.Provider>
  );
}

export function useUserSubscription() {
  const context = useContext(UserSubscriptionContext);
  if (!context) {
    throw new Error(
      "useUserSubscription debe usarse dentro de UserSubscriptionProvider",
    );
  }
  return context;
}
