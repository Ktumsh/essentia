import useSWR from "swr";

import { MedicalHistory } from "@/db/querys/medical-history-querys";
import { useUserProfile } from "@/hooks/use-user-profile";
import { fetcher } from "@/utils";

import type { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import type { MedicalTag } from "@/db/schema";
import type { MedicalHistoryActivity } from "@/lib/types";

export function useMedicalHistoryFetch() {
  const { user } = useUserProfile();

  const { isPremium } = user || {};

  const { data: medicalTags = [] } = useSWR<Array<MedicalTag>>(
    "/api/medical-tags",
    fetcher,
    { fallbackData: [] },
  );
  const {
    data: medicalHistory = [],
    isLoading: isHistoryLoading,
    mutate: mutateHistory,
  } = useSWR<Array<MedicalHistory>>("/api/medical-history", fetcher);
  const {
    data: activities = [],
    mutate: mutateActivities,
    isLoading: activitiesLoading,
  } = useSWR<Array<MedicalHistoryActivity>>("/api/medical-activity", fetcher);
  const {
    data: savedRecommendations = [],
    isLoading: isRecommendationsLoading,
    mutate: mutateSavedRecommendations,
  } = useSWR<Array<SavedAIRecommendation>>(
    isPremium ? "/api/ai-recommendations" : null,
    fetcher,
    {
      fallbackData: [],
    },
  );

  const {
    data: archivedCountData,
    isLoading: isArchivedLoading,
    mutate: mutateArchivedCount,
  } = useSWR<{ count: number }>("/api/archived-count", fetcher);

  const archivedCount = archivedCountData?.count ?? 0;

  return {
    medicalTags,
    medicalHistory,
    isHistoryLoading,
    mutateHistory,
    activities,
    mutateActivities,
    activitiesLoading,
    savedRecommendations,
    isRecommendationsLoading,
    mutateSavedRecommendations,
    archivedCount,
    isArchivedLoading,
    mutateArchivedCount,
  };
}
