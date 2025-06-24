"use client";

import { Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BetterTooltip } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site.config";
import { useUserSubscription } from "@/hooks/use-user-subscription";

import { useMedicalHistoryFetch } from "../_hooks/use-medical-history-fetch";

const ArchivedInfoMessage = () => {
  const { archivedCount, isArchivedLoading } = useMedicalHistoryFetch();
  const { subscription } = useUserSubscription();

  const isPremiumPlus = subscription?.plan?.id === siteConfig.plan.premiumPlus;

  if (isArchivedLoading) {
    return <Skeleton className="h-5 w-28 rounded-full" />;
  }

  if (isPremiumPlus || archivedCount === 0) return null;

  return (
    <BetterTooltip
      content={
        <>
          Tienes {archivedCount} documento
          {archivedCount > 1 ? "s" : ""} archivado
          {archivedCount > 1 ? "s" : ""} por superar el límite de tu plan.
          Mejora tu plan para acceder a ellos nuevamente.
        </>
      }
    >
      <Badge variant="warning" className="cursor-help gap-1">
        {archivedCount} archivado{archivedCount > 1 ? "s" : ""}
        <Info className="h-4 w-4" />
      </Badge>
    </BetterTooltip>
  );
};

export default ArchivedInfoMessage;
