"use client";

import { SmilePlusButton } from "@/components/button-kit/smile-plus-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";

import type { FeatureType } from "@/components/ui/payment/payment-modal";
import type { CanUploadMedicalFile } from "@/db/querys/medical-history-querys";

type MedicalHistoryHeaderProps = {
  openAIRecommendationsForAll: () => void;
  uploadStatus?: CanUploadMedicalFile;
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
  loading: boolean;
};

const MedicalHistoryHeader = ({
  openAIRecommendationsForAll,
  uploadStatus,
  setPremiumFeatureType,
  setDialogs,
  loading,
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
            disabled={loading}
            onClick={openAIRecommendationsForAll}
            className="h-12 w-full rounded-xl md:h-9 md:w-fit md:rounded-md"
          >
            Recomendaciones IA
          </SparklesButton>
          <SmilePlusButton
            disabled={loading}
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
