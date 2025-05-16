"use client";

import { AlertCircle, HardDriveIcon } from "lucide-react";

import { Badge } from "@/components/kit/badge";
import { Card, CardContent } from "@/components/kit/card";
import { Progress } from "@/components/kit/progress";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/lib/utils";

interface StorageLimitIndicatorProps {
  totalDocuments: number;
  className?: string;
}

export default function StorageLimitIndicator({
  totalDocuments,
  className,
}: StorageLimitIndicatorProps) {
  const { subscription } = useUserSubscription();

  const currentLimit = subscription?.plan?.maxDocuments ?? 12;
  const isUnlimited = subscription?.plan?.isUnlimited || currentLimit === null;

  const remainingDocuments = isUnlimited
    ? Infinity
    : Math.max(0, currentLimit - totalDocuments);

  const usagePercentage = isUnlimited
    ? null
    : Math.min(100, (totalDocuments / currentLimit) * 100);

  const getMessage = () => {
    if (isUnlimited)
      return "Tu plan actual permite subir documentos ilimitados 🎉";

    if (remainingDocuments === 0) {
      return "Has alcanzado el límite de documentos para tu plan actual 😱";
    }

    if (remainingDocuments <= 3) {
      return `¡Atención! Solo puedes subir ${remainingDocuments} ${remainingDocuments === 1 ? "documento más" : "documentos más"} con tu plan actual 🙂`;
    }

    return `Puedes subir ${remainingDocuments} ${remainingDocuments === 1 ? "documento más" : "documentos más"} con tu plan actual 😊`;
  };

  return (
    <>
      <Card className={cn("bg-primary/5 mt-3 flex flex-col", className)}>
        <CardContent className="p-4">
          <div className="text-primary mb-3 flex flex-wrap items-center justify-between gap-2 font-medium">
            <h3 className="flex items-center gap-2 text-base">
              <HardDriveIcon className="size-4" />
              Almacenamiento
            </h3>
            {usagePercentage ? (
              <span className="ml-auto text-sm">{usagePercentage}%</span>
            ) : (
              <BetterTooltip
                align="end"
                content="¡Puedes subir documentos ilimitados! 🎉"
              >
                <Badge variant="premiumPlus" className="text-xxs px-1.5 py-0.5">
                  Premium Plus
                </Badge>
              </BetterTooltip>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 text-sm">
            <span className="font-medium">
              {isUnlimited
                ? `${totalDocuments} ${totalDocuments === 1 ? "documento" : "documentos"}`
                : `${totalDocuments} de ${currentLimit} documentos`}
            </span>
            <span
              className={cn(
                "text-xs",
                !isUnlimited && remainingDocuments <= 3
                  ? "text-red-500"
                  : "text-muted-foreground",
              )}
            >
              {isUnlimited ? "Ilimitado" : `${remainingDocuments} restantes`}
            </span>
          </div>
          <Progress
            value={isUnlimited ? 100 : usagePercentage}
            indicatorColor={cn("bg-primary rounded-full")}
            className="mt-1 h-1.5"
          />
        </CardContent>
      </Card>
      {!isUnlimited && (
        <div
          className={cn(
            "mt-3 flex items-start gap-2 rounded-md p-2 text-sm",
            remainingDocuments === 0
              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
              : remainingDocuments <= 3
                ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
          )}
        >
          {remainingDocuments <= 3 && (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <div>
            <p>{getMessage()}</p>
            {remainingDocuments <= 3 &&
              subscription?.plan?.id !== "premium-plus" && (
                <p className="mt-0.5 text-xs opacity-80">
                  Actualiza tu plan para aumentar tu capacidad de
                  almacenamiento.
                </p>
              )}
          </div>
        </div>
      )}
    </>
  );
}
