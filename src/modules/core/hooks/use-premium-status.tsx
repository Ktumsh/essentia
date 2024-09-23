"use client";

import { createContext, useContext, ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error("usePremium debe usarse dentro de PremiumProvider");
  }
  return context;
};

export const PremiumProvider = ({
  children,
  isPremium,
}: {
  children: ReactNode;
  isPremium: boolean;
}) => {
  return (
    <PremiumContext.Provider value={{ isPremium }}>
      {children}
    </PremiumContext.Provider>
  );
};
