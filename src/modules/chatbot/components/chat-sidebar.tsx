"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

import useWindowSize from "@/modules/core/hooks/use-window-size";
import { Chat } from "@/types/chat";
import { Session } from "@/types/session";
import { fetcher } from "@/utils/common";

import ChatHistory from "./chat-history";
import { Sidebar } from "./sidebar";
import HistoryLoading from "../components/ui/history-loading";

interface ChatSidebarProps {
  session: Session;
}

const ChatSidebar = ({ session }: ChatSidebarProps) => {
  const pathname = usePathname();
  const windowSize = useWindowSize();
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
    <Sidebar className="peer absolute inset-y-0 z-30 hidden w-[250px] -translate-x-full border-r border-gray-200 bg-white pt-14 duration-300 ease-in-out data-[state=open]:translate-x-0 dark:border-dark dark:bg-full-dark md:flex xl:w-[300px]">
      {isLoading ? (
        <HistoryLoading />
      ) : (
        <ChatHistory chats={history} mutate={mutate} />
      )}
    </Sidebar>
  );
};

export default ChatSidebar;
