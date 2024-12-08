import { Message } from "ai";
import { memo } from "react";

import { type ChatVote } from "@/db/schema";
import { UserProfileData } from "@/types/session";

import Overview from "./overview";
import { PreviewMessage, ThinkingMessage } from "./ui/preview-message";

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  votes: Array<ChatVote> | undefined;
  messages: Array<Message>;
  isReadonly: boolean;
  user: UserProfileData | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  endRef: React.RefObject<HTMLDivElement | null>;
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
}: MessagesProps) {
  return (
    <div
      className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll pt-4"
      ref={containerRef}
    >
      {messages.length === 0 && <Overview />}

      {messages.map((message, index) => (
        <PreviewMessage
          key={`${message.id}-${index}`}
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
        />
      ))}

      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}

      <div className="h-px w-full" ref={endRef} />
    </div>
  );
}

export const Messages = memo(PureMessages);
