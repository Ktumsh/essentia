"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import React from "react";

import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/kit/sidebar";
import { deleteAllChatsByUserId } from "@/db/querys/chat-querys";

import ChatClearHistory from "./chat-clear-history";

import type { ChatHistory } from "@/app/(main)/(chat)/_lib/utils";

interface ChatSidebarProps {
  session: Session | null;
  paginatedChatHistories?: ChatHistory[];
}

const ChatHeader = ({ session, paginatedChatHistories }: ChatSidebarProps) => {
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  const isEnabledChatHistory = paginatedChatHistories
    ? paginatedChatHistories.every((page) => page.chats.length > 0)
    : false;

  return (
    <SidebarGroup>
      {!isMobile && (
        <SidebarHeader className="mb-1">
          <div className="flex-1 text-left text-sm leading-tight">
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
            className="data-[active=true]:bg-accent border-border dark:border-alternative/50 data-[active=true]:hover:bg-accent rounded-md border text-sm focus-visible:outline-hidden"
          >
            <Plus />
            <span>Nuevo chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <ChatClearHistory
          clearChats={() =>
            deleteAllChatsByUserId({
              id: session?.user?.id as string,
            })
          }
          isEnabled={isEnabledChatHistory}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ChatHeader;
