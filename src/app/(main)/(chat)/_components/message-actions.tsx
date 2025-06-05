"use client";

import { Message } from "ai";
import equal from "fast-deep-equal";
import { memo } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

import { CopyButton } from "@/components/button-kit/copy-button";
import { DislikeButton } from "@/components/button-kit/dislike-button";
import { LikeButton } from "@/components/button-kit/like-button";
import { PencilButton } from "@/components/button-kit/pencil-button";
import { RefreshButton } from "@/components/button-kit/refresh-button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { type ChatVote } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

interface PureMessageActionsProps {
  chatId: string;
  message: Message;
  vote: ChatVote | undefined;
  isLoading: boolean;
  isReadonly?: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onCopy: () => void;
  onRetry: () => void;
}

const PureMessageActions = ({
  chatId,
  message,
  vote,
  isLoading,
  isReadonly,
  isEditing,
  onEdit,
  onCopy,
  onRetry,
}: PureMessageActionsProps) => {
  const { mutate } = useSWRConfig();
  const userRole = message.role === "user";
  const isMobile = useIsMobile();

  if (isLoading) return null;

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

  if ((isMobile && userRole) || isEditing) return null;

  return (
    <div
      className={cn(
        "flex flex-row gap-2 transition-opacity group-hover/message:opacity-100 md:opacity-0",
        { "justify-end": userRole },
      )}
    >
      {userRole && !isReadonly && (
        <BetterTooltip content="Editar mensaje">
          <PencilButton
            variant="ghost"
            size="icon"
            className="text-foreground/80 size-6 rounded-sm"
            onClick={onEdit}
          >
            <span className="sr-only">Editar mensaje</span>
          </PencilButton>
        </BetterTooltip>
      )}
      <BetterTooltip content="Copiar">
        <CopyButton
          variant="ghost"
          size="icon"
          onClick={onCopy}
          className="text-foreground/80 size-6 rounded-sm"
        >
          <span className="sr-only">Copiar</span>
        </CopyButton>
      </BetterTooltip>
      {!userRole && !isReadonly && (
        <>
          <BetterTooltip content="Reintentarlo">
            <RefreshButton
              variant="ghost"
              size="icon"
              onClick={onRetry}
              className="text-foreground/80 size-6 rounded-sm"
            >
              <span className="sr-only">Reintentarlo</span>
            </RefreshButton>
          </BetterTooltip>
          <BetterTooltip content="Buena respuesta" hidden={isUpvoted}>
            <LikeButton
              variant="ghost"
              size="icon"
              disabled={vote?.isUpvoted}
              onClick={upvoteResponse}
              className="text-foreground/80 size-6 rounded-sm"
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
              className="text-foreground/80 size-6 rounded-sm"
            >
              <span className="sr-only">Votar mala respuesta</span>
            </DislikeButton>
          </BetterTooltip>
        </>
      )}
    </div>
  );
};

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (!equal(prevProps.vote, nextProps.vote)) return false;
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.isEditing !== nextProps.isEditing) return false;
    return true;
  },
);
