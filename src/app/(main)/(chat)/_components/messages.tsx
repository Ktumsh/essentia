"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import equal from "fast-deep-equal";
import { motion } from "motion/react";
import { memo } from "react";

import { cn } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import { Greeting } from "./greeting";
import { PreviewMessage } from "./message";
import Overview from "./overview";
import ThinkingMessage from "./thinking-message";
import { useMessages } from "../_hooks/use-messages";

import type { ChatVote } from "@/db/schema";
import type { UIMessage } from "ai";

interface MessagesProps {
  chatId: string;
  status: UseChatHelpers["status"];
  votes: Array<ChatVote> | undefined;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
  isReadonly: boolean;
  user: UserProfileData | null;
}

function PureMessages({
  chatId,
  status,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
  user,
}: MessagesProps) {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  } = useMessages({
    chatId,
    status,
  });

  return (
    <div
      ref={messagesContainerRef}
      className={cn("mt-auto min-w-0 space-y-6 overflow-y-auto pt-4", {
        "h-full": messages.length > 0,
      })}
    >
      {messages.length === 0 &&
        (user && user.isPremium ? <Greeting /> : <Overview />)}
      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          chatId={chatId}
          message={message}
          setMessages={setMessages}
          vote={
            votes
              ? votes.find((vote) => vote.messageId === message.id)
              : undefined
          }
          isLoading={status === "streaming" && messages.length - 1 === index}
          reload={reload}
          isReadonly={isReadonly}
          requiresScrollPadding={
            hasSentMessage && index === messages.length - 1
          }
          user={user}
        />
      ))}
      {status === "submitted" &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}
      <motion.div
        ref={messagesEndRef}
        className="min-h-6 min-w-6 shrink-0"
        onViewportLeave={onViewportLeave}
        onViewportEnter={onViewportEnter}
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.status && nextProps.status) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;
  if (!equal(prevProps.votes, nextProps.votes)) return false;

  return true;
});
