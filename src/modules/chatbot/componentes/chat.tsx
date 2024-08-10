"use client";

import { Message } from "@/types/chat";
import { useAIState, useUIState } from "ai/rsc";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";
import { toast } from "sonner";
import ChatList from "./chat-list";
import EmptyScreen from "./empty-screen";
import ChatPanel from "./chat-panel";
import { Session } from "@/types/session";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { useScrollAnchor } from "../hooks/use-scroll-anchor";
import { cn } from "@/utils/common";

export interface ChatProps extends ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session | undefined;
  missingKeys: string[];
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const [aiState] = useAIState();

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    if (session?.user) {
      if (!path.includes("chat") && messages.length === 1) {
        window.history.replaceState({}, "", `/essentia-ai/chat/${id}`);
      }
    }
  }, [id, path, session?.user, messages.length]);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [aiState.messages, router]);

  useEffect(() => {
    setNewChatId(id);
  }, [setNewChatId, id]);

  useEffect(() => {
    missingKeys.map((key) => {
      toast.error(`Missing ${key} environment variable!`);
    });
  }, [missingKeys]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] transition-[padding]"
      ref={scrollRef}
    >
      <div className={cn("pb-32 sm:py-24 pt-4", className)} ref={messagesRef}>
        {messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
