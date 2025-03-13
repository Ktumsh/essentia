"use client";

import { ThemeProviderProps } from "next-themes";
import * as React from "react";

import { MobileProvider } from "@/hooks/use-mobile";
import { ReducedMotionProvider } from "@/hooks/use-reduce-motion";

import { ChatProvider } from "../hooks/use-chat-context";
import { PlanProvider } from "../hooks/use-current-plan";
import { NotificationProvider } from "../hooks/use-notification";
import SessionProviderComponent from "../hooks/use-session";
import { TasksProvider } from "../hooks/use-task";
import { ThemeProvider } from "../hooks/use-theme";
import { SidebarProvider } from "./kit/sidebar";

import type { UserTask } from "@/db/schema";

export function Providers({
  userId,
  currentPlan,
  defaultOpen,
  initialTasks,
  initialMobileState,
  children,
}: {
  userId: string;
  currentPlan: "free" | "premium" | "premium-plus" | null;
  defaultOpen?: boolean;
  initialTasks: UserTask[];
  initialMobileState?: boolean;
} & ThemeProviderProps) {
  return (
    <SessionProviderComponent>
      <NotificationProvider userId={userId}>
        <MobileProvider initialMobileState={initialMobileState}>
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
