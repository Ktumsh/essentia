"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { clearChats } from "@/db/chat-querys";
import ClearHistory from "@/modules/chatbot/components/clear-history";
import HistoryLoading from "@/modules/chatbot/components/ui/history-loading";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { NewIcon } from "@/modules/icons/action";
import { Chat } from "@/types/chat";
import { Session } from "@/types/session";
import { fetcher } from "@/utils/common";

import ChatHistory from "./chat-history";

interface ChatSidebarProps {
  session: Session;
}

const ChatSidebar = ({ session }: ChatSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const windowSize = useWindowSize();
  const { setOpenMobile } = useSidebar();
  const {
    data: history,
    mutate,
    isLoading,
  } = useSWR<Array<Chat>>(session?.user ? "/api/chat/history" : null, fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    if (windowSize.width > 768) {
      mutate();
    }
  }, [windowSize.width, pathname, mutate]);

  if (!session?.user) return null;

  return isLoading ? (
    <HistoryLoading />
  ) : (
    <>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <div className="flex items-center p-2">
            <h4 className="text-sm font-medium text-main dark:text-white">
              Historial de chat
            </h4>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="rounded-md bg-gray-100 text-sm focus-visible:outline-none dark:bg-dark"
                onClick={() => {
                  setOpenMobile(false);
                  router.push("/essentia-ai");
                  router.refresh();
                }}
              >
                <NewIcon />
                <span>Nuevo chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <ChatHistory history={history} mutate={mutate} />
      </SidebarContent>
      <SidebarFooter>
        <ClearHistory
          clearChats={clearChats}
          isEnabled={history ? history.length > 0 : false}
        />
      </SidebarFooter>
    </>
  );
};

export default ChatSidebar;
