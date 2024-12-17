import equal from "fast-deep-equal";
import { memo } from "react";

import { UserProfileData } from "@/types/session";

import Overview from "./overview";
import { PreviewMessage, ThinkingMessage } from "./ui/message";

import type { ChatVote } from "@/db/schema";
import type { ChatRequestOptions, Message } from "ai";

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  votes: Array<ChatVote> | undefined;
  messages: Array<Message>;
  isReadonly: boolean;
  user: UserProfileData | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  endRef: React.RefObject<HTMLDivElement | null>;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureMessages({
  chatId,
  isLoading,
  votes,
  messages,
  isReadonly,
  user,
  containerRef,
  endRef,
  setMessages,
  reload,
}: MessagesProps) {
  return (
    <div
      className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll pt-4"
      ref={containerRef}
    >
      {messages.length === 0 && <Overview />}

      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          chatId={chatId}
          message={message}
          user={user}
          isLoading={isLoading && messages.length - 1 === index}
          vote={
            votes
              ? votes.find((vote) => vote.messageId === message.id)
              : undefined
          }
          isReadonly={isReadonly}
          setMessages={setMessages}
          reload={reload}
        />
      ))}

      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}

      <div className="min-h-6 w-full" ref={endRef} />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.isLoading && nextProps.isLoading) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.votes, nextProps.votes)) return false;

  return true;
});
