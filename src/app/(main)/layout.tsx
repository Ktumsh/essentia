import LayoutWrapper from "@/modules/core/components/layout-wrapper";
import BottomNav from "@/modules/core/components/ui/bottom-navbar";
import Header from "@/modules/core/components/ui/header";
import MobileHeader from "@/modules/core/components/ui/mobile-header";
import WelcomeModal from "@/modules/core/components/ui/welcome-modal";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

import { auth } from "@@/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;

  return (
    <>
      {/* Header */}
      <Header profileData={profileData} />
      {/* Mobile Header */}
      <MobileHeader profileData={profileData} />
      <LayoutWrapper>{children}</LayoutWrapper>
      {/* Bottom Mobile Navbar */}
      <BottomNav />
      {!session && <WelcomeModal />}
    </>
  );
}
