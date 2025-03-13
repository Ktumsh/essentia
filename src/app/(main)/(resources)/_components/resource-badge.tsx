"use client";

import { cn, getResourceColor } from "@/lib/utils";

import type { JSX } from "react";

interface ResourceBadgeProps {
  resourceIndex: number;
  resourceDetails?: {
    name: string;
    link: string;
    icon: (props: any) => JSX.Element;
    activeIcon: (props: any) => JSX.Element;
  };
  className?: string;
}

const ResourceBadge = ({
  resourceIndex,
  resourceDetails,
  className,
}: ResourceBadgeProps) => {
  return (
    <div className={cn("z-20", className)}>
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-lg bg-linear-to-br shadow-sm",
          getResourceColor(resourceIndex, "gradient")
        )}
      >
        {resourceDetails && (
          <resourceDetails.activeIcon className="size-5 text-white" />
        )}
      </div>
    </div>
  );
};

export default ResourceBadge;
