"use client";

import { getRouteColor , cn } from "@/utils";


import type { NavConfig } from "@/config/nav.config";

interface RouteBadgeProps {
  routeIndex: number;
  routeDetails?: NavConfig["asideMenuLinks"][number];
  className?: string;
}

const RouteBadge = ({
  routeIndex,
  routeDetails,
  className,
}: RouteBadgeProps) => {
  return (
    <div className={cn("z-20", className)}>
      <div
        className={cn(
          "mask mask-squircle flex size-10 items-center justify-center bg-linear-to-br shadow-sm",
          getRouteColor(routeIndex, "gradient"),
        )}
      >
        {routeDetails && (
          <routeDetails.activeIcon className="size-5 text-white" />
        )}
      </div>
    </div>
  );
};

export default RouteBadge;
