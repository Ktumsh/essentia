"use client";

import { SmilePlusButton } from "@/components/button-kit/smile-plus-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";

import type { FeatureType } from "@/components/ui/payment/payment-modal";

type MedicalHistoryHeaderProps = {
  openAIRecommendationsForAll: () => void;
  uploadStatus?: { allowed?: boolean; max?: number };
  setPremiumFeatureType: (type: FeatureType) => void;
  setDialogs: React.Dispatch<
    React.SetStateAction<{
      isPremiumModal: boolean;
      isAddDialogOpen: boolean;
      isEditDialogOpen: boolean;
      isViewDialogOpen: boolean;
      isDeleteDialogOpen: boolean;
      isAIDialogOpen: boolean;
      isFileViewerOpen: boolean;
      isActivityFullViewOpen: boolean;
      isShareDialogOpen: boolean;
    }>
  >;
};

const MedicalHistoryHeader = ({
  openAIRecommendationsForAll,
  uploadStatus,
  setPremiumFeatureType,
  setDialogs,
}: MedicalHistoryHeaderProps) => {
  return (
    <div className="flex flex-col items-end justify-between gap-4 @3xl/header:flex-row">
      <p className="text-foreground/80 text-sm">
        Gestiona tus documentos médicos y mantén un registro de tu historial.
      </p>
      <div className="grid w-full gap-2 md:w-fit">
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <SparklesButton
            size="default"
            onClick={openAIRecommendationsForAll}
            className="h-12 w-full rounded-xl md:h-9 md:w-fit md:rounded-md"
          >
            Recomendaciones IA
          </SparklesButton>
          <SmilePlusButton
            onClick={() => {
              if (!uploadStatus?.allowed) {
                setPremiumFeatureType("upload-limit");
                setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
                return;
              }
              setDialogs((prev) => ({ ...prev, isAddDialogOpen: true }));
            }}
            className="h-12 w-full rounded-xl md:h-9 md:w-fit md:rounded-md"
          >
            Añadir documento
          </SmilePlusButton>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryHeader;
