"use client";

import { useChat } from "@ai-sdk/react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";

import { useChatContext } from "@/hooks/use-chat-context";
import { useChatModel } from "@/hooks/use-chat-model";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fetcher } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import ChatPanel from "./chat-panel";
import { Messages } from "./messages";
import { useAutoResume } from "../_hooks/use-auto-resume";
import { useUserMessageId } from "../_hooks/use-user-message-id";
import { generateUUID, getChatHistoryPaginationKey } from "../_lib/utils";

import type { VisibilityType } from "@/components/ui/layout/visibility-selector";
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
  initialVisibilityType: VisibilityType;
  session: Session | null;
  user: UserProfileData | null;
  autoResume: boolean;
}

export function Chat({
  id,
  initialMessages,
  isReadonly,
  initialVisibilityType,
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
    data,
    experimental_resume,
  } = useChat({
    id,
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    experimental_prepareRequestBody: (body) => ({
      id,
      message: body.messages.at(-1),
      selectedChatModel: model,
      selectedVisibilityType: initialVisibilityType,
    }),
    onFinish: () => {
      mutate(unstable_serialize(getChatHistoryPaginationKey));
      mutate("/api/remaining-messages");
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
      selectedVisibilityType: initialVisibilityType,
    });
  });

  useEffect(() => {
    const mostRecentDelta = data?.at(-1);
    if (!mostRecentDelta) return;

    const delta = mostRecentDelta as StreamingDelta;

    if (delta.type === "user-message-id") {
      setUserMessageIdFromServer(delta.content as string);
      return;
    }
  }, [data, setUserMessageIdFromServer]);

  const { data: votes } = useSWR<Array<ChatVote>>(
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    fetcher,
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  useAutoResume({
    autoResume,
    initialMessages,
    experimental_resume,
    data,
    setMessages,
  });

  return (
    <>
      <Messages
        chatId={id}
        status={status}
        votes={votes}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        isReadonly={isReadonly}
        user={user}
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
        isReadonly={isReadonly}
        user={user}
      />
    </>
  );
}
