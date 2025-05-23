"use client";

import { Circle, EllipsisIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/kit/button";
import { DrawerClose } from "@/components/kit/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";
import { capitalize } from "@/utils/format";

import { useActivityFilter } from "../_hooks/use-activity-filter-options";
import {
  getActionBgColor,
  getActionIcon,
  getActionSelfText,
  getRelativeTime,
} from "../_lib/utils";

import type { MedicalHistoryActivity } from "@/lib/types";

interface ActivityPreviewProps {
  activities: Array<MedicalHistoryActivity>;
  hasNewActivity: boolean;
  onViewAll: () => void;
}

const ActivityPreview = ({
  activities,
  hasNewActivity,
  onViewAll,
}: ActivityPreviewProps) => {
  const { user } = useUserProfile();

  const { username } = user || {};

  const [hasNotification, setHasNotification] = useState(hasNewActivity);

  useEffect(() => {
    if (hasNewActivity) {
      setHasNotification(true);
    }
  }, [hasNewActivity]);

  const toggleMarkAsRead = () => {
    if (hasNotification) {
      setHasNotification(false);
    }
  };

  const { filteredActivities } = useActivityFilter(activities, {
    defaultDateRange: "all",
    defaultActiveTab: "all",
    defaultSortOrder: "newest",
  });

  const sortedActivities = filteredActivities.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const previewActivities = sortedActivities.slice(0, 5);

  return (
    <>
      <p className="mt-6 text-sm font-medium">
        Actividad Reciente{" "}
        {hasNotification && (
          <span>
            <Circle className="mb-0.5 ml-1 inline size-2 fill-green-500 text-green-500" />
          </span>
        )}
      </p>
      {previewActivities.length > 0 ? (
        <div onMouseEnter={toggleMarkAsRead} className="mt-3 overflow-hidden">
          <div className="timeline timeline-vertical timeline-snap-icon timeline-hr-sm ms-[-100%] pl-10">
            {previewActivities.map((item, idx) => (
              <ActivityItem
                key={item.id}
                index={idx}
                activity={item}
                username={username}
              />
            ))}
            <ActivityItem hasMore onViewAll={onViewAll} />
          </div>
        </div>
      ) : (
        <div className="border-alternative mt-3 flex h-20 items-center justify-center rounded-xl border border-dashed">
          <p className="text-muted-foreground text-sm">
            Aún no tienes actividad reciente
          </p>
        </div>
      )}
    </>
  );
};

export default ActivityPreview;

function ActivityItem({
  activity,
  hasMore,
  username,
  index,
  onViewAll,
}: {
  activity?: MedicalHistoryActivity;
  hasMore?: boolean;
  username?: string;
  index?: number;
  onViewAll?: () => void;
}) {
  const isMobile = useIsMobile();

  if (hasMore) {
    return (
      <li>
        <hr />
        <div className="timeline-middle">
          <div className="bg-alternative/50 flex items-center justify-center rounded-full p-2">
            <EllipsisIcon className="size-4" />
          </div>
        </div>
        <div className="timeline-end mx-5 my-2 w-full">
          {isMobile ? (
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewAll}
                className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs"
              >
                Ver actividad completa
              </Button>
            </DrawerClose>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewAll}
              className="bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs"
            >
              Ver actividad completa
            </Button>
          )}
        </div>
      </li>
    );
  }

  if (!activity) return null;

  if (activity.source === "folder") {
    const { folder, action, createdAt } = activity;

    const selftext = capitalize(getActionSelfText(action));

    return (
      <li>
        {index !== 0 && <hr />}
        <div className="timeline-middle">
          <div
            className={cn(
              "flex items-center justify-center rounded-full p-2",
              getActionBgColor(action),
            )}
          >
            {getActionIcon(action)}
          </div>
        </div>
        <div className="timeline-end my-2.5 w-full pl-4">
          <div className="flex items-center justify-between">
            <span className="truncate text-sm font-medium">{username}</span>
            <span className="text-muted-foreground text-xs">
              {getRelativeTime(new Date(createdAt))}
            </span>
          </div>
          <p className="text-foreground/80 truncate text-xs">
            {selftext} la carpeta “{folder.name}”
          </p>
        </div>
        <hr />
      </li>
    );
  }

  const { medicalHistory, action, createdAt } = activity;

  return (
    <li>
      {index !== 0 && <hr />}
      <div className="timeline-middle">
        <div
          className={cn(
            "flex items-center justify-center rounded-full p-2",
            getActionBgColor(action),
          )}
        >
          {getActionIcon(action)}
        </div>
      </div>
      <div className="timeline-end my-2.5 w-full pl-4">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium">{username}</span>
          <span className="text-muted-foreground text-xs">
            {getRelativeTime(new Date(createdAt))}
          </span>
        </div>
        <p className="text-foreground/80 truncate text-xs">
          {capitalize(getActionSelfText(action))} “{medicalHistory.condition}”
        </p>
      </div>
      <hr />
    </li>
  );
}
