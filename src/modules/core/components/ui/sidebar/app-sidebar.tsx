"use client";

import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { useEffect } from "react";
import useSWR from "swr";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { Chat } from "@/db/schema";
import ChatSidebar from "@/modules/core/components/ui/sidebar/chat-sidebar";
import { UserProfileData } from "@/types/session";
import { fetcher } from "@/utils/common";

import AppFooter from "./app-footer";
import AppHeader from "./app-header";
import ChatHeader from "./chat-header";
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

  const {
    data: history,
    mutate,
    isLoading,
  } = useSWR<Array<Chat>>(session?.user ? "/api/chat/history" : null, fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    if (!isMobile) {
      mutate();
    }
  }, [isMobile, pathname, mutate]);

  if (isMobile)
    return (
      <Sidebar>
        <ChatHeader session={session} history={history} />
        <SidebarContent>
          <ChatSidebar
            session={session}
            history={history}
            mutate={mutate}
            isLoading={isLoading}
          />
        </SidebarContent>
        <AppFooter session={session} user={user} />
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
            <AppFooter session={session} user={user} isCollapsed />
          </Sidebar>
          <Sidebar
            collapsible="none"
            className="flex w-[calc(var(--sidebar-width-icon)_+_1px)] flex-1"
          >
            <ChatHeader session={session} history={history} />
            <SidebarContent>
              <ChatSidebar
                session={session}
                history={history}
                mutate={mutate}
                isLoading={isLoading}
              />
            </SidebarContent>
          </Sidebar>
        </>
      ) : (
        <>
          <AppHeader />
          <SidebarContent>
            <MainSidebar isPremium={isPremium} />
          </SidebarContent>
          <AppFooter session={session} user={user} />
        </>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
