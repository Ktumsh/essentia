"use client";

import { BookmarkButton } from "@/components/button-kit/bookmark-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils";

import ConfidenceMeter from "./confidence-meter";
import PriorityBadge from "./priority-badge";
import { recommendationTypeStyleConfig } from "../../_lib/utils";

import type { AIRecommendation } from "@/lib/types";

interface AnalysisCardProps {
  recommendation: AIRecommendation;
  onViewDetails: () => void;
  onShare: () => void;
  onToggleSave: () => Promise<void>;
  isSaved: () => boolean;
  compact?: boolean;
}

const AnalysisCard = ({
  recommendation,
  onViewDetails,
  onShare,
  onToggleSave,
  isSaved,
}: AnalysisCardProps) => {
  const saved = isSaved();

  const categoryGradient =
    recommendationTypeStyleConfig[recommendation.type].gradient;

  const categoryLabel =
    recommendationTypeStyleConfig[recommendation.type].label;

  return (
    <Card className="bg-background/80 backdrop-blur-md">
      <div className={cn("h-1 bg-gradient-to-r", categoryGradient)} />

      <CardHeader className="flex-row items-start p-4 pb-0">
        <div className="flex-1">
          <CardTitle className="mb-2">{recommendation.title}</CardTitle>
          <div className="flex items-center gap-3">
            <PriorityBadge priority={recommendation.priority} />
            <div className="text-muted-foreground text-xs">{categoryLabel}</div>
          </div>
        </div>
        <ConfidenceMeter confidence={recommendation.confidence} />
      </CardHeader>

      <CardContent className="p-4 pb-0">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {recommendation.description}
        </p>
      </CardContent>

      <CardFooter className="justify-between p-4">
        <p className="bg-premium bg-clip-text text-xs font-medium text-transparent">
          Generado por IA
        </p>
        <div className="flex gap-1">
          <BetterTooltip content={saved ? "✓ Guardada" : "Guardar"}>
            <BookmarkButton
              variant="ghost"
              size="icon"
              onClick={onToggleSave}
              className={cn(
                "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-950 dark:hover:text-emerald-400",
                saved && "**:fill-emerald-600 dark:**:fill-emerald-400",
              )}
            />
          </BetterTooltip>
          <BetterTooltip content="Compartir">
            <ShareButton
              variant="ghost"
              size="icon"
              onClick={onShare}
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-600 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-400"
            />
          </BetterTooltip>
          <Button
            radius="full"
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
          >
            Ver más detalles
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnalysisCard;
