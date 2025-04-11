"use client";

import { Tag } from "lucide-react";
import React from "react";

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

import { getPriorityColor, getPriorityText, getTagColor } from "../_lib/utils";

interface SavedRecommendationsCardProps {
  recommendation: SavedAIRecommendation;
  onShareRecommendation?: (rec: SavedAIRecommendation) => void;
  onDeleteRecommendation: (rec: SavedAIRecommendation) => void;
  openDetailDialog: (rec: SavedAIRecommendation) => void;
}

const SavedRecommendationsCard = ({
  recommendation,
  onShareRecommendation,
  onDeleteRecommendation,
  openDetailDialog,
}: SavedRecommendationsCardProps) => {
  const isMobile = useIsMobile();
  return (
    <Card
      key={recommendation.id}
      className="group flex flex-col overflow-hidden border border-indigo-200 shadow-xs transition-all duration-200 hover:shadow-md dark:border-indigo-900"
    >
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{recommendation.title}</CardTitle>
          <Badge
            className={cn(
              getPriorityColor(recommendation.priority),
              "bg-opacity-10 h-5 px-1.5 py-0 text-xs",
            )}
          >
            Prioridad: {getPriorityText(recommendation.priority)}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Guardado el{" "}
          {formatDate(new Date(recommendation.createdAt), "dd MMM yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-4 pb-2">
        <p className="line-clamp-2 text-sm">{recommendation.description}</p>

        {recommendation.relatedTags.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {recommendation.relatedTags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn("h-5 px-1.5 py-0 text-xs", getTagColor(tag))}
                >
                  <Tag className="size-2!" />
                  {tag}
                </Badge>
              ))}
              {recommendation.relatedTags.length > 2 && (
                <Badge
                  variant="outline"
                  className="bg-accent text-foreground/80 h-5 rounded-full px-1.5 py-0 text-xs"
                >
                  +{recommendation.relatedTags.length - 2}
                </Badge>
              )}
            </div>
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
        <div className="text-muted-foreground flex items-center text-xs">
          Generado por IA
        </div>
        <div
          className={cn(
            "flex gap-1 transition-opacity",
            isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default SavedRecommendationsCard;
