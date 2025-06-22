"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatProvider } from "@/hooks/use-chat-context";
import { CurrentPlanProvider } from "@/hooks/use-current-plan";
import { NotificationProvider } from "@/hooks/use-notification";
import { ProfileMessageProvider } from "@/hooks/use-profile-message";
import { SubscriptionProvider } from "@/hooks/use-subscription";
import { TasksProvider } from "@/hooks/use-task";
import { UserProfileProvider } from "@/hooks/use-user-profile";

import type { Payment, Subscription, UserTask } from "@/db/schema";
import type { UserProfileData } from "@/lib/types";

interface MainProvidersProps {
  userId: string;
  initialUserData: UserProfileData | null;
  initialSubscription: Subscription | null;
  initialPayment: Payment | null;
  currentPlan: "free" | "premium" | "premium-plus" | null;
  initialTasks: Array<UserTask>;
  defaultOpen: boolean;
  children: React.ReactNode;
}

const MainProviders = ({
  userId,
  initialUserData,
  initialSubscription,
  initialPayment,
  currentPlan,
  initialTasks,
  defaultOpen,
  children,
}: MainProvidersProps) => {
  return (
    <UserProfileProvider initialUserData={initialUserData}>
      <ProfileMessageProvider user={initialUserData}>
        <SubscriptionProvider
          initialSubscription={initialSubscription}
          initialPayment={initialPayment}
        >
          <NotificationProvider userId={userId}>
            <CurrentPlanProvider currentPlan={currentPlan}>
              <TasksProvider initialTasks={initialTasks}>
                <SidebarProvider defaultOpen={defaultOpen}>
                  <ChatProvider>{children}</ChatProvider>
                </SidebarProvider>
              </TasksProvider>
            </CurrentPlanProvider>
          </NotificationProvider>
        </SubscriptionProvider>
      </ProfileMessageProvider>
    </UserProfileProvider>
  );
};

export default MainProviders;
