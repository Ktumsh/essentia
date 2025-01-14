"use client";

import { ThemeProviderProps } from "next-themes";
import * as React from "react";

import { MobileProvider } from "@/components/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReducedMotionProvider } from "@/modules/settings/hooks/use-reduce-motion";

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
      <MobileProvider>
        <PlanProvider currentPlan={currentPlan}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <ChatProvider>
              <ReducedMotionProvider>
                <ThemeProvider disableTransitionOnChange>
                  {children}
                </ThemeProvider>
              </ReducedMotionProvider>
            </ChatProvider>
          </SidebarProvider>
        </PlanProvider>
      </MobileProvider>
    </SessionProviderComponent>
  );
}
