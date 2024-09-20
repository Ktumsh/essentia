import { ReactNode } from "react";
import LayoutWrapper from "@/modules/core/components/wrappers/layout-wrapper";
import BottomNav from "@/modules/core/components/ui/layout/bottom-navbar";
import Header from "@/modules/core/components/ui/layout/header";
import MobileHeader from "@/modules/core/components/ui/layout/mobile-header";
import WelcomeModal from "@/modules/core/components/ui/modals/welcome-modal";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

import { auth } from "@@/auth";
import { getChats } from "./essentia-ai/actions";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await auth()) as Session;
  const profileData = session ? await getUserProfileData(session) : null;

  const chats = session ? await getChats(session.user.id) : [];

  return (
    <>
      {/* Header */}
      <Header profileData={profileData} />
      {/* Mobile Header */}
      <MobileHeader profileData={profileData} chats={chats} />
      <LayoutWrapper>{children}</LayoutWrapper>
      {/* Bottom Mobile Navbar */}
      <BottomNav />
      {!session && <WelcomeModal />}
    </>
  );
}
