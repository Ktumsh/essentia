"use client";

import { useParams } from "next/navigation";
import React from "react";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { VisibilitySelector } from "@/modules/chatbot/components/visibility-selector";
import { useChatContext } from "@/modules/core/hooks/use-chat-context";

const ChatFooter = ({ isMobile }: { isMobile: boolean }) => {
  const params = useParams();

  const chatId = params.id;

  const { isReadonly, selectedVisibilityType } = useChatContext();

  if (!isMobile) return null;

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          {!isReadonly && chatId && (
            <VisibilitySelector
              chatId={chatId as string}
              selectedVisibilityType={selectedVisibilityType || "private"}
              isMobile={isMobile}
            />
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default ChatFooter;
