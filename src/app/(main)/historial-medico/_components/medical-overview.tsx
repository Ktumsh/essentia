"use client";

import { UpgradeButton } from "@/components/button-kit/upgrade-button";
import { Card, CardContent } from "@/components/kit/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/utils";

import ActivityPreview from "./activity-preview";
import ActivityPreviewLoading from "./activity-preview-loading";
import StorageLimitIndicator from "./storage-limit-indicator";
import StorageLimitLoading from "./storage-limit-loading";
import useAIUsage from "../_hooks/use-ai-usage";
import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";

const MedicalOverview = () => {
  const { subscription } = useUserSubscription();
  const isPremium = subscription?.plan?.id === "premium";
  const isPremiumPlus = subscription?.plan?.id === "premium-plus";

  const {
    medicalHistory,
    activities,
    hasNewActivity,
    loading,
    activitiesLoading,
  } = useMedicalHistoryLogic();

  const { aiUsage } = useAIUsage();

  const { openDialog, setPremiumFeatureType } = useMedicalDialogs();

  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <section className="col-span-1">
      <Card className="bg-muted sticky top-20 flex flex-col rounded-xl border-0">
        <CardContent className="flex flex-col p-5 text-base">
          <header className="flex items-center justify-between">
            <h3 className="font-medium">Resumen</h3>
            {!isPremiumPlus && (
              <UpgradeButton
                size="sm"
                variant="gradient"
                onClick={() => {
                  setPremiumFeatureType("upload-limit");
                  openDialog("isPremiumModal");
                }}
                className={cn(
                  "text-xs hover:text-white active:text-white [&>svg]:size-3.5!",
                  isPremium && "bg-premium-plus!",
                )}
              >
                Mejorar plan
              </UpgradeButton>
            )}
          </header>

          {loading ? (
            <StorageLimitLoading />
          ) : (
            <StorageLimitIndicator
              totalDocuments={medicalHistory.length}
              totalRecommendations={aiUsage}
            />
          )}

          {activitiesLoading ? (
            <ActivityPreviewLoading />
          ) : (
            <ActivityPreview
              activities={activities}
              hasNewActivity={hasNewActivity}
              onViewAll={() => openDialog("isActivityFullViewOpen")}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default MedicalOverview;
