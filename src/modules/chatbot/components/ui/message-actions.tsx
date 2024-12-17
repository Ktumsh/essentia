"use client";
import { Message } from "ai";
import equal from "fast-deep-equal";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { type ChatVote } from "@/db/schema";
import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";

import { getMessageIdFromAnnotations } from "../../lib/utils";

interface PureMessageActionsProps {
  chatId: string;
  message: Message;
  vote: ChatVote | undefined;
  isLoading: boolean;
}

const PureMessageActions = ({
  chatId,
  message,
  vote,
  isLoading,
}: PureMessageActionsProps) => {
  const { mutate } = useSWRConfig();
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  if (isLoading) return null;
  if (message.role === "user") return null;
  if (message.toolInvocations && message.toolInvocations.length > 0)
    return null;

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content as string);
    toast.success("Texto copiado");
  };

  const upvoteResponse = async () => {
    const messageId = getMessageIdFromAnnotations(message);

    const upvote = fetch("/api/chat/vote", {
      method: "PATCH",
      body: JSON.stringify({
        chatId,
        messageId,
        type: "up",
      }),
    });

    toast.promise(upvote, {
      loading: "Votando respuesta...",
      success: () => {
        mutate<Array<ChatVote>>(
          `/api/chat/vote?chatId=${chatId}`,
          (currentVotes) => {
            if (!currentVotes) return [];

            const votesWithoutCurrent = currentVotes.filter(
              (vote) => vote.messageId !== message.id,
            );

            return [
              ...votesWithoutCurrent,
              {
                chatId,
                messageId: message.id,
                isUpvoted: true,
              },
            ];
          },
          { revalidate: false },
        );

        return "Respuesta votada positivamente";
      },
      error: "Error al votar la respuesta.",
    });
  };

  const downvoteResponse = async () => {
    const messageId = getMessageIdFromAnnotations(message);

    const downvote = fetch("/api/chat/vote", {
      method: "PATCH",
      body: JSON.stringify({
        chatId,
        messageId,
        type: "down",
      }),
    });

    toast.promise(downvote, {
      loading: "Votando respuesta...",
      success: () => {
        mutate<Array<ChatVote>>(
          `/api/chat/vote?chatId=${chatId}`,
          (currentVotes) => {
            if (!currentVotes) return [];

            const votesWithoutCurrent = currentVotes.filter(
              (vote) => vote.messageId !== message.id,
            );

            return [
              ...votesWithoutCurrent,
              {
                chatId,
                messageId: message.id,
                isUpvoted: false,
              },
            ];
          },
          { revalidate: false },
        );

        return "Respuesta votada negativamente";
      },
      error: "Error al votar la respuesta.",
    });
  };

  const isUpvoted = vote?.isUpvoted === true;
  const isDownvoted = vote?.isUpvoted === false;

  return (
    <div className="flex flex-row gap-2 transition-opacity group-hover/message:opacity-100 md:opacity-0">
      <BetterTooltip content="Copiar texto">
        <Button
          variant="outline"
          onClick={onCopy}
          className="h-fit border-black/10 !bg-transparent px-2 py-1 text-main-m shadow-none dark:border-white/10 dark:text-main-dark-m"
        >
          <Copy />
          <span className="sr-only">Copiar</span>
        </Button>
      </BetterTooltip>

      <BetterTooltip content="Buena respuesta" hidden={isUpvoted}>
        <Button
          variant="outline"
          disabled={vote?.isUpvoted}
          onClick={upvoteResponse}
          className="h-fit border-black/10 !bg-transparent px-2 py-1 text-main-m shadow-none dark:border-white/10 dark:text-main-dark-m"
        >
          <ThumbsUp />
          <span className="sr-only">Votar buena respuesta</span>
        </Button>
      </BetterTooltip>

      <BetterTooltip content="Mala respuesta" hidden={isDownvoted}>
        <Button
          variant="outline"
          disabled={vote && !vote.isUpvoted}
          onClick={downvoteResponse}
          className="h-fit border-black/10 !bg-transparent px-2 py-1 text-main-m shadow-none dark:border-white/10 dark:text-main-dark-m"
        >
          <ThumbsDown />
          <span className="sr-only">Votar mala respuesta</span>
        </Button>
      </BetterTooltip>
    </div>
  );
};

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (!equal(prevProps.vote, nextProps.vote)) return false;
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    return true;
  },
);
