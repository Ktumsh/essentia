"use client";

import { usePathname } from "next/navigation";
import { Session } from "next-auth";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import ChatSidebar from "@/modules/core/components/ui/sidebar/chat-sidebar";
import { UserProfileData } from "@/types/session";

import AppFooter from "./app-footer";
import AppHeader from "./app-header";
import MainSidebar from "./main-sidebar";

interface AppSidebarProps {
  session: Session | null;
  user: UserProfileData | null;
  isPremium: boolean;
}

export function AppSidebar({ session, user, isPremium }: AppSidebarProps) {
  const pathname = usePathname();

  const isMobile = useIsMobile();

  const isAIPage = pathname.startsWith("/essentia-ai");

  const isCollapsed = isAIPage && session;

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
      {isAIPage && session ? (
        <>
          <Sidebar
            collapsible="none"
            className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r border-gray-200 dark:border-dark"
          >
            <AppHeader isCollapsed />
            <SidebarContent>
              <MainSidebar isCollapsed isPremium={isPremium} />
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
      ) : (
        <>
          <AppHeader />
          <SidebarContent>
            <MainSidebar isPremium={isPremium} />
          </SidebarContent>
          <AppFooter user={user} />
        </>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
