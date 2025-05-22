import { memo } from "react";

import { cn } from "@/lib/utils";

interface SettingsOpsHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const SettingsOptsHeader = ({
  title,
  description,
  children,
  className,
}: SettingsOpsHeaderProps) => {
  return (
    <div className={cn("flex items-center gap-2 pt-8 pb-4", className)}>
      {children}
      <div className="w-full">
        <h1 className="font-merriweather text-xl font-semibold">{title}</h1>
        <p className="text-muted-foreground mt-1 hidden text-sm md:block">
          {description}
        </p>
      </div>
    </div>
  );
};

export default memo(SettingsOptsHeader);
