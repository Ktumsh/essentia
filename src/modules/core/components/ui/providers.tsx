"use client";

import { ThemeProviderProps } from "next-themes";
import * as React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import { ChatProvider } from "../../hooks/use-chat-context";
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
          <ChatProvider>
            <ThemeProvider disableTransitionOnChange>{children}</ThemeProvider>
          </ChatProvider>
        </SidebarProvider>
      </PlanProvider>
    </SessionProviderComponent>
  );
}
