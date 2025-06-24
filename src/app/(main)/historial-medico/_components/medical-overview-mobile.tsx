"use client";

import { FolderKanban } from "lucide-react";

import { UpgradeButton } from "@/components/button-kit/upgrade-button";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/config/site.config";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/utils";

import ActivityPreview from "./activity-preview";
import ActivityPreviewLoading from "./activity-preview-loading";
import StorageLimitIndicator from "./storage-limit-indicator";
import StorageLimitLoading from "./storage-limit-loading";
import useAIUsage from "../_hooks/use-ai-usage";
import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";

const MedicalOverviewMobile = () => {
  const { subscription } = useUserSubscription();
  const isPremium = subscription?.plan?.id === siteConfig.plan.premium;
  const isPremiumPlus = subscription?.plan?.id === siteConfig.plan.premiumPlus;

  const {
    medicalHistory,
    activities,
    hasNewActivity,
    loading,
    activitiesLoading,
  } = useMedicalHistoryLogic();

  const { aiUsage } = useAIUsage();

  const { openDialog, setPremiumFeatureType } = useMedicalDialogs();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Ver resumen</span>
          <FolderKanban />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Resumen</DrawerTitle>
          <DrawerDescription>
            Aquí puedes ver un resumen de almacenamiento y actividades
          </DrawerDescription>
        </DrawerHeader>
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
      </DrawerContent>
    </Drawer>
  );
};

export default MedicalOverviewMobile;
