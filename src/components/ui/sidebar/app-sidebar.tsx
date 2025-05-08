"use client";

import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import useSWRInfinite from "swr/infinite";

import {
  getChatHistoryPaginationKey,
  type ChatHistory,
} from "@/app/(main)/(chat)/_lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { ScrollArea } from "@/components/kit/scroll-area";
import { Sidebar, SidebarContent, useSidebar } from "@/components/kit/sidebar";
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
}

export function AppSidebar({ session, user, isPremium }: AppSidebarProps) {
  const pathname = usePathname();

  const isMobile = useIsMobile();

  const { openMobile, setOpenMobile } = useSidebar();

  const isAIPage = pathname.startsWith("/essentia-ai");

  const isCollapsed = isAIPage && session;

  const {
    data: paginatedChatHistories,
    setSize,
    isValidating,
    isLoading,
    mutate,
  } = useSWRInfinite<ChatHistory>(getChatHistoryPaginationKey, fetcher, {
    fallbackData: [],
  });

  if (isMobile)
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile} direction="left">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Historial de chats</DrawerTitle>
            <DrawerDescription className="sr-only"></DrawerDescription>
          </DrawerHeader>
          <ChatHeader
            session={session}
            paginatedChatHistories={paginatedChatHistories}
          />
          <SidebarContent>
            <ChatSidebar
              session={session}
              paginatedChatHistories={paginatedChatHistories}
              mutate={mutate}
              isLoading={isLoading}
              isValidating={isValidating}
              setSize={setSize}
            />
          </SidebarContent>
          <AppFooter session={session} user={user} isMobile={isMobile} />
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
            />
          </Sidebar>
          <Sidebar
            collapsible="none"
            className="bg-background border-border my-2 flex h-auto flex-1 rounded-2xl border shadow-sm transition-opacity duration-300 group-data-[collapsible=icon]:pointer-events-none! group-data-[collapsible=icon]:opacity-0!"
          >
            <ChatHeader
              session={session}
              paginatedChatHistories={paginatedChatHistories}
            />
            <SidebarContent>
              <ScrollArea className="max-w-[221px] overflow-y-auto">
                <ChatSidebar
                  session={session}
                  paginatedChatHistories={paginatedChatHistories}
                  mutate={mutate}
                  isLoading={isLoading}
                  isValidating={isValidating}
                  setSize={setSize}
                />
              </ScrollArea>
            </SidebarContent>
            <ChatFooter isMobile={isMobile} isPremium={isPremium} />
          </Sidebar>
        </>
      ) : (
        <>
          <AppHeader />
          <SidebarContent>
            <ScrollArea
              className="h-[743px] overflow-y-auto"
              scrollThumbClassName="bg-background"
            >
              <MainSidebar isPremium={isPremium} />
            </ScrollArea>
          </SidebarContent>
          <AppFooter session={session} user={user} isMobile={isMobile} />
        </>
      )}
    </Sidebar>
  );
}
