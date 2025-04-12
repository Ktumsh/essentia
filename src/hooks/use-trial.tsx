"use client";

import { useUserProfile } from "./use-user-profile";

export function useTrial() {
  const { user } = useUserProfile();

  const isTrialUsed = user?.trial?.hasUsed;
  const isTrialActive = user?.trial?.isActive;

  return {
    isTrialActive: isTrialActive ?? false,
    isTrialUsed: isTrialUsed ?? false,
  };
}
