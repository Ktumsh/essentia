"use client";

import { createContext, ReactNode, useContext } from "react";

interface PlanContextType {
  currentPlan: string | null;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const useCurrentPlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan debe ser usado dentro de un CurrentPlanProvider");
  }
  return context;
};

export const CurrentPlanProvider = ({
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
