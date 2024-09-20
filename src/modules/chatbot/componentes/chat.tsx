"use client";

import { Message } from "@/types/chat";
import { useAIState, useUIState } from "ai/rsc";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";
import { toast } from "sonner";
import ChatList from "./chat-list";
import EmptyScreen from "./empty-screen";
import ChatPanel from "./chat-panel";
import { Session, UserProfileData } from "@/types/session";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { useScrollAnchor } from "../hooks/use-scroll-anchor";
import { cn } from "@/utils/common";
import { getUserById } from "@/db/actions";

export interface ChatProps extends ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  session?: Session | undefined;
  missingKeys: string[];
  profileData: UserProfileData | null;
}

export function Chat({
  id,
  className,
  session,
  missingKeys,
  profileData,
}: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const [aiState] = useAIState();
  const [_, setNewChatId] = useLocalStorage("newChatId", id);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUserPremiumStatus = async () => {
      if (session?.user?.id) {
        const user = await getUserById(session.user.id);
        setIsPremium(user?.is_premium || false);
      }
    };

    fetchUserPremiumStatus();
  }, [session?.user?.id]);

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
  });

  useEffect(() => {
    missingKeys.map((key) => {
      toast.error(`Falta la variable de entorno ${key}!`);
    });
  }, [missingKeys]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] transition-[padding]"
      ref={scrollRef}
    >
      <div
        className={cn("pb-32 lg:pb-48 pt-4 md:pt-10", className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <EmptyScreen />
        )}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>

      <ChatPanel
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        profileData={profileData}
        isPremium={isPremium}
        session={session}
      />
    </div>
  );
}
