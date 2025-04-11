"use client";

import { ChevronDown, ChevronUp, Activity } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import { MedicalHistoryActivityWithDetails } from "@/db/querys/medical-history-querys";
import { cn } from "@/lib/utils";

import MedicalHistoryActivity from "./medical-history-activity";

interface ActivitySectionProps {
  activities: MedicalHistoryActivityWithDetails[];
  onViewDocument?: (documentId: string) => void;
  onRestoreDocument?: (documentId: string) => void;
  hasNewActivity?: boolean;
  onViewAll?: () => void;
}

export default function ActivitySection({
  activities,
  onViewDocument,
  onRestoreDocument,
  hasNewActivity = false,
  onViewAll,
}: ActivitySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasNotification, setHasNotification] = useState(hasNewActivity);

  useEffect(() => {
    if (hasNewActivity) {
      setHasNotification(true);
    }
  }, [hasNewActivity]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (hasNotification && !isExpanded) {
      setHasNotification(false);
    }
  };

  return (
    <div className="bg-background overflow-hidden rounded-xl border shadow-xs transition-all duration-200 hover:shadow-md">
      <div
        className="flex cursor-pointer items-center justify-between p-3"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-2">
          <Activity className="text-muted-foreground size-5" />
          <h3 className="font-merriweather text-base font-semibold">
            Actividad reciente
          </h3>
          {hasNotification && (
            <Badge className="h-5 border-0 bg-green-500 px-1.5 text-xs text-white dark:bg-green-600">
              Nueva
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" className="size-7">
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="p-3 pt-0">
          <MedicalHistoryActivity
            activities={activities ?? []}
            onViewDocument={onViewDocument}
            onRestoreDocument={onRestoreDocument}
            onViewAll={onViewAll}
          />
        </div>
      </div>
    </div>
  );
}
