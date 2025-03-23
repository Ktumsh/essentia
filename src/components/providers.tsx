"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProviderProps } from "next-themes";
import * as React from "react";

import { MobileProvider } from "@/hooks/use-mobile";
import { ReducedMotionProvider } from "@/hooks/use-reduce-motion";
import { SubscriptionProvider } from "@/hooks/use-subscription";

import { ChatProvider } from "../hooks/use-chat-context";
import { PlanProvider } from "../hooks/use-current-plan";
import { NotificationProvider } from "../hooks/use-notification";
import { TasksProvider } from "../hooks/use-task";
import { ThemeProvider } from "../hooks/use-theme";
import { SidebarProvider } from "./kit/sidebar";

import type { Payment, Subscription, UserTask } from "@/db/schema";

export function Providers({
  userId,
  currentPlan,
  defaultOpen,
  initialSubscription,
  initialPayment,
  initialTasks,
  initialMobileState,
  children,
}: {
  userId: string;
  currentPlan: "free" | "premium" | "premium-plus" | null;
  defaultOpen?: boolean;
  initialSubscription: Subscription | null;
  initialPayment: Payment | null;
  initialTasks: UserTask[];
  initialMobileState?: boolean;
} & ThemeProviderProps) {
  return (
    <SessionProvider>
      <SubscriptionProvider
        initialSubscription={initialSubscription}
        initialPayment={initialPayment}
      >
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
      </SubscriptionProvider>
    </SessionProvider>
  );
}
