"use client";

import { useUserProfile } from "./use-user-profile";

export function useIsTrialActive() {
  const { user } = useUserProfile();

  const isTrialUsed = user?.trial?.hasUsed;
  const isUsingTrial = user?.trial?.isActive && !user?.isPremium;

  return {
    isUsingTrial: isUsingTrial ?? false,
    isTrialUsed: isTrialUsed ?? false,
  };
}
