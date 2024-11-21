"use client";

import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import useSWR from "swr";

import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { clearChats } from "@/db/chat-querys";
import HistoryLoading from "@/modules/chatbot/components/ui/history-loading";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { NewIcon } from "@/modules/icons/action";
import { Chat } from "@/types/chat";
import { Session } from "@/types/session";
import { fetcher } from "@/utils/common";

import ChatClearHistory from "./chat-clear-history";
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

  return (
    <>
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
            clearChats={clearChats}
            isEnabled={history ? history.length > 0 : false}
          />
        </SidebarMenu>
      </SidebarGroup>
      {isLoading ? (
        <HistoryLoading />
      ) : (
        <Suspense fallback={<HistoryLoading />}>
          <ChatHistory history={history} mutate={mutate} />
        </Suspense>
      )}
    </>
  );
};

export default ChatSidebar;
