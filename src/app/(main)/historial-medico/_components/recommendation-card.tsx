"use client";

import { SparklesIcon, Tag } from "lucide-react";
import React, { useMemo } from "react";

import { ChevronButton } from "@/components/button-kit/chevron-button";
import { DeleteButton } from "@/components/button-kit/delete-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { BetterTooltip } from "@/components/kit/tooltip";
import { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import {
  getPriorityBgColor,
  getPriorityBorderColor,
  getPriorityColor,
  getPriorityText,
  getTagColor,
} from "../_lib/utils";

interface RecommendationCardProps {
  recommendation: SavedAIRecommendation;
  onShareRecommendation?: (rec: SavedAIRecommendation) => void;
  onDeleteRecommendation: (rec: SavedAIRecommendation) => void;
  openDetailDialog: (rec: SavedAIRecommendation) => void;
}

const RecommendationCard = ({
  recommendation,
  onShareRecommendation,
  onDeleteRecommendation,
  openDetailDialog,
}: RecommendationCardProps) => {
  const isMobile = useIsMobile();

  const actionButtons = (
    <>
      <BetterTooltip content="Ver detalles">
        <ChevronButton
          variant="ghost"
          size="icon"
          onClick={() => openDetailDialog(recommendation)}
          className="size-7 rounded-sm"
        />
      </BetterTooltip>
      {onShareRecommendation && (
        <BetterTooltip content="Compartir">
          <ShareButton
            variant="ghost"
            size="icon"
            onClick={() => onShareRecommendation(recommendation)}
            className="size-7 rounded-sm text-blue-500 hover:bg-blue-50 hover:text-blue-500 dark:text-blue-300 dark:hover:bg-blue-950 dark:hover:text-blue-300 [&_svg]:size-3.5!"
          />
        </BetterTooltip>
      )}
      <BetterTooltip content="Eliminar">
        <DeleteButton
          variant="ghost"
          size="icon"
          onClick={() => onDeleteRecommendation(recommendation)}
          className="size-7 rounded-sm text-red-500! hover:bg-red-50 dark:hover:bg-red-950 [&_svg]:size-3.5!"
        />
      </BetterTooltip>
    </>
  );

  const priorityText = useMemo(
    () => getPriorityText(recommendation.priority),
    [recommendation.priority],
  );
  const priorityColor = useMemo(
    () => getPriorityColor(recommendation.priority),
    [recommendation.priority],
  );
  const priorityBgColor = useMemo(
    () => getPriorityBgColor(recommendation.priority),
    [recommendation.priority],
  );

  const priorityBorderColor = useMemo(
    () => getPriorityBorderColor(recommendation.priority),
    [recommendation.priority],
  );

  return (
    <Card className="group/item bg-muted hover:bg-accent flex flex-col overflow-hidden">
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="mb-2 flex items-start justify-between">
          <div className="bg-background flex items-center justify-center rounded-full p-1.5">
            <SparklesIcon className="text-primary size-5" />
          </div>
          <BetterTooltip content={`Prioridad ${priorityText.toLowerCase()}`}>
            <Badge
              variant="outline"
              className={cn(
                priorityColor,
                "bg-opacity-10",
                priorityBgColor,
                priorityBorderColor,
              )}
            >
              {priorityText}
            </Badge>
          </BetterTooltip>
        </div>
        <CardTitle className="text-base font-medium">
          {recommendation.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          Guardado el{" "}
          {formatDate(new Date(recommendation.createdAt), "dd MMM yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-4 pb-2">
        <p className="text-foreground/80 line-clamp-2 text-sm">
          {recommendation.description}
        </p>
        {recommendation.relatedTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {recommendation.relatedTags.slice(0, 1).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn("font-normal text-white", getTagColor(tag))}
              >
                <Tag className="size-2.5!" />
                {tag}
              </Badge>
            ))}
            {recommendation.relatedTags.length > 1 && (
              <Badge
                variant="outline"
                className="bg-background text-foreground/80"
              >
                +{recommendation.relatedTags.length - 1}
              </Badge>
            )}
          </div>
        )}

        {recommendation.notes && (
          <div className="dark:bg-accent/50 mt-2 rounded-md bg-slate-50 p-2">
            <p className="text-muted-foreground text-xs font-medium">
              Mis notas:
            </p>
            <p className="line-clamp-2 text-xs">{recommendation.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between px-4 pt-2 pb-4">
        <p className="bg-premium bg-clip-text text-xs font-medium text-transparent">
          Generado por IA
        </p>
        <div
          className={cn(
            "flex gap-1 transition-opacity",
            isMobile ? "opacity-100" : "opacity-0 group-hover/item:opacity-100",
          )}
        >
          {actionButtons}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
