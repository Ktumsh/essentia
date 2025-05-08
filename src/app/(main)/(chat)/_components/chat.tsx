"use client";

import { useChat } from "@ai-sdk/react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

import { VisibilityType } from "@/components/ui/layout/visibility-selector";
import { useChatContext } from "@/hooks/use-chat-context";
import { useChatModel } from "@/hooks/use-chat-model";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fetcher } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import ChatPanel from "./chat-panel";
import { Messages } from "./messages";
import { useScrollToBottom } from "../_hooks/use-scroll-to-bottom";
import { useUserMessageId } from "../_hooks/use-user-message-id";
import { generateUUID } from "../_lib/utils";

import type { ChatVote } from "@/db/schema";
import type { Attachment, UIMessage } from "ai";

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
  initialMessages: Array<UIMessage>;
  isReadonly: boolean;
  selectedVisibilityType: VisibilityType;
  session: Session | null;
  user: UserProfileData | null;
  autoResume: boolean;
}

export function Chat({
  id,
  initialMessages,
  isReadonly,
  selectedVisibilityType,
  session,
  user,
  autoResume,
}: ChatProps) {
  const { mutate } = useSWRConfig();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNewChatId] = useLocalStorage("new-chat-id", id);

  const { setChatData } = useChatContext();

  const { setUserMessageIdFromServer } = useUserMessageId();

  const { model } = useChatModel();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
    data: streamingData,
    experimental_resume,
  } = useChat({
    id,
    experimental_prepareRequestBody: (body) => ({
      id,
      message: body.messages.at(-1),
      selectedChatModel: model,
      selectedVisibilityType,
    }),
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onFinish: () => {
      mutate("/api/history");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Ha ocurrido un error. ¡Por favor intenta de nuevo!");
    },
  });

  useEffect(() => {
    if (autoResume) {
      experimental_resume();
    }

    // note: this hook has no dependencies since it only needs to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    fetcher,
  );

  const [containerRef, endRef, scrollToBottom, isAtBottom] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <>
      <Messages
        chatId={id}
        status={status}
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
        status={status}
        session={session}
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
        isReadonly={isReadonly}
        user={user}
      />
    </>
  );
}
