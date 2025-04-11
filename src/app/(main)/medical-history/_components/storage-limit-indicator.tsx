"use client";

import { AlertCircle, Upload } from "lucide-react";

import { UpgradeButton } from "@/components/button-kit/upgrade-button";
import { Card, CardContent, CardFooter } from "@/components/kit/card";
import { Progress } from "@/components/kit/progress";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useIsTrialActive } from "@/hooks/use-is-trial-active";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/lib/utils";

interface StorageLimitIndicatorProps {
  totalDocuments: number;
  onOpenPayment: () => void;
  className?: string;
}

export default function StorageLimitIndicator({
  totalDocuments,
  onOpenPayment,
  className,
}: StorageLimitIndicatorProps) {
  const { subscription } = useUserSubscription();

  const { isUsingTrial } = useIsTrialActive();

  const currentLimit = subscription?.plan?.maxFiles || 6;

  const remainingFiles = Math.max(0, currentLimit - totalDocuments);

  const usagePercentage = Math.min(100, (totalDocuments / currentLimit) * 100);

  const isPremium = subscription?.subscription.isPremium;

  const planName = isUsingTrial
    ? "Plan de prueba"
    : subscription?.plan?.name || "Plan Básico";

  const getProgressColor = () => {
    if (usagePercentage === 100) return "from-red-600 via-red-500 to-red-600";
    if (usagePercentage > 50)
      return "from-amber-600 via-amber-500 to-amber-600";
    return "from-green-600 via-green-500 to-green-600";
  };

  const getMessage = () => {
    if (remainingFiles === 0) {
      return "Has alcanzado el límite de archivos para tu plan actual. 😱";
    }

    if (remainingFiles <= 3) {
      return `¡Atención! Solo puedes subir ${remainingFiles} ${remainingFiles === 1 ? "archivo más" : "archivos más"} con tu plan actual. 🙂`;
    }

    return `Puedes subir ${remainingFiles} ${remainingFiles === 1 ? "archivo más" : "archivos más"} con tu plan actual 😊`;
  };

  const getPlanBadgeColor = () => {
    if (isPremium)
      return "bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-0";
    return "bg-background text-muted-foreground";
  };

  return (
    <Card
      className={cn(
        "dark:bg-accent/50 flex flex-col border-0 bg-slate-50",
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-merriweather flex items-center gap-2 text-base font-semibold">
            <Upload className="text-muted-foreground size-5" />
            Almacenamiento de documentos
          </h3>
          <BetterTooltip
            className="max-w-44 text-center"
            content={`Tu plan actual permite hasta ${currentLimit} documentos`}
          >
            <div
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-medium",
                getPlanBadgeColor(),
              )}
            >
              {planName}
            </div>
          </BetterTooltip>
        </div>

        <Progress
          value={usagePercentage}
          indicatorColor={cn("bg-gradient-to-r", getProgressColor())}
          className="dark:bg-alternative/50 h-1.5 bg-slate-200"
        />

        <div className="mt-2 flex justify-between text-sm">
          <span>
            {totalDocuments} de {currentLimit} documentos
          </span>
          <span
            className={
              remainingFiles <= 3
                ? "font-medium text-red-500"
                : "text-muted-foreground"
            }
          >
            {remainingFiles} restantes
          </span>
        </div>

        <div
          className={cn(
            "mt-3 flex items-start gap-2 rounded-md p-2 text-sm",
            remainingFiles === 0
              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
              : remainingFiles <= 3
                ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
          )}
        >
          {remainingFiles <= 3 && <AlertCircle className="h-4 w-4 shrink-0" />}
          <div>
            <p className="font-medium">{getMessage()}</p>
            {remainingFiles <= 3 &&
              subscription?.plan?.id !== "premium-plus" && (
                <p className="mt-0.5 text-[11px] opacity-80">
                  Actualiza tu plan para aumentar tu capacidad de
                  almacenamiento.
                </p>
              )}
          </div>
        </div>
      </CardContent>
      {remainingFiles <= 3 && subscription?.plan?.id !== "premium-plus" && (
        <CardFooter className="justify-end p-4 pt-0">
          <UpgradeButton
            variant="gradient"
            size="sm"
            onClick={onOpenPayment}
            className="mt-3 rounded-full"
          >
            Mejorar plan
          </UpgradeButton>
        </CardFooter>
      )}
    </Card>
  );
}
