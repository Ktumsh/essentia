import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/modules/chatbot/hooks/use-sidebar";
import { ThemeProvider } from "../../hooks/use-theme";
import SessionProviderComponent from "../../hooks/use-session";
import { PremiumProvider } from "../../hooks/use-premium-status";
import { PlanProvider } from "../../hooks/use-current-plan";

export async function Providers({
  currentPlan,
  isPremium,
  children,
  ...props
}: { currentPlan: string | null; isPremium: boolean } & ThemeProviderProps) {
  return (
    <SessionProviderComponent>
      <PlanProvider currentPlan={currentPlan}>
        <PremiumProvider isPremium={isPremium}>
          <SidebarProvider>
            <ThemeProvider {...props}>{children}</ThemeProvider>
          </SidebarProvider>
        </PremiumProvider>
      </PlanProvider>
    </SessionProviderComponent>
  );
}
