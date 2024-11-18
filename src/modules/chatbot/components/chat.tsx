"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { ComponentProps, useEffect, useState } from "react";
import { toast } from "sonner";

import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { Session, UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import ChatList from "./chat-list";
import ChatPanel from "./chat-panel";
import EmptyScreen from "./empty-screen";
import { useScrollAnchor } from "../hooks/use-scroll-anchor";

export interface ChatProps extends ComponentProps<"div"> {
  id: string;
  session?: Session | undefined;
  missingKeys: string[];
  profileData: UserProfileData | null;
  isPremium: boolean | null;
  initialMessages: Array<Message>;
}

export function Chat({
  id,
  className,
  session,
  missingKeys,
  profileData,
  isPremium,
  initialMessages,
}: ChatProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setNewChatId] = useLocalStorage("newChatId", id);
  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      id,
      body: { id },
      initialMessages,

      onFinish: () => {
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

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <div
      className="group flex h-[calc(100dvh-56px)] w-full min-w-0 flex-col overflow-y-auto"
      ref={scrollRef}
    >
      <div
        className={cn(
          "flex flex-1 flex-col pb-32 pt-4 md:pt-10 lg:pb-48",
          className,
        )}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList
            id={id}
            messages={messages}
            isShared={false}
            session={session}
            profileData={profileData}
          />
        ) : (
          <EmptyScreen />
        )}
        <div className="h-px w-full" ref={visibilityRef} />
      </div>

      <ChatPanel
        input={input}
        setInput={setInput}
        stop={stop}
        scrollToBottom={scrollToBottom}
        append={append}
        handleSubmit={handleSubmit}
        attachments={attachments}
        setAttachments={setAttachments}
        messages={messages}
        isAtBottom={isAtBottom}
        isLoading={isLoading}
        isPremium={isPremium}
        session={session}
      />
    </div>
  );
}
