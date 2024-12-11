import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import { getSubscription } from "@/db/querys/payment-querys";
import LayoutWrapper from "@/modules/core/components/ui/layout-wrapper";
import { getUserProfileData } from "@/utils/profile";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const userData = session ? await getUserProfileData({ session }) : null;
  const [subscription] = userData
    ? await getSubscription(session?.user?.id as string)
    : [];
  const isPremium = subscription ? subscription?.isPremium : false;

  return (
    <LayoutWrapper session={session} user={userData} isPremium={isPremium}>
      {children}
    </LayoutWrapper>
  );
}
