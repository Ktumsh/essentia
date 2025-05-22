"use client";

import { HardDriveIcon, BrainCircuit } from "lucide-react";

import { Card, CardContent } from "@/components/kit/card";
import { Progress } from "@/components/kit/progress";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/lib/utils";

import { getPlanLimitMessage } from "../_lib/utils";

interface StorageLimitIndicatorProps {
  totalDocuments: number;
  totalRecommendations: number;
}

const StorageLimitIndicator = ({
  totalDocuments,
  totalRecommendations,
}: StorageLimitIndicatorProps) => {
  const { subscription, trial } = useUserSubscription();

  const isPremium = subscription?.subscription.isPremium;
  const isTrialActive = trial?.isActive ?? false;

  // DOCUMENTOS
  const docLimit = subscription?.plan?.maxDocuments ?? 12;
  const docsUnlimited = subscription?.plan?.isUnlimited || docLimit === null;
  const docsRemaining = docsUnlimited
    ? Infinity
    : Math.max(0, docLimit - totalDocuments);
  const docsPercentage = docsUnlimited
    ? 100
    : Math.min(100, (totalDocuments / docLimit) * 100);

  // RECOMENDACIONES IA
  const aiLimit = isTrialActive
    ? 15
    : (subscription?.plan?.maxAiRecommendations ?? 0);
  const aiUnlimited =
    !isTrialActive &&
    (subscription?.plan?.isUnlimited ||
      aiLimit === null ||
      aiLimit === Infinity);
  const aiRemaining = aiUnlimited
    ? Infinity
    : Math.max(0, aiLimit - totalRecommendations);
  const aiPercentage = aiUnlimited
    ? 100
    : aiLimit === 0
      ? 0
      : Math.min(100, (totalRecommendations / aiLimit) * 100);

  const documentLimitMessage = getPlanLimitMessage(
    docsRemaining,
    docsUnlimited,
    "doc",
    isTrialActive,
  );

  const aiLimitMessage = getPlanLimitMessage(
    aiRemaining,
    aiUnlimited,
    "ai",
    isTrialActive,
  );

  return (
    <Card className="bg-primary/5 mt-3 flex flex-col">
      <CardContent className="p-4">
        {/* DOCUMENTOS */}
        <div className="text-primary mb-3 flex flex-wrap items-center justify-between gap-2 font-medium">
          <BetterTooltip content={documentLimitMessage}>
            <h3 className="flex cursor-help items-center gap-2 text-base">
              <HardDriveIcon className="size-4" />
              Almacenamiento
            </h3>
          </BetterTooltip>
          {!docsUnlimited && (
            <span className="ml-auto text-sm">
              {docsPercentage.toFixed(0)}%
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            {docsUnlimited
              ? `${totalDocuments} ${
                  totalDocuments === 1 ? "documento" : "documentos"
                }`
              : `${totalDocuments} de ${docLimit} documentos`}
          </span>
          <BetterTooltip content={documentLimitMessage} align="end">
            <span
              className={cn(
                "cursor-help text-xs",
                !docsUnlimited && docsRemaining <= 3
                  ? "text-red-500"
                  : "text-muted-foreground",
              )}
            >
              {docsUnlimited ? "Ilimitado" : `${docsRemaining} restantes`}
            </span>
          </BetterTooltip>
        </div>
        <Progress
          value={docsPercentage}
          indicatorColor="bg-primary rounded-full"
          className="mt-1 mb-4 h-1.5"
        />

        {/* RECOMENDACIONES IA */}
        {(isPremium || isTrialActive) && (
          <>
            <div className="text-secondary mb-3 flex flex-wrap items-center justify-between gap-2 font-medium">
              <BetterTooltip content={aiLimitMessage}>
                <h3 className="flex cursor-help items-center gap-2 text-base">
                  <BrainCircuit className="size-4" />
                  Recomendaciones IA
                </h3>
              </BetterTooltip>
              {!aiUnlimited && (
                <span className="ml-auto text-sm">
                  {aiPercentage.toFixed(0)}%
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {aiUnlimited
                  ? `${totalRecommendations} ${
                      totalRecommendations === 1
                        ? "recomendación"
                        : "recomendaciones"
                    }`
                  : `${totalRecommendations} de ${aiLimit} recomendaciones`}
              </span>
              <BetterTooltip content={aiLimitMessage} align="end">
                <span
                  className={cn(
                    "cursor-help text-xs",
                    !aiUnlimited && aiRemaining <= 3
                      ? "text-red-500"
                      : "text-muted-foreground",
                  )}
                >
                  {aiUnlimited ? "Ilimitado" : `${aiRemaining} restantes`}
                </span>
              </BetterTooltip>
            </div>
            <Progress
              value={aiPercentage}
              indicatorColor="bg-secondary"
              className="bg-secondary/20 mt-1 h-1.5"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StorageLimitIndicator;
