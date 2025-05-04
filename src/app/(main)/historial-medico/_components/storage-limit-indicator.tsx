"use client";

import { AlertCircle, Upload } from "lucide-react";

import { UpgradeButton } from "@/components/button-kit/upgrade-button";
import { Badge } from "@/components/kit/badge";
import { Card, CardContent, CardFooter } from "@/components/kit/card";
import { Progress } from "@/components/kit/progress";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useTrial } from "@/hooks/use-trial";
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

  const { isTrialActive } = useTrial();

  const currentLimit = subscription?.plan?.maxDocuments ?? 12;
  const isUnlimited = subscription?.plan?.isUnlimited || currentLimit === null;

  const remainingDocuments = isUnlimited
    ? Infinity
    : Math.max(0, currentLimit - totalDocuments);

  const usagePercentage = isUnlimited
    ? 0
    : Math.min(100, (totalDocuments / currentLimit) * 100);

  const isPremium = subscription?.subscription.isPremium;
  const isPremiumPlus = subscription?.plan?.id === "premium-plus";

  const planName = isTrialActive
    ? "Prueba Gratis"
    : subscription?.plan?.name || "Básico";

  const getProgressColor = () => {
    if (usagePercentage === 100) return "from-red-600 via-red-500 to-red-600";
    if (usagePercentage > 50)
      return "from-amber-600 via-amber-500 to-amber-600";
    return "from-green-600 via-green-500 to-green-600";
  };

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

  const getPlanBadgeColor = () => {
    if ((isPremium || isTrialActive) && !isPremiumPlus) {
      return "bg-premium text-white border-0";
    } else if (isPremiumPlus) {
      return "bg-premium-plus text-white border-0";
    }
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
            content={
              isUnlimited
                ? "Tu plan actual permite documentos ilimitados"
                : `Tu plan actual permite hasta ${currentLimit} documentos`
            }
          >
            <Badge
              className={cn("h-5 px-1.5 py-0 text-xs", getPlanBadgeColor())}
            >
              {planName}
            </Badge>
          </BetterTooltip>
        </div>

        {!isUnlimited && (
          <Progress
            value={usagePercentage}
            indicatorColor={cn("bg-gradient-to-r", getProgressColor())}
            className="dark:bg-alternative/50 h-1.5 bg-slate-200"
          />
        )}

        <div className="mt-2 flex justify-between text-sm">
          <span>
            {isUnlimited
              ? `${totalDocuments} ${totalDocuments === 1 ? "documento" : "documentos"}`
              : `${totalDocuments} de ${currentLimit} documentos`}
          </span>
          <span
            className={
              !isUnlimited && remainingDocuments <= 3
                ? "font-medium text-red-500"
                : "text-muted-foreground"
            }
          >
            {isUnlimited ? "Ilimitado" : `${remainingDocuments} restantes`}
          </span>
        </div>

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
              <p className="font-medium">{getMessage()}</p>
              {remainingDocuments <= 3 &&
                subscription?.plan?.id !== "premium-plus" && (
                  <p className="mt-0.5 text-[11px] opacity-80">
                    Actualiza tu plan para aumentar tu capacidad de
                    almacenamiento.
                  </p>
                )}
            </div>
          </div>
        )}
      </CardContent>
      {!isUnlimited &&
        remainingDocuments <= 3 &&
        subscription?.plan?.id !== "premium-plus" && (
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
