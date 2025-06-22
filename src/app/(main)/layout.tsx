import { cookies } from "next/headers";
import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import ProfileMessage from "@/components/layout/profile-message";
import { getPaymentDetails, getSubscription } from "@/db/querys/payment-querys";
import { getUserTasks } from "@/db/querys/task-querys";
import { getCurrentUser } from "@/lib/current-user";

import { DEFAULT_CHAT_MODEL } from "./(chat)/_lib/models";
import MainProviders from "./_components/main-providers";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [session, cookieStore, userData] = await Promise.all([
    auth(),
    cookies(),
    getCurrentUser(),
  ]);

  const userId = session?.user?.id as string;

  const [[subscription], [payment], initialTasks] = userId
    ? await Promise.all([
        getSubscription(userId),
        getPaymentDetails(userId),
        getUserTasks(userId),
      ])
    : [[null], [null], []];

  const currentPlan = subscription?.type ?? "free";
  const isPremium = subscription?.isPremium ?? false;

  const modelIdFromCookie = cookieStore.get("chat-model")?.value;
  const selectedChatModel = modelIdFromCookie ?? DEFAULT_CHAT_MODEL;
  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  return (
    <MainProviders
      userId={userId}
      initialUserData={userData}
      initialSubscription={subscription}
      initialPayment={payment}
      currentPlan={currentPlan}
      initialTasks={initialTasks}
      defaultOpen={!isCollapsed}
    >
      <ProfileMessage user={userData} session={session} />
      <LayoutWrapper
        session={session}
        user={userData}
        isPremium={isPremium}
        selectedChatModel={selectedChatModel}
      >
        {children}
      </LayoutWrapper>
    </MainProviders>
  );
}
