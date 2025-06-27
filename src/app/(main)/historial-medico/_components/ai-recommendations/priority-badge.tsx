import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";

import { priorityConfig } from "../../_lib/utils";

import type { Priority } from "@/lib/types";

interface PriorityBadgeProps {
  priority: Priority;
  showIcon?: boolean;
}

const PriorityBadge = ({ priority, showIcon = true }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];

  const Icon = config.icon;

  return (
    <Badge
      className={cn(
        config.bgColor,
        config.textColor,
        config.borderColor,
        "border",
      )}
    >
      {showIcon && (
        <span className="text-xs">{<Icon className="size-3.5" />}</span>
      )}
      {config.label}
    </Badge>
  );
};

export default PriorityBadge;
