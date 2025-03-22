"use client";

import { Message } from "ai";
import equal from "fast-deep-equal";
import { Copy } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useCopyToClipboard } from "usehooks-ts";

import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";
import {
  DislikeFillIcon,
  DislikeIcon,
  LikeFillIcon,
  LikeIcon,
} from "@/components/ui/icons/action";
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

        return "¡Gracias por votar la respuesta!";
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

        return "¡Gracias por votar la respuesta!";
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
          size="icon"
          radius="md"
          onClick={onCopy}
          className="text-muted-foreground bg-background"
        >
          <Copy />
          <span className="sr-only">Copiar</span>
        </Button>
      </BetterTooltip>

      <BetterTooltip content="Buena respuesta" hidden={isUpvoted}>
        <Button
          variant="outline"
          size="icon"
          radius="md"
          disabled={vote?.isUpvoted}
          onClick={upvoteResponse}
          className="text-muted-foreground bg-background disabled:opacity-100"
        >
          {vote && vote.isUpvoted ? <LikeFillIcon /> : <LikeIcon />}
          <span className="sr-only">Votar buena respuesta</span>
        </Button>
      </BetterTooltip>

      <BetterTooltip content="Mala respuesta" hidden={isDownvoted}>
        <Button
          variant="outline"
          size="icon"
          radius="md"
          disabled={vote && !vote.isUpvoted}
          onClick={downvoteResponse}
          className="text-muted-foreground bg-background disabled:opacity-100"
        >
          {vote && !vote.isUpvoted ? <DislikeFillIcon /> : <DislikeIcon />}
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
