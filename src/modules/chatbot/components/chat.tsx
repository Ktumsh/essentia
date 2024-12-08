"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { Session } from "next-auth";
import { ComponentProps, useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

import { type ChatVote } from "@/db/schema";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { UserProfileData } from "@/types/session";
import { fetcher } from "@/utils/common";

import ChatPanel from "./chat-panel";
import { Messages } from "./messages";
import { useScrollToBottom } from "../hooks/use-scroll-to-bottom";

export interface ChatProps extends ComponentProps<"div"> {
  id: string;
  initialMessages: Array<Message>;
  isReadonly: boolean;
  missingKeys: string[];
  session: Session | null;
  user: UserProfileData | null;
  isPremium: boolean | null;
}

export function Chat({
  id,
  initialMessages,
  isReadonly,
  missingKeys,
  session,
  user,
  isPremium,
}: ChatProps) {
  const { mutate } = useSWRConfig();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      id,
      body: { id },
      initialMessages,
      onFinish: () => {
        mutate("/api/chat/history");
        window.history.replaceState({}, "", `/essentia-ai/chat/${id}`);
      },
    });

  useEffect(() => {
    setNewChatId(id);
  });

  useEffect(() => {
    missingKeys.map((key) => {
      toast.error(`Falta la variable de entorno ${key}!`);
    });
  }, [missingKeys]);

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
        isPremium={isPremium}
        session={session}
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
      />
    </>
  );
}
