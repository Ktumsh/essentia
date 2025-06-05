import { cookies } from "next/headers";
import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import { getSubscription } from "@/db/querys/payment-querys";
import { getCurrentUser } from "@/lib/current-user";

import { DEFAULT_CHAT_MODEL } from "./(chat)/_lib/models";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [session, cookiesStore] = await Promise.all([auth(), cookies()]);

  const userId = session?.user?.id as string;

  const userData = await getCurrentUser();

  const [subscription] = userData ? await getSubscription(userId) : [];
  const isPremium = subscription ? subscription?.isPremium : false;

  const modelIdFromCookie = cookiesStore.get("chat-model");

  if (!modelIdFromCookie) {
    return (
      <LayoutWrapper
        session={session}
        user={userData}
        isPremium={isPremium}
        selectedChatModel={DEFAULT_CHAT_MODEL}
      >
        {children}
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper
      session={session}
      user={userData}
      isPremium={isPremium}
      selectedChatModel={modelIdFromCookie.value}
    >
      {children}
    </LayoutWrapper>
  );
}
