"use client";

import { MoreVerticalIcon, SparkleIcon, Tag } from "lucide-react";
import { useMemo } from "react";

import { ChevronButton } from "@/components/button-kit/chevron-button";
import { DeleteButton } from "@/components/button-kit/delete-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import { Checkbox } from "@/components/kit/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/kit/dropdown-menu";
import { BetterTooltip } from "@/components/kit/tooltip";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import {
  getPriorityBgColor,
  getPriorityBorderColor,
  getPriorityColor,
  getPriorityText,
  getTagColor,
} from "../_lib/utils";

import type { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";

interface RecommendationRowProps {
  recom: SavedAIRecommendation;
  onDeleteRecommendation: (rec: SavedAIRecommendation) => void;
  onShareRecommendation: (recommendation: SavedAIRecommendation) => void;
  openDetailDialog: (rec: SavedAIRecommendation) => void;
  selected: boolean;
  onToggleSelect: () => void;
}

const RecommendationRow = ({
  recom,
  onDeleteRecommendation,
  onShareRecommendation,
  openDetailDialog,
  selected,
  onToggleSelect,
}: RecommendationRowProps) => {
  const priorityText = useMemo(
    () => getPriorityText(recom.priority),
    [recom.priority],
  );
  const priorityColor = useMemo(
    () => getPriorityColor(recom.priority),
    [recom.priority],
  );
  const priorityBgColor = useMemo(
    () => getPriorityBgColor(recom.priority),
    [recom.priority],
  );

  const priorityBorderColor = useMemo(
    () => getPriorityBorderColor(recom.priority),
    [recom.priority],
  );
  return (
    <div className="group/row border-border/40 hover:bg-muted/20 grid grid-cols-20 items-center gap-4 border-t px-4 py-3">
      <div className="col-span-1 flex items-center">
        <Checkbox
          checked={selected}
          onCheckedChange={onToggleSelect}
          className="rounded-md"
        />
      </div>
      <div className="col-span-8 flex items-center gap-3">
        <div className="bg-background rounded-xl p-2">
          <SparkleIcon className="text-primary size-4" />
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-base font-medium">{recom.title}</span>
        </div>
      </div>
      <div className="text-muted-foreground col-span-2 text-sm">
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
      <div className="text-muted-foreground col-span-3 text-sm">
        {formatDate(recom.createdAt, "dd MMM yyyy")}
      </div>
      {recom.relatedTags.length > 0 && (
        <div className="col-span-4 mt-2 flex flex-wrap gap-1">
          {recom.relatedTags.slice(0, 1).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={cn("font-normal text-white", getTagColor(tag))}
            >
              <Tag className="size-2.5!" />
              {tag}
            </Badge>
          ))}
          {recom.relatedTags.length > 1 && (
            <Badge
              variant="outline"
              className="bg-background text-foreground/80"
            >
              +{recom.relatedTags.length - 1}
            </Badge>
          )}
        </div>
      )}
      <div className="col-span-2 flex justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVerticalIcon />
              <span className="sr-only">Más opciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <ChevronButton
                    variant="ghost"
                    onClick={() => openDetailDialog(recom)}
                    className="h-auto w-full justify-start"
                  >
                    Ver detalles
                  </ChevronButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <ShareButton
                    variant="ghost"
                    onClick={() => onShareRecommendation(recom)}
                    className="h-auto w-full justify-start"
                  >
                    Compartir
                  </ShareButton>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" asChild>
                <DeleteButton
                  variant="ghost"
                  onClick={() => onDeleteRecommendation(recom)}
                  className="h-auto w-full justify-start"
                >
                  Eliminar
                </DeleteButton>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default RecommendationRow;
