"use client";

import useSWR from "swr";

import { fetcher } from "@/lib/utils";

const useChatName = (chatId: string | null) => {
  const { data, error, isLoading } = useSWR(
    chatId ? `/api/chat-title?id=${chatId}` : null,
    fetcher
  );

  return {
    chatName: data?.title ?? null,
    isLoading,
    error,
  };
};

export default useChatName;
