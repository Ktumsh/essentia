"use client";

import { Message } from "ai";
import equal from "fast-deep-equal";
import { memo } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useCopyToClipboard } from "usehooks-ts";

import { CopyButton } from "@/components/button-kit/copy-button";
import { DislikeButton } from "@/components/button-kit/dislike-button";
import { LikeButton } from "@/components/button-kit/like-button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { type ChatVote } from "@/db/schema";

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
  const [, copyToClipboard] = useCopyToClipboard();

  if (isLoading) return null;
  if (message.role === "user") return null;

  const onCopy = async () => {
    const textFromParts = message.parts
      ?.filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n")
      .trim();

    if (!textFromParts) {
      toast.error("¡No hay texto que copiar!");
      return;
    }

    await copyToClipboard(textFromParts);
    toast.success("¡Texto copiado!");
  };

  const upvoteResponse = async () => {
    const upvote = fetch("/api/vote", {
      method: "PATCH",
      body: JSON.stringify({
        chatId,
        messageId: message.id,
        type: "up",
      }),
    });

    toast.promise(upvote, {
      loading: "Votando respuesta...",
      success: () => {
        mutate<Array<ChatVote>>(
          `/api/vote?chatId=${chatId}`,
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

        return "¡Gracias por tu opinión! 🙏";
      },
      error: "Error al votar la respuesta.",
    });
  };

  const downvoteResponse = async () => {
    const downvote = fetch("/api/vote", {
      method: "PATCH",
      body: JSON.stringify({
        chatId,
        messageId: message.id,
        type: "down",
      }),
    });

    toast.promise(downvote, {
      loading: "Votando respuesta...",
      success: () => {
        mutate<Array<ChatVote>>(
          `/api/vote?chatId=${chatId}`,
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

        return "¡Gracias por tu opinión! 🙏";
      },
      error: "Error al votar la respuesta.",
    });
  };

  const isUpvoted = vote?.isUpvoted === true;
  const isDownvoted = vote?.isUpvoted === false;

  return (
    <div className="flex flex-row gap-2 transition-opacity group-hover/message:opacity-100 md:opacity-0">
      <BetterTooltip content="Copiar texto">
        <CopyButton
          variant="ghost"
          size="icon"
          onClick={onCopy}
          className="hover:bg-background text-foreground/80 size-6 rounded-sm"
        >
          <span className="sr-only">Copiar</span>
        </CopyButton>
      </BetterTooltip>

      <BetterTooltip content="Buena respuesta" hidden={isUpvoted}>
        <LikeButton
          variant="ghost"
          size="icon"
          disabled={vote?.isUpvoted}
          onClick={upvoteResponse}
          className="hover:bg-background text-foreground/80 size-6 rounded-sm"
        >
          <span className="sr-only">Votar buena respuesta</span>
        </LikeButton>
      </BetterTooltip>
      <BetterTooltip content="Mala respuesta" hidden={isDownvoted}>
        <DislikeButton
          variant="ghost"
          size="icon"
          disabled={vote && !vote.isUpvoted}
          onClick={downvoteResponse}
          className="hover:bg-background text-foreground/80 size-6 rounded-sm"
        >
          <span className="sr-only">Votar mala respuesta</span>
        </DislikeButton>
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
