import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import { getUserNotifications } from "@/db/querys/notification-querys";
import { getSubscription } from "@/db/querys/payment-querys";
import LayoutWrapper from "@/modules/core/components/ui/layout-wrapper";
import { getUserProfileData } from "@/utils/profile";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  const userId = session?.user?.id as string;

  const userData = session ? await getUserProfileData({ session }) : null;

  const [subscription] = userData ? await getSubscription(userId) : [];
  const isPremium = subscription ? subscription?.isPremium : false;

  const notifications = session ? await getUserNotifications(userId) : [];

  return (
    <LayoutWrapper
      session={session}
      user={userData}
      isPremium={isPremium}
      notifications={notifications}
    >
      {children}
    </LayoutWrapper>
  );
}
