"use client";

import { FileHeart } from "lucide-react";
import { useMemo } from "react";
import useSWR from "swr";

import { FileStackButton } from "@/components/button-kit/file-stack-button";
import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Progress } from "@/components/kit/progress";
import { Skeleton } from "@/components/kit/skeleton";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useTrial } from "@/hooks/use-trial";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn, fetcher } from "@/lib/utils";

import type { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

const StorageCard = () => {
  const { data: medicalHistory, isLoading } = useSWR<MedicalHistoryWithTags[]>(
    "/api/medical-history",
    fetcher,
    {
      fallbackData: [],
    },
  );
  const { subscription } = useUserSubscription();

  const { isTrialActive } = useTrial();

  const totalDocuments = medicalHistory?.length || 0;

  const currentLimit = subscription?.plan?.maxFiles || 6;

  const remainingFiles = Math.max(0, currentLimit - totalDocuments);

  const usagePercentage = Math.min(100, (totalDocuments / currentLimit) * 100);

  const planName = isTrialActive
    ? "Prueba Gratis"
    : subscription?.plan?.name || "Básico";

  const getProgressColor = () => {
    if (usagePercentage === 100) return "from-red-600 via-red-500 to-red-600";
    if (usagePercentage > 50)
      return "from-amber-600 via-amber-500 to-amber-600";
    return "from-green-600 via-green-500 to-green-600";
  };

  const message = useMemo(() => {
    if (remainingFiles === 0) {
      return "Has alcanzado el límite de archivos para tu plan actual 😱";
    }

    if (remainingFiles <= 3) {
      return `¡Atención! Solo puedes subir ${remainingFiles} ${remainingFiles === 1 ? "archivo más" : "archivos más"} con tu plan actual 🙂`;
    }

    return `Puedes subir ${remainingFiles} ${remainingFiles === 1 ? "archivo más" : "archivos más"} con tu plan actual 😊`;
  }, [remainingFiles]);

  return (
    <>
      {isLoading ? (
        <Card className="border-0 md:border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="size-6" />
            </CardTitle>
            <Skeleton className="h-4 w-14 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-[42px] w-full" />
              <Skeleton className="mt-4 h-8 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 md:border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileHeart className="size-5 text-indigo-500" />
            </CardTitle>
            <BetterTooltip
              className="max-w-44 text-center"
              content={`Tu plan actual permite hasta ${currentLimit} documentos`}
            >
              <Badge
                variant={
                  planName === "Básico"
                    ? "secondary"
                    : isTrialActive
                      ? "premium"
                      : subscription?.plan?.name === "Premium"
                        ? "premium"
                        : "premiumPlus"
                }
                className="text-xxs px-1.5 py-0.5"
              >
                {planName}
              </Badge>
            </BetterTooltip>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">
                  {totalDocuments} de {currentLimit} documentos
                </span>
                <span className="text-muted-foreground">
                  {remainingFiles} restantes
                </span>
              </div>
              <Progress
                value={usagePercentage}
                indicatorColor={cn("bg-gradient-to-r", getProgressColor())}
                className="dark:bg-alternative/50 h-1.5 bg-slate-200"
              />
              <div
                className={cn(
                  "mt-3 flex items-start gap-2 rounded-md p-2 text-xs",
                  remainingFiles === 0
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                    : remainingFiles <= 3
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
                )}
              >
                <p>{message}</p>
              </div>
            </div>
            <FileStackButton
              variant="secondary"
              size="sm"
              className="mt-4 w-full text-xs [&_svg]:size-3.5!"
            >
              Ver mis documentos
            </FileStackButton>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default StorageCard;
