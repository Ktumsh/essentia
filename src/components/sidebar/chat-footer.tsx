"use client";

import { useParams } from "next/navigation";

import {
  SidebarFooter,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useChatContext } from "@/hooks/use-chat-context";

import { VisibilitySelector } from "../layout/visibility-selector";

interface ChatFooterProps {
  isMobile: boolean;
  isPremium: boolean;
}

const ChatFooter = ({ isMobile, isPremium }: ChatFooterProps) => {
  const params = useParams();

  const chatId = params.id;

  const { isReadonly, selectedVisibilityType } = useChatContext();

  if (!chatId) return null;

  if (isMobile) {
    if (isPremium) {
      return (
        <SidebarFooter className="gap-1">
          <SidebarGroupLabel>Visibilidad</SidebarGroupLabel>
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
          </SidebarMenu>
        </SidebarFooter>
      );
    }
  }

  if (isPremium) {
    return <SidebarFooter className="py-3"></SidebarFooter>;
  }
};

export default ChatFooter;
