"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { SmilePlusButton } from "@/components/button-kit/smile-plus-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { useUserProfile } from "@/hooks/use-user-profile";

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
  const { user } = useUserProfile();
  const { username, profileImage } = user || {};
  const pathname = usePathname();

  const isFolderPage = pathname.startsWith("/historial-medico/carpetas");

  return (
    <div className="flex flex-col justify-between gap-4 @2xl/medical:flex-row">
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <h1 className="font-merriweather text-lg font-semibold">
          Historial Médico
        </h1>
        <ChevronRight className="text-muted-foreground size-3.5" />
        <div className="flex min-w-0 items-center gap-1 text-sm">
          <span className="bg-accent size-4 overflow-hidden rounded">
            <Image
              src={profileImage ?? ""}
              width={16}
              height={16}
              alt={`Avatar de ${username}`}
              className="h-auto w-full object-cover"
            />
          </span>
          <span className="text-foreground truncate font-medium">
            {username}
          </span>
        </div>
      </div>
      {!isFolderPage && (
        <div className="inline-flex flex-wrap items-center gap-3">
          <SparklesButton
            size="sm"
            disabled={loading}
            onClick={openAIRecommendationsForAll}
          >
            Recomendaciones AI
          </SparklesButton>
          <SmilePlusButton
            size="sm"
            disabled={loading}
            onClick={() => {
              if (!uploadStatus?.allowed) {
                setPremiumFeatureType("upload-limit");
                setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
                return;
              }
              setDialogs((prev) => ({ ...prev, isAddDialogOpen: true }));
            }}
          >
            Añadir documento
          </SmilePlusButton>
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryHeader;
