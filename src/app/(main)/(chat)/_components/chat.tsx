"use client";

import { useChat } from "@ai-sdk/react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { useLocalStorage } from "usehooks-ts";

import { useChatContext } from "@/hooks/use-chat-context";
import { useChatModel } from "@/hooks/use-chat-model";
import { fetcher } from "@/utils";

import ChatPanel from "./chat-panel";
import { Messages } from "./messages";
import { useAutoResume } from "../_hooks/use-auto-resume";
import { ChatSDKError } from "../_lib/errors";
import {
  fetchWithErrorHandlers,
  generateUUID,
  getChatHistoryPaginationKey,
} from "../_lib/utils";

import type { ChatVote } from "@/db/schema";
import type { UserProfileData, VisibilityType } from "@/lib/types";
import type { Attachment, UIMessage } from "ai";

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
  const [, setNewChatId] = useLocalStorage<string>("new-chat-id", id);

  const { setChatData } = useChatContext();

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
    sendExtraMessageFields: true,
    generateId: generateUUID,
    fetch: fetchWithErrorHandlers,
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
      if (error instanceof ChatSDKError) {
        toast.error(error.message);
      }
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
