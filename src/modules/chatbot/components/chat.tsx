"use client";

import { ComponentProps, useEffect, useState } from "react";
import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { toast } from "sonner";
import { Session, UserProfileData } from "@/types/session";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { useScrollAnchor } from "../hooks/use-scroll-anchor";
import { cn } from "@/utils/common";
import ChatList from "./chat-list";
import EmptyScreen from "./empty-screen";
import ChatPanel from "./chat-panel";

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
    <main
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:md:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] transition-[padding]"
      ref={scrollRef}
    >
      <div
        className={cn("pb-32 lg:pb-48 pt-4 md:pt-10", className)}
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
        <div className="w-full h-px" ref={visibilityRef} />
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
    </main>
  );
}
