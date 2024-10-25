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
    <Sidebar className="peer absolute inset-y-0 pt-14 z-30 hidden md:flex w-[250px] xl:w-[300px] -translate-x-full border-r border-gray-200 dark:border-base-dark bg-white dark:bg-base-full-dark duration-300 ease-in-out data-[state=open]:translate-x-0">
      {isLoading ? (
        <HistoryLoading />
      ) : (
        <ChatHistory chats={history} mutate={mutate} />
      )}
    </Sidebar>
  );
};

export default ChatSidebar;
