"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProviderProps } from "next-themes";
import * as React from "react";

import { ViewModeProvider } from "@/app/(main)/historial-medico/_hooks/use-view-mode";
import { UserSubscriptionInfo } from "@/db/querys/user-querys";
import { ChatModelProvider } from "@/hooks/use-chat-model";
import { MobileProvider } from "@/hooks/use-mobile";
import { ProfileMessageProvider } from "@/hooks/use-profile-message";
import { ReducedMotionProvider } from "@/hooks/use-reduce-motion";
import { SubscriptionProvider } from "@/hooks/use-subscription";
import { UserProfileProvider } from "@/hooks/use-user-profile";
import { UserSubscriptionProvider } from "@/hooks/use-user-subscription";

import { ChatProvider } from "../hooks/use-chat-context";
import { CurrentPlanProvider } from "../hooks/use-current-plan";
import { NotificationProvider } from "../hooks/use-notification";
import { TasksProvider } from "../hooks/use-task";
import { ThemeProvider } from "../hooks/use-theme";
import { SidebarProvider } from "./ui/sidebar";

import type { Payment, Subscription, UserTask } from "@/db/schema";
import type { UserProfileData } from "@/lib/types";

export function Providers({
  userId,
  currentPlan,
  defaultOpen,
  initialUserData,
  initialSubscription,
  initialPayment,
  initialTasks,
  initialMobileState,
  initialUserSubscription,
  initialMode,
  children,
}: {
  userId: string;
  currentPlan: "free" | "premium" | "premium-plus" | null;
  defaultOpen?: boolean;
  initialUserData: UserProfileData | null;
  initialSubscription: Subscription | null;
  initialPayment: Payment | null;
  initialTasks: UserTask[];
  initialMobileState?: boolean;
  initialUserSubscription: UserSubscriptionInfo;
  initialMode: "grid" | "list";
} & ThemeProviderProps) {
  return (
    <SessionProvider>
      <UserProfileProvider initialUserData={initialUserData}>
        <ProfileMessageProvider user={initialUserData}>
          <UserSubscriptionProvider initialData={initialUserSubscription}>
            <SubscriptionProvider
              initialSubscription={initialSubscription}
              initialPayment={initialPayment}
            >
              <NotificationProvider userId={userId}>
                <MobileProvider initialMobileState={initialMobileState}>
                  <CurrentPlanProvider currentPlan={currentPlan}>
                    <SidebarProvider defaultOpen={defaultOpen}>
                      <ChatProvider>
                        <ChatModelProvider>
                          <TasksProvider initialTasks={initialTasks}>
                            <ReducedMotionProvider>
                              <ThemeProvider disableTransitionOnChange>
                                <ViewModeProvider initialMode={initialMode}>
                                  {children}
                                </ViewModeProvider>
                              </ThemeProvider>
                            </ReducedMotionProvider>
                          </TasksProvider>
                        </ChatModelProvider>
                      </ChatProvider>
                    </SidebarProvider>
                  </CurrentPlanProvider>
                </MobileProvider>
              </NotificationProvider>
            </SubscriptionProvider>
          </UserSubscriptionProvider>
        </ProfileMessageProvider>
      </UserProfileProvider>
    </SessionProvider>
  );
}
