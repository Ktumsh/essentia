"use client";

import { CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { BookmarkButton } from "@/components/button-kit/bookmark-button";
import { CopyButton } from "@/components/button-kit/copy-button";
import { RefreshButton } from "@/components/button-kit/refresh-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils";

import { getAllRecommendationSaved } from "../../_lib/utils";

import type { AIRecommendation, SavedRecommendation } from "@/lib/types";

interface RecommendationsHeaderProps {
  recommendations: Array<AIRecommendation>;
  savedRecommendations: Array<SavedRecommendation>;
  onShareRecommendation: (
    recommendation: SavedRecommendation | SavedRecommendation[],
  ) => void;
  onSaveRecommendation: (recommendations: SavedRecommendation[]) => void;
  onStartAnalysis: () => void;
  isSaved: (
    rec: SavedRecommendation,
    savedList: SavedRecommendation[],
  ) => boolean;
  description: string;
}

const RecommendationsHeader = ({
  recommendations,
  savedRecommendations,
  onShareRecommendation,
  onSaveRecommendation,
  onStartAnalysis,
  isSaved,
  description,
}: RecommendationsHeaderProps) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = async () => {
    const textFromParts = recommendations
      .map(
        (rec) =>
          `${rec.title}\nRecomendación: ${rec.description}\nPrioridad: ${
            rec.priority === "high"
              ? "Alta"
              : rec.priority === "medium"
                ? "Media"
                : "Baja"
          }\n\n`,
      )
      .join("");

    if (!textFromParts) {
      toast.error("¡No hay texto que copiar!");
      return;
    }

    await copyToClipboard(textFromParts);
    toast.success("¡Texto copiado!");
  };

  const allRecommendationsSaved = getAllRecommendationSaved({
    recommendations,
    savedRecommendations,
    isSaved: isSaved,
  });

  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      <div className="flex items-center gap-2">
        <BetterTooltip content="Generar nuevas recomendaciones">
          <RefreshButton
            variant="ghost"
            size="icon"
            onClick={onStartAnalysis}
            className="hover:bg-background"
          />
        </BetterTooltip>
        <BetterTooltip content="Copiar">
          <CopyButton
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-background"
          />
        </BetterTooltip>
        <BetterTooltip content="Compartir">
          <ShareButton
            variant="ghost"
            size="icon"
            onClick={() =>
              recommendations.length > 0 &&
              onShareRecommendation(recommendations)
            }
            className="hover:bg-background"
          />
        </BetterTooltip>
        {allRecommendationsSaved ? (
          <BetterTooltip content="Recomendaciones guardadas">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-default text-emerald-500 hover:bg-transparent dark:text-emerald-400"
            >
              <CheckCheck className="size-4" />
            </Button>
          </BetterTooltip>
        ) : (
          <BetterTooltip content="Guardar recomendaciones">
            <BookmarkButton
              variant="ghost"
              size="icon"
              onClick={() => onSaveRecommendation(recommendations)}
              className={cn(
                "hover:bg-background",
                allRecommendationsSaved && "fill-foreground",
              )}
            />
          </BetterTooltip>
        )}
      </div>
    </div>
  );
};

export default RecommendationsHeader;
