"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { ComponentProps, useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import DesktopHeader from "@/modules/core/components/ui/layout/desktop-header";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { UserProfileData } from "@/types/session";
import { fetcher } from "@/utils/common";

import ChatPanel from "./chat-panel";
import { Messages } from "./messages";
import { VisibilityType } from "./visibility-selector";
import { useScrollToBottom } from "../hooks/use-scroll-to-bottom";

import type { Chat as ChatType, ChatVote } from "@/db/schema";

export interface ChatProps extends ComponentProps<"div"> {
  id: string;
  chat?: ChatType;
  initialMessages: Array<Message>;
  isReadonly: boolean;
  selectedVisibilityType: VisibilityType;
  session: Session | null;
  user: UserProfileData | null;
}

export function Chat({
  id,
  chat,
  initialMessages,
  isReadonly,
  selectedVisibilityType,
  session,
  user,
}: ChatProps) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      id,
      body: { id },
      initialMessages,
      onFinish: () => {
        mutate("/api/chat/history");
        router.push(`/essentia-ai/chat/${id}`);
      },
    });

  useEffect(() => {
    setNewChatId(id);
  });

  const { data: votes } = useSWR<Array<ChatVote>>(
    `/api/chat/vote?chatId=${id}`,
    fetcher,
  );

  const [containerRef, endRef, scrollToBottom, isAtBottom] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <>
      <DesktopHeader
        user={user}
        isReadonly={isReadonly}
        selectedVisibilityType={selectedVisibilityType}
      />

      <Messages
        id={id}
        chat={chat as ChatType}
        isLoading={isLoading}
        votes={votes}
        messages={messages}
        isReadonly={isReadonly}
        user={user}
        containerRef={containerRef}
        endRef={endRef}
      />

      <ChatPanel
        input={input}
        setInput={setInput}
        stop={stop}
        append={append}
        handleSubmit={handleSubmit}
        attachments={attachments}
        setAttachments={setAttachments}
        messages={messages}
        isLoading={isLoading}
        session={session}
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
        isReadonly={isReadonly}
        user={user}
      />
    </>
  );
}
