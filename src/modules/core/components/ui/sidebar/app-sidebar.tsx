"use client";

import { usePathname } from "next/navigation";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Sidebar } from "@/components/ui/sidebar";
import ChatSidebar from "@/modules/core/components/ui/sidebar/chat-sidebar";
import { Session, UserProfileData } from "@/types/session";

import AppHeader from "./app-header";
import MainSidebar from "./main-sidebar";

interface AppSidebarProps {
  session: Session;
  user: UserProfileData | null;
}

export function AppSidebar({ session, user }: AppSidebarProps) {
  const pathname = usePathname();

  const isMobile = useIsMobile();

  const isAIPage = pathname.startsWith("/essentia-ai");

  if (isAIPage) {
    return (
      <Sidebar>
        <AppHeader />
        <ChatSidebar session={session} />
      </Sidebar>
    );
  } else if (!isMobile && !isAIPage) {
    return (
      <Sidebar collapsible="icon">
        <AppHeader />
        <MainSidebar user={user} />
      </Sidebar>
    );
  }
}
