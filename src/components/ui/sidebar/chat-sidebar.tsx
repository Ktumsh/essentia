"use client";

import { Session } from "next-auth";
import { Suspense } from "react";
import { KeyedMutator } from "swr";

import HistoryLoading from "@/app/(main)/(chat)/_components/history-loading";
import { Chat } from "@/db/schema";

import ChatHistory from "./chat-history";

interface ChatSidebarProps {
  session: Session | null;
  history?: Chat[];
  mutate: KeyedMutator<Chat[]>;
  isLoading: boolean;
}

const ChatSidebar = ({
  session,
  history,
  mutate,
  isLoading,
}: ChatSidebarProps) => {
  if (!session?.user) return null;

  return (
    <>
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
