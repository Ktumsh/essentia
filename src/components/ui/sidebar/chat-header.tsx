"use client";

import { useRouter } from "next/navigation";
import React from "react";

import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/kit/sidebar";

const ChatHeader = () => {
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  /*   const isEnabledChatHistory = paginatedChatHistories
    ? paginatedChatHistories.every((page) => page.chats.length > 0)
    : false; */

  return (
    <SidebarGroup>
      {!isMobile && (
        <SidebarHeader className="mb-1">
          <div className="flex-1 text-center text-sm leading-tight">
            <h4 className="font-merriweather truncate font-semibold">
              Historial de chats
            </h4>
          </div>
        </SidebarHeader>
      )}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Nuevo chat"
            isActive
            onClick={() => {
              setOpenMobile(false);
              router.push("/essentia-ai");
              router.refresh();
            }}
            className="dark:data-[active=true]:bg-accent/50 dark:border-alternative/50 dark:hover:data-[active=true]:bg-accent/50 justify-center rounded-md border text-sm focus-visible:outline-hidden data-[active=true]:bg-slate-50 data-[active=true]:hover:bg-slate-50"
          >
            <span>Nuevo chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {/* <ChatClearHistory
          clearChats={() =>
            deleteAllChatsByUserId({
              id: session?.user?.id as string,
            })
          }
          isEnabled={isEnabledChatHistory}
        /> */}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ChatHeader;
