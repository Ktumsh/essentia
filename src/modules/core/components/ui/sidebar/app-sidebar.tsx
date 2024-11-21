"use client";

import { usePathname } from "next/navigation";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import ChatSidebar from "@/modules/core/components/ui/sidebar/chat-sidebar";
import { Session, UserProfileData } from "@/types/session";

import AppFooter from "./app-footer";
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

  const isCollapsed = isAIPage;

  if (isMobile)
    return (
      <Sidebar>
        <AppHeader />
        <SidebarContent>
          <ChatSidebar session={session} />
        </SidebarContent>
        <AppFooter user={user} />
      </Sidebar>
    );

  return (
    <Sidebar
      collapsible="icon"
      className={
        isCollapsed ? "overflow-hidden [&>[data-sidebar=sidebar]]:flex-row" : ""
      }
    >
      {!isAIPage ? (
        <>
          <AppHeader />
          <SidebarContent>
            <MainSidebar />
          </SidebarContent>
          <AppFooter user={user} />
        </>
      ) : (
        <>
          <Sidebar
            collapsible="none"
            className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r border-gray-200 dark:border-dark"
          >
            <AppHeader isCollapsed />
            <SidebarContent>
              <MainSidebar isCollapsed />
            </SidebarContent>
            <AppFooter user={user} isCollapsed />
          </Sidebar>
          <Sidebar
            collapsible="none"
            className="flex w-[calc(var(--sidebar-width-icon)_+_1px)] flex-1"
          >
            <SidebarContent>
              <ChatSidebar session={session} />
            </SidebarContent>
          </Sidebar>
        </>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
