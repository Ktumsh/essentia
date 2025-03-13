"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import equal from "fast-deep-equal";
import { memo } from "react";

import { cn } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import { PreviewMessage, ThinkingMessage } from "./message";
import Overview from "./overview";

import type { ChatVote } from "@/db/schema";
import type { Message } from "ai";

interface MessagesProps {
  chatId: string;
  status: UseChatHelpers["status"];
  votes: Array<ChatVote> | undefined;
  messages: Array<Message>;
  isReadonly: boolean;
  user: UserProfileData | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  endRef: React.RefObject<HTMLDivElement | null>;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
}

function PureMessages({
  chatId,
  status,
  votes,
  messages,
  isReadonly,
  user,
  containerRef,
  endRef,
  setMessages,
  reload,
}: MessagesProps) {
  const lastNonUserMessageIndex = messages
    .map((message, index) =>
      message.role !== "user" && index > 1 ? index : -1,
    )
    .reduce((prev, curr) => (curr > prev ? curr : prev), -1);

  return (
    <div
      className={cn("z-10 h-full min-w-0 space-y-6 overflow-y-auto pt-4")}
      ref={containerRef}
    >
      {messages.length === 0 && <Overview />}
      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          chatId={chatId}
          message={message}
          user={user}
          isLoading={status === "streaming" && messages.length - 1 === index}
          vote={
            votes
              ? votes.find((vote) => vote.messageId === message.id)
              : undefined
          }
          isReadonly={isReadonly}
          setMessages={setMessages}
          reload={reload}
          isLastNonUser={
            message.role !== "user" && index === lastNonUserMessageIndex
          }
        />
      ))}
      {status === "submitted" &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}
      <div className="min-h-6 w-full" ref={endRef} />
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
