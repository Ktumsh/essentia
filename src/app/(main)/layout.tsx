import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import BottomNav from "@/modules/core/components/ui/layout/bottom-navbar";
import DesktopHeader from "@/modules/core/components/ui/layout/desktop-header";
import MobileHeader from "@/modules/core/components/ui/layout/mobile-header";
import LayoutWrapper from "@/modules/core/components/ui/layout-wrapper";
import WelcomeModal from "@/modules/core/components/ui/welcome-modal";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await auth()) as Session;
  const userData = session ? await getUserProfileData(session) : null;

  return (
    <>
      {/* Header */}
      {/* Mobile Header */}
      <MobileHeader user={userData} />
      <LayoutWrapper session={session} user={userData}>
        <DesktopHeader user={userData} />
        {children}
      </LayoutWrapper>
      {/* Bottom Mobile Navbar */}
      <BottomNav user={userData} />
      {!session && <WelcomeModal />}
    </>
  );
}
