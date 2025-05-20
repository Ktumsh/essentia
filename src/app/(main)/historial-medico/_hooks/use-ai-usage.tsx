"use client";

import useSWR from "swr";

import { useUserProfile } from "@/hooks/use-user-profile";
import { fetcher } from "@/lib/utils";

export default function useAIUsage() {
  const { user } = useUserProfile();
  const isPremium = user?.isPremium;

  const {
    data: aiUsage,
    isLoading: isAIUsageLoading,
    mutate: mutateAIUsage,
  } = useSWR<{ usage: number }>(isPremium ? "/api/ai-usage" : null, fetcher, {
    fallbackData: { usage: 0 },
  });

  return {
    aiUsage: aiUsage?.usage || 0,
    isAIUsageLoading,
    mutateAIUsage,
  };
}
