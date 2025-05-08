import { cookies } from "next/headers";
import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import LayoutWrapper from "@/components/ui/layout/layout-wrapper";
import { getSubscription } from "@/db/querys/payment-querys";
import { getUserProfileData } from "@/utils/profile";

import { DEFAULT_CHAT_MODEL } from "./(chat)/_lib/models";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  const userId = session?.user?.id as string;

  const userData = userId ? await getUserProfileData({ userId }) : null;

  const [subscription] = userData ? await getSubscription(userId) : [];
  const isPremium = subscription ? subscription?.isPremium : false;

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

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
