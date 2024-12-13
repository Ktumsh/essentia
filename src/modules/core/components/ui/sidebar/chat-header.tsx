"use client";

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
} from "@/components/ui/sidebar";
import { deleteAllChatsByUserId } from "@/db/querys/chat-querys";
import { Chat } from "@/db/schema";
import { NewIcon } from "@/modules/icons/action";

import ChatClearHistory from "./chat-clear-history";

interface ChatSidebarProps {
  session: Session | null;
  history: Chat[] | undefined;
}

const ChatHeader = ({ session, history }: ChatSidebarProps) => {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarHeader>
          <SidebarMenuItem>
            <div className="flex-1 text-left text-sm leading-tight">
              <h4 className="truncate font-semibold">Historial de chats</h4>
            </div>
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Nuevo chat"
            onClick={() => {
              setOpenMobile(false);
              router.push("/essentia-ai");
              router.refresh();
            }}
            className="rounded-md bg-gray-100 text-sm focus-visible:outline-none dark:bg-dark"
          >
            <NewIcon />
            <span>Nuevo chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <ChatClearHistory
          clearChats={() =>
            deleteAllChatsByUserId({
              id: session?.user?.id as string,
            })
          }
          isEnabled={history ? history.length > 0 : false}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ChatHeader;
