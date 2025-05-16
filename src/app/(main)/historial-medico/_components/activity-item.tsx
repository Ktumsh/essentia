"use client";

import { ChevronRight, RefreshCw } from "lucide-react";
import React from "react";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import {
  getActionColor,
  getActionIcon,
  getActionSelfText,
  getActionText,
  getRelativeTime,
} from "../_lib/utils";

import type { MedicalHistoryActivity } from "@/lib/types";

interface ActivityItemProps {
  item: MedicalHistoryActivity;
  onViewDocument?: (id: string) => void;
  onRestoreDocument?: (documentId: string) => void;
}

const ActivityItem = ({
  item,
  onViewDocument,
  onRestoreDocument,
}: ActivityItemProps) => {
  const isMobile = useIsMobile();

  if (item.source === "folder") {
    return (
      <div key={item.id} className="group/item ...">
        <div className="mt-0.5">{getActionIcon(item.action)}</div>
        <div className="flex-1">
          <p className="text-xs md:text-sm">
            <span className="font-medium">Tú</span>{" "}
            {getActionSelfText(item.action)} carpeta{" "}
            <span className="font-medium">{item.folder.name}</span>
          </p>
          <span
            className={cn(
              "text-xxs! h-5 px-1.5 py-0 capitalize md:text-xs!",
              getActionColor(item.action),
            )}
          >
            {getActionText(item.action)}
          </span>
          <p className="text-muted-foreground text-xxs md:text-xs">
            {formatDate(new Date(item.createdAt), "HH:mm")} (
            {getRelativeTime(new Date(item.createdAt))})
          </p>
        </div>
      </div>
    );
  }

  const { medicalHistory, action, createdAt } = item;
  return (
    <div
      key={item.id}
      className="group/item dark:hover:bg-accent/50 flex items-start gap-2 rounded-md p-2 transition-colors hover:bg-slate-50"
    >
      <div className="mt-0.5">{getActionIcon(action)}</div>
      <div className="flex-1">
        <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
          <p className="text-xs md:text-sm">
            <span className="font-medium">Tú</span> {getActionSelfText(action)}{" "}
            <span
              className="cursor-pointer font-medium hover:underline"
              onClick={() => onViewDocument?.(item.medicalHistoryId)}
            >
              {medicalHistory.condition}
            </span>
          </p>
          <Badge
            variant="outline"
            className={cn(
              "text-xxs! h-5 px-1.5 py-0 capitalize md:text-xs!",
              getActionColor(action),
            )}
          >
            {getActionText(action)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground text-xxs md:text-xs">
            {formatDate(new Date(createdAt), "HH:mm")} (
            {getRelativeTime(new Date(createdAt))})
          </p>
          <Badge
            variant="outline"
            className="bg-background dark:border-alternative text-xxs! h-5 border-slate-300 px-1.5 py-0 md:text-xs!"
          >
            {medicalHistory.type}
          </Badge>
        </div>
      </div>
      <div
        className={cn(
          "transition-opacity",
          isMobile ? "opacity-100" : "opacity-0 group-hover/item:opacity-100",
        )}
      >
        {action === "deleted" && onRestoreDocument && (
          <BetterTooltip content="Restaurar" side="top" align="end">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-amber-600 hover:bg-amber-100 hover:text-amber-600 dark:hover:bg-amber-950 dark:hover:text-amber-400"
              onClick={() => onRestoreDocument(item.medicalHistoryId)}
            >
              <RefreshCw className="size-3.5!" />
            </Button>
          </BetterTooltip>
        )}
        {onViewDocument && !medicalHistory.isDeleted && (
          <BetterTooltip content="Ver detalles" side="top" align="end">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background size-7"
              onClick={() => onViewDocument(item.medicalHistoryId)}
            >
              <ChevronRight className="size-3.5!" />
            </Button>
          </BetterTooltip>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
