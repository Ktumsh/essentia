"use client";

import { usePathname } from "next/navigation";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

import { SidebarProvider } from "@/modules/chatbot/hooks/use-sidebar";

import { PlanProvider } from "../../hooks/use-current-plan";
import SessionProviderComponent from "../../hooks/use-session";
import { ThemeProvider } from "../../hooks/use-theme";

export function Providers({
  currentPlan,
  children,
  ...props
}: { currentPlan: string | null } & ThemeProviderProps) {
  const pathname = usePathname();
  const isAbout = pathname.startsWith("/about-essentia");
  return (
    <SessionProviderComponent>
      <PlanProvider currentPlan={currentPlan}>
        <SidebarProvider>
          <ThemeProvider {...props} forcedTheme={isAbout ? "light" : undefined}>
            {children}
          </ThemeProvider>
        </SidebarProvider>
      </PlanProvider>
    </SessionProviderComponent>
  );
}
