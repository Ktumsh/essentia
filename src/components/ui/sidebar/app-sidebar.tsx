"use client";

import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { useEffect } from "react";
import useSWR from "swr";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { ScrollArea } from "@/components/kit/scroll-area";
import { Sidebar, SidebarContent, useSidebar } from "@/components/kit/sidebar";
import { Chat } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, fetcher } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import AppFooter from "./app-footer";
import AppHeader from "./app-header";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";
import ChatSidebar from "./chat-sidebar";
import MainSidebar from "./main-sidebar";

interface AppSidebarProps {
  session: Session | null;
  user: UserProfileData | null;
  isPremium: boolean;
  selectedChatModel: string;
}

export function AppSidebar({
  session,
  user,
  isPremium,
  selectedChatModel,
}: AppSidebarProps) {
  const pathname = usePathname();

  const isMobile = useIsMobile();

  const { openMobile, setOpenMobile } = useSidebar();

  const isAIPage = pathname.startsWith("/essentia-ai");

  const isCollapsed = isAIPage && session;

  const {
    data: history,
    mutate,
    isLoading,
  } = useSWR<Array<Chat>>(session?.user ? "/api/history" : null, fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    if (!isMobile) {
      mutate();
    }
  }, [isMobile, pathname, mutate]);

  if (isMobile)
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile} direction="left">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Historial de chats</DrawerTitle>
            <DrawerDescription className="sr-only"></DrawerDescription>
          </DrawerHeader>
          <ChatHeader session={session} history={history} />
          <SidebarContent>
            <ChatSidebar
              session={session}
              history={history}
              mutate={mutate}
              isLoading={isLoading}
            />
          </SidebarContent>
          <AppFooter
            session={session}
            user={user}
            isMobile={isMobile}
            selectedChatModel={selectedChatModel}
          />
        </DrawerContent>
      </Drawer>
    );

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className={cn(
        "gap-2",
        isCollapsed && "overflow-hidden *:data-[sidebar=sidebar]:flex-row",
      )}
    >
      {isAIPage && session ? (
        <>
          <Sidebar
            collapsible="none"
            className="w-[calc(var(--sidebar-width-icon))]!"
          >
            <AppHeader isCollapsed />
            <SidebarContent>
              <MainSidebar isCollapsed isPremium={isPremium} />
            </SidebarContent>
            <AppFooter
              session={session}
              user={user}
              isCollapsed
              isMobile={isMobile}
              selectedChatModel={selectedChatModel}
            />
          </Sidebar>
          <Sidebar
            collapsible="none"
            className="bg-background border-border my-2 flex h-auto flex-1 rounded-2xl border shadow-sm transition-opacity duration-300 group-data-[collapsible=icon]:pointer-events-none! group-data-[collapsible=icon]:opacity-0!"
          >
            <ChatHeader session={session} history={history} />
            <SidebarContent>
              <ScrollArea className="max-w-[221px] overflow-y-auto">
                <ChatSidebar
                  session={session}
                  history={history}
                  mutate={mutate}
                  isLoading={isLoading}
                />
              </ScrollArea>
            </SidebarContent>
            <ChatFooter
              session={session}
              isMobile={isMobile}
              isPremium={isPremium}
              selectedChatModel={selectedChatModel}
            />
          </Sidebar>
        </>
      ) : (
        <>
          <AppHeader />
          <SidebarContent>
            <MainSidebar isPremium={isPremium} />
          </SidebarContent>
          <AppFooter
            session={session}
            user={user}
            isMobile={isMobile}
            selectedChatModel={selectedChatModel}
          />
        </>
      )}
    </Sidebar>
  );
}
