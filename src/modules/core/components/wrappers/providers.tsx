import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

import { SidebarProvider } from "@/modules/chatbot/hooks/use-sidebar";

import { PlanProvider } from "../../hooks/use-current-plan";
import SessionProviderComponent from "../../hooks/use-session";
import { ThemeProvider } from "../../hooks/use-theme";

export async function Providers({
  currentPlan,
  children,
  ...props
}: { currentPlan: string | null } & ThemeProviderProps) {
  return (
    <SessionProviderComponent>
      <PlanProvider currentPlan={currentPlan}>
        <SidebarProvider>
          <ThemeProvider {...props}>{children}</ThemeProvider>
        </SidebarProvider>
      </PlanProvider>
    </SessionProviderComponent>
  );
}
