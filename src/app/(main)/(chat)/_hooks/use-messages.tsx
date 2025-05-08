import { useState, useEffect } from "react";

import { useChatContext } from "@/hooks/use-chat-context";

import { useScrollToBottom } from "./use-scroll-to-bottom";

import type { UseChatHelpers } from "@ai-sdk/react";

export function useMessages({
  chatId,
  status,
}: {
  chatId: string;
  status: UseChatHelpers["status"];
}) {
  const {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
  } = useScrollToBottom();

  const [hasSentMessage, setHasSentMessage] = useState(false);

  const { activeChatId } = useChatContext();

  useEffect(() => {
    if (chatId || activeChatId) {
      scrollToBottom("instant");
      setHasSentMessage(false);
    }
  }, [chatId, activeChatId, scrollToBottom]);

  useEffect(() => {
    if (status === "submitted") {
      setHasSentMessage(true);
    }
  }, [status]);

  return {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
    hasSentMessage,
  };
}
