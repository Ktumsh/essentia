"use client";

import { ThemeProviderProps } from "next-themes";
import * as React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import { PlanProvider } from "../../hooks/use-current-plan";
import SessionProviderComponent from "../../hooks/use-session";
import { ThemeProvider } from "../../hooks/use-theme";

export function Providers({
  currentPlan,
  defaultOpen,
  children,
}: { currentPlan: string | null; defaultOpen?: boolean } & ThemeProviderProps) {
  return (
    <SessionProviderComponent>
      <PlanProvider currentPlan={currentPlan}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <ThemeProvider disableTransitionOnChange>{children}</ThemeProvider>
        </SidebarProvider>
      </PlanProvider>
    </SessionProviderComponent>
  );
}
