"use client";

import { MoreVerticalIcon, SparklesIcon, Tag } from "lucide-react";

import { ChevronButton } from "@/components/button-kit/chevron-button";
import { DeleteButton } from "@/components/button-kit/delete-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn, formatDate } from "@/utils";

import { getPriorityBadge, getPriorityText, getTagColor } from "../_lib/utils";

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
  const priorityText = getPriorityText(recom.priority);
  const priorityBadge = getPriorityBadge(recom.priority);

  return (
    <tr
      onDoubleClick={(e) => {
        e.stopPropagation();
        openDetailDialog(recom);
      }}
      className="group/row hover:bg-accent border-t text-sm"
    >
      <td className="px-4 py-3">
        <div className="flex items-center">
          <Checkbox
            checked={selected}
            onCheckedChange={onToggleSelect}
            className="border-alternative shadow-none"
          />
        </div>
      </td>
      <td className="max-w-72 px-4 py-3 md:max-w-sm">
        <div className="flex items-center gap-3">
          <div className="bg-background rounded-xl p-2">
            <SparklesIcon className="text-primary size-4" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-foreground truncate font-medium">
              {recom.title}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {recom.description}
            </span>
          </div>
        </div>
      </td>
      <td className="text-muted-foreground group-hover/row:text-foreground px-4 py-3">
        <BetterTooltip content={`Prioridad ${priorityText.toLowerCase()}`}>
          <Badge variant="outline" className={priorityBadge.color}>
            {priorityBadge.icon}
            {priorityBadge.label}
          </Badge>
        </BetterTooltip>
      </td>
      <td className="text-muted-foreground group-hover/row:text-foreground px-4 py-3 text-nowrap">
        {formatDate(recom.createdAt, "dd MMM yyyy")}
      </td>
      <td className="text-muted-foreground group-hover/row:text-foreground px-4 py-3">
        <div className="flex gap-1">
          {recom.relatedTags.slice(0, 1).map((tag) => (
            <Badge
              key={tag}
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
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <BetterTooltip content="Ver detalles">
            <ChevronButton
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                openDetailDialog(recom);
              }}
              className="hover:bg-background size-8 group-hover/row:opacity-100 md:opacity-0"
            >
              <span className="sr-only">Ver detalles</span>
            </ChevronButton>
          </BetterTooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreVerticalIcon />
                <span className="sr-only">Más opciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <ShareButton
                  variant="ghost"
                  onClick={() => onShareRecommendation(recom)}
                  className="h-auto w-full justify-start font-normal"
                >
                  Compartir
                </ShareButton>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" asChild>
                <DeleteButton
                  variant="ghost"
                  onClick={() => onDeleteRecommendation(recom)}
                  className="h-auto w-full justify-start font-normal"
                >
                  Eliminar
                </DeleteButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};

export default RecommendationRow;
