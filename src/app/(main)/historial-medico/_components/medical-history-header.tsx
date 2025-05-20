"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

import { AvatarIcon } from "@/components/icons/miscellaneus";
import { Avatar, AvatarFallback } from "@/components/kit/avatar";
import { useUserProfile } from "@/hooks/use-user-profile";

import NewOptions from "./new-options";

import type { CanUploadMedicalFile } from "@/db/querys/medical-history-querys";

type MedicalHistoryHeaderProps = {
  uploadStatus?: CanUploadMedicalFile;
  loading: boolean;
  onNewFolder: () => void;
  onNewDocument: () => void;
  onNewAIRecommendation: () => void;
};

const MedicalHistoryHeader = ({
  loading,
  onNewFolder,
  onNewDocument,
  onNewAIRecommendation,
}: MedicalHistoryHeaderProps) => {
  const { user } = useUserProfile();
  const { username, profileImage, isPremium } = user || {};

  return (
    <div className="flex flex-col justify-between gap-4 @2xl/medical:flex-row">
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <h1 className="font-merriweather text-lg font-semibold">
          Historial Médico
        </h1>
        <ChevronRight className="text-muted-foreground size-3.5" />
        <div className="flex min-w-0 items-center gap-1 text-sm">
          {profileImage ? (
            <Avatar className="size-4">
              <Image
                priority
                src={profileImage}
                width={16}
                height={16}
                alt={username!}
              />
            </Avatar>
          ) : (
            <Avatar className="size-4">
              <AvatarFallback>
                <AvatarIcon className="text-foreground/80 size-2.5" />
              </AvatarFallback>
            </Avatar>
          )}

          <span className="text-foreground truncate font-medium">
            {username}
          </span>
        </div>
      </div>
      <div className="inline-flex flex-wrap items-center gap-3">
        <NewOptions
          expanded
          isPremium={isPremium}
          disabled={loading}
          onNewFolder={onNewFolder}
          onNewDocument={onNewDocument}
          onNewAIRecommendation={onNewAIRecommendation}
        />
      </div>
    </div>
  );
};

export default MedicalHistoryHeader;
