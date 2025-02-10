"use client";

import { useParams, usePathname } from "next/navigation";
import { Session } from "next-auth";
import React from "react";

import {
  SidebarFooter,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModelSelector } from "@/modules/chatbot/components/ui/model-selector";
import { VisibilitySelector } from "@/modules/chatbot/components/visibility-selector";
import { useChatContext } from "@/modules/core/hooks/use-chat-context";

interface ChatFooterProps {
  isMobile: boolean;
  isPremium: boolean;
  session: Session | null;
  selectedChatModel: string;
}

const ChatFooter = ({
  isMobile,
  isPremium,
  session,
  selectedChatModel,
}: ChatFooterProps) => {
  const pathname = usePathname();
  const params = useParams();

  const chatId = params.id;

  const isAIPage = pathname.startsWith("/essentia-ai");

  const { isReadonly, selectedVisibilityType } = useChatContext();

  if (!isMobile) return null;

  if (isPremium) {
    return (
      <SidebarFooter className="gap-1">
        <SidebarGroupLabel>Opciones del chat</SidebarGroupLabel>
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            {!isReadonly && chatId && (
              <VisibilitySelector
                chatId={chatId as string}
                selectedVisibilityType={selectedVisibilityType || "private"}
                isMobile={isMobile}
              />
            )}
          </SidebarMenuItem>
          <SidebarMenuItem>
            {!isReadonly && isAIPage && session && (
              <ModelSelector
                selectedModelId={selectedChatModel}
                isMobile={isMobile}
              />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    );
  }
};

export default ChatFooter;
