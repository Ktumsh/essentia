import { cn } from "@/utils";

import type { LucideIcon } from "lucide-react";

const InfoCard = ({
  icon: Icon,
  title,
  children,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-muted hover:border-alternative rounded-lg border p-3 transition",
      className,
    )}
  >
    <div className="mb-2 flex items-center gap-1.5">
      <div className="bg-background ring-border flex size-6 items-center justify-center rounded-full ring-1">
        <Icon className="text-muted-foreground size-3.5" />
      </div>
      <h3 className="truncate text-sm leading-normal font-medium">{title}</h3>
    </div>
    <div className="text-foreground/80 text-sm leading-relaxed">{children}</div>
  </div>
);

export default InfoCard;
