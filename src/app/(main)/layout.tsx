import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import BottomNav from "@/modules/core/components/ui/layout/bottom-navbar";
import Header from "@/modules/core/components/ui/layout/header";
import MobileHeader from "@/modules/core/components/ui/layout/mobile-header";
import WelcomeModal from "@/modules/core/components/ui/modals/welcome-modal";
import LayoutWrapper from "@/modules/core/components/wrappers/layout-wrapper";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;

  return (
    <>
      {/* Header */}
      {/* Mobile Header */}
      <MobileHeader profileData={profileData} />
      <LayoutWrapper session={session} user={profileData}>
        <Header profileData={profileData} />

        {children}
      </LayoutWrapper>
      {/* Bottom Mobile Navbar */}
      <BottomNav profileData={profileData} />
      {!session && <WelcomeModal />}
    </>
  );
}
