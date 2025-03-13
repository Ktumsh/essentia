"use client";

import { useParams, usePathname } from "next/navigation";
import { Session } from "next-auth";

import {
  SidebarFooter,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { useChatContext } from "@/hooks/use-chat-context";

import { ModelSelector } from "../layout/model-selector";
import { VisibilitySelector } from "../layout/visibility-selector";

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

  if (isMobile) {
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
  }

  if (isPremium) {
    return <SidebarFooter className="py-3"></SidebarFooter>;
  }
};

export default ChatFooter;
