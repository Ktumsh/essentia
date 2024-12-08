import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import { getSubscription } from "@/db/querys/payment-querys";
import BottomNav from "@/modules/core/components/ui/layout/bottom-navbar";
import DesktopHeader from "@/modules/core/components/ui/layout/desktop-header";
import MobileHeader from "@/modules/core/components/ui/layout/mobile-header";
import LayoutWrapper from "@/modules/core/components/ui/layout-wrapper";
import WelcomeModal from "@/modules/core/components/ui/welcome-modal";
import { getUserProfileData } from "@/utils/profile";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const userData = session ? await getUserProfileData(session) : null;
  const [subscription] = userData
    ? await getSubscription(session?.user?.id as string)
    : [];
  const isPremium = subscription ? subscription?.isPremium : false;

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader user={userData} />
      <LayoutWrapper session={session} user={userData} isPremium={isPremium}>
        {/* Header */}
        <DesktopHeader
          user={userData}
          selectedVisibility="private"
          isReadonly={false}
        />
        {children}
      </LayoutWrapper>
      {/* Bottom Mobile Navbar */}
      <BottomNav user={userData} />
      {!session && <WelcomeModal />}
    </>
  );
}
