import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/modules/chatbot/hooks/use-sidebar";
import { ThemeProvider } from "../../hooks/use-theme";
import SessionProviderComponent from "../../hooks/use-session";
import { PlanProvider } from "../../hooks/use-current-plan";

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
