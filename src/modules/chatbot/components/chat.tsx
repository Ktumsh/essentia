"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { ComponentProps, useEffect, useState } from "react";
import { toast } from "sonner";

import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { Session, UserProfileData } from "@/types/session";

import ChatPanel from "./chat-panel";
import Overview from "./overview";
import PreviewMessage from "../components/ui/message";
import { useScrollToBottom } from "../hooks/use-scroll-to-bottom";

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

  const [containerRef, endRef, scrollToBottom, isAtBottom] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <>
      <div
        className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll pt-4"
        ref={containerRef}
      >
        {messages.length === 0 && <Overview />}

        {messages.map((message, index) => (
          <PreviewMessage
            key={`${message.id}-${index}`}
            message={message}
            profileData={profileData}
            isLoading={isLoading && messages.length - 1 === index}
          />
        ))}
        <div className="h-px w-full" ref={endRef} />
      </div>

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
