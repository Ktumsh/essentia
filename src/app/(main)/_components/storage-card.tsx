"use client";

import { FileHeart } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

  const currentLimit = subscription?.plan?.maxDocuments ?? 12;
  const isUnlimited = subscription?.plan?.isUnlimited || currentLimit === null;

  const remainingDocuments = isUnlimited
    ? Infinity
    : Math.max(0, currentLimit - totalDocuments);

  const usagePercentage = isUnlimited
    ? 0
    : Math.min(100, (totalDocuments / currentLimit) * 100);

  const planName = isTrialActive
    ? "Prueba Gratis"
    : subscription?.plan?.name || "Básico";

  const message = useMemo(() => {
    if (isUnlimited) {
      return "Tu plan permite subir documentos ilimitados 🚀";
    }

    if (remainingDocuments === 0) {
      return "Has alcanzado el límite de documentos para tu plan actual 😱";
    }

    if (remainingDocuments <= 3) {
      return `¡Atención! Solo puedes subir ${remainingDocuments} ${remainingDocuments === 1 ? "documento más" : "documentos más"} con tu plan actual 🙂`;
    }

    return `Puedes subir ${remainingDocuments} ${remainingDocuments === 1 ? "documento más" : "documentos más"} con tu plan actual 😊`;
  }, [isUnlimited, remainingDocuments]);

  return (
    <>
      {isLoading ? (
        <Card className="bg-background md:bg-muted border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="size-6" />
            </CardTitle>
            <Skeleton className="h-4 w-14 rounded-full" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
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
        <Card className="bg-background md:bg-muted border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileHeart className="text-primary size-5" />
            </CardTitle>
            <BetterTooltip
              className="max-w-44 text-center"
              content={
                isUnlimited
                  ? "Tu plan actual permite documentos ilimitados"
                  : `Tu plan actual permite hasta ${currentLimit} documentos`
              }
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
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">
                  {isUnlimited
                    ? `${totalDocuments} ${totalDocuments === 1 ? "documento" : "documentos"}`
                    : `${totalDocuments} de ${currentLimit} documentos`}
                </span>
                <span className="text-muted-foreground">
                  {isUnlimited
                    ? "Ilimitado"
                    : `${remainingDocuments} restantes`}
                </span>
              </div>
              {!isUnlimited && (
                <Progress
                  value={usagePercentage}
                  indicatorColor="rounded-full"
                  className="h-1.5"
                />
              )}
              <div
                className={cn(
                  "mt-3 flex items-start gap-2 rounded-md p-2 text-xs",
                  isUnlimited
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : remainingDocuments === 0
                      ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                      : remainingDocuments <= 3
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
              onClick={() => router.push("/historial-medico")}
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
