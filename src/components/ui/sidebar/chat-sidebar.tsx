"use client";

import { Session } from "next-auth";
import { Suspense } from "react";

import HistoryLoading from "@/app/(main)/(chat)/_components/history-loading";

import ChatHistory from "./chat-history";

import type { ChatHistory as ChatHistoryType } from "@/app/(main)/(chat)/_lib/utils";
import type { SWRInfiniteKeyedMutator } from "swr/infinite";

interface ChatSidebarProps {
  session: Session | null;
  paginatedChatHistories?: ChatHistoryType[];
  mutate: SWRInfiniteKeyedMutator<ChatHistoryType[]>;
  isLoading: boolean;
  isValidating: boolean;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<ChatHistoryType[] | undefined>;
  isAtBottom: boolean;
}

const ChatSidebar = ({
  session,
  paginatedChatHistories,
  mutate,
  isLoading,
  isValidating,
  setSize,
  isAtBottom,
}: ChatSidebarProps) => {
  if (!session?.user) return null;

  return (
    <>
      {isLoading ? (
        <HistoryLoading />
      ) : (
        <Suspense fallback={<HistoryLoading />}>
          <ChatHistory
            paginatedChatHistories={paginatedChatHistories}
            mutate={mutate}
            isValidating={isValidating}
            setSize={setSize}
            isAtBottom={isAtBottom}
          />
        </Suspense>
      )}
    </>
  );
};

export default ChatSidebar;
