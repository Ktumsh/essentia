import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface InfoFieldItemProps {
  field: string;
  value: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

const InfoFieldItem = ({
  field,
  value,
  icon: Icon,
  children,
}: InfoFieldItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-foreground/80 inline-flex flex-1 items-center gap-2.5 text-xs font-normal">
        {Icon && <Icon className="size-3.5" />}
        <span className="text-nowrap">{field}</span>
        {children}
      </div>
      <div
        className={cn("line-clamp-2 pt-1 text-sm font-medium", Icon && "pl-6")}
      >
        {value}
      </div>
    </div>
  );
};

export default InfoFieldItem;
