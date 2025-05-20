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
import { useChatScrollEnd } from "@/hooks/use-chat-scroll-end";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, fetcher } from "@/lib/utils";

import AppFooter from "./app-footer";
import AppHeader from "./app-header";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";
import ChatSidebar from "./chat-sidebar";
import MainSidebar from "./main-sidebar";

import type { UserProfileData } from "@/lib/types";

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

  const isCollapsed = isAIPage && session?.user;

  const {
    data: paginatedChatHistories,
    setSize,
    isValidating,
    isLoading,
    mutate,
  } = useSWRInfinite<ChatHistory>(
    (pageIndex, previousPageData) =>
      session?.user
        ? getChatHistoryPaginationKey(pageIndex, previousPageData)
        : null,
    fetcher,
    {
      fallbackData: [],
    },
  );

  const { containerRef, onScroll, isAtBottom } = useChatScrollEnd();

  if (isMobile)
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile} direction="left">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Historial de chats</DrawerTitle>
            <DrawerDescription className="sr-only"></DrawerDescription>
          </DrawerHeader>
          <ChatHeader />
          <SidebarContent
            ref={containerRef}
            onScroll={onScroll}
            className="overflow-y-auto"
          >
            <ChatSidebar
              session={session}
              paginatedChatHistories={paginatedChatHistories}
              mutate={mutate}
              isLoading={isLoading}
              isValidating={isValidating}
              setSize={setSize}
            />
            <div
              aria-hidden="true"
              className={cn(
                "from-background via-background/75 pointer-events-none absolute right-2 bottom-0 left-0 z-10 h-16 bg-gradient-to-t opacity-100 transition-opacity",
                {
                  "opacity-0": isAtBottom,
                },
              )}
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
            className="bg-background border-border relative my-2 flex h-auto flex-1 overflow-hidden rounded-2xl border shadow-sm transition-opacity duration-300 group-data-[collapsible=icon]:pointer-events-none! group-data-[collapsible=icon]:opacity-0!"
          >
            <ChatHeader />
            <SidebarContent
              ref={containerRef}
              onScroll={onScroll}
              className="overflow-y-auto"
            >
              <ChatSidebar
                session={session}
                paginatedChatHistories={paginatedChatHistories}
                mutate={mutate}
                isLoading={isLoading}
                isValidating={isValidating}
                setSize={setSize}
              />
            </SidebarContent>
            <div
              aria-hidden="true"
              className={cn(
                "from-background via-background/75 pointer-events-none absolute right-2 bottom-0 left-0 z-10 h-16 bg-gradient-to-t opacity-100 transition-opacity",
                {
                  "opacity-0": isAtBottom,
                },
              )}
            />
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
