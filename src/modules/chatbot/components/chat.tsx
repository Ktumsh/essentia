"use client";

import { Attachment, type Message } from "ai";
import { useChat } from "ai/react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import { useChatContext } from "@/modules/core/hooks/use-chat-context";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { UserProfileData } from "@/types/session";
import { fetcher } from "@/utils/common";

import ChatPanel from "./chat-panel";
import { VisibilityType } from "./visibility-selector";
import { useScrollToBottom } from "../hooks/use-scroll-to-bottom";
import { useUserMessageId } from "../hooks/use-user-message-id";
import { Messages } from "./ui/messages";

import type { ChatVote } from "@/db/schema";

type StreamingDelta = {
  type:
    | "text-delta"
    | "code-delta"
    | "title"
    | "id"
    | "suggestion"
    | "clear"
    | "finish"
    | "user-message-id"
    | "kind";

  content: string;
};

export interface ChatProps {
  id: string;
  initialMessages: Array<Message>;
  isReadonly: boolean;
  selectedVisibilityType: VisibilityType;
  session: Session | null;
  user: UserProfileData | null;
}

export function Chat({
  id,
  initialMessages,
  isReadonly,
  selectedVisibilityType,
  session,
  user,
}: ChatProps) {
  const { mutate } = useSWRConfig();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNewChatId] = useLocalStorage("new-chat-id", id);

  const { setChatData } = useChatContext();

  const { setUserMessageIdFromServer } = useUserMessageId();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
    data: streamingData,
  } = useChat({
    id,
    body: { id },
    initialMessages,
    experimental_throttle: 100,
    onFinish: () => {
      mutate("/api/chat/history");
    },
  });

  useEffect(() => {
    setNewChatId(id);
    setChatData({
      isReadonly: isReadonly,
      selectedVisibilityType: selectedVisibilityType,
    });
  });

  useEffect(() => {
    const mostRecentDelta = streamingData?.at(-1);
    if (!mostRecentDelta) return;

    const delta = mostRecentDelta as StreamingDelta;

    if (delta.type === "user-message-id") {
      setUserMessageIdFromServer(delta.content as string);
      return;
    }
  }, [streamingData, setUserMessageIdFromServer]);

  const { data: votes } = useSWR<Array<ChatVote>>(
    `/api/chat/vote?chatId=${id}`,
    fetcher,
  );

  const [containerRef, endRef, scrollToBottom, isAtBottom] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <>
      <Messages
        chatId={id}
        isLoading={isLoading}
        votes={votes}
        messages={messages}
        isReadonly={isReadonly}
        user={user}
        containerRef={containerRef}
        endRef={endRef}
        setMessages={setMessages}
        reload={reload}
      />

      <ChatPanel
        chatId={id}
        input={input}
        setInput={setInput}
        stop={stop}
        append={append}
        handleSubmit={handleSubmit}
        attachments={attachments}
        setAttachments={setAttachments}
        messages={messages}
        setMessages={setMessages}
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
