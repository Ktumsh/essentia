"use client";

import { ThemeProviderProps } from "next-themes";
import * as React from "react";

import { MobileProvider } from "@/components/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReducedMotionProvider } from "@/modules/settings/hooks/use-reduce-motion";

import { ChatProvider } from "../../hooks/use-chat-context";
import { PlanProvider } from "../../hooks/use-current-plan";
import { NotificationProvider } from "../../hooks/use-notification";
import SessionProviderComponent from "../../hooks/use-session";
import { TasksProvider } from "../../hooks/use-task";
import { ThemeProvider } from "../../hooks/use-theme";

import type { UserTask } from "@/db/schema";

export function Providers({
  userId,
  currentPlan,
  defaultOpen,
  initialTasks,
  children,
}: {
  userId: string;
  currentPlan: string | null;
  defaultOpen?: boolean;
  initialTasks: UserTask[];
} & ThemeProviderProps) {
  return (
    <SessionProviderComponent>
      <NotificationProvider userId={userId}>
        <MobileProvider>
          <PlanProvider currentPlan={currentPlan}>
            <SidebarProvider defaultOpen={defaultOpen}>
              <ChatProvider>
                <TasksProvider initialTasks={initialTasks}>
                  <ReducedMotionProvider>
                    <ThemeProvider disableTransitionOnChange>
                      {children}
                    </ThemeProvider>
                  </ReducedMotionProvider>
                </TasksProvider>
              </ChatProvider>
            </SidebarProvider>
          </PlanProvider>
        </MobileProvider>
      </NotificationProvider>
    </SessionProviderComponent>
  );
}
