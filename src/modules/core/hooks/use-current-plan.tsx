"use client";

import { createContext, ReactNode, useContext } from "react";

interface PlanContextType {
  currentPlan: string | null;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan debe ser usado dentro de un PlanProvider");
  }
  return context;
};

export const PlanProvider = ({
  children,
  currentPlan,
}: {
  children: ReactNode;
  currentPlan: string | null;
}) => {
  return (
    <PlanContext.Provider value={{ currentPlan }}>
      {children}
    </PlanContext.Provider>
  );
};
