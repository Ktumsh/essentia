"use client";

import { memo, useState } from "react";

import { cn } from "@/lib/utils";

import CenterSwitch from "./center-switch";

interface MapHeaderProps {
  onSwitchChange: (value: boolean) => void;
}

const MapHeader = ({ onSwitchChange }: MapHeaderProps) => {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="pointer-events-none absolute top-0 left-1/2 z-10 my-2 flex w-full -translate-x-1/2 items-end justify-end px-2 md:items-center">
      <div className="md:bg-background flex items-center justify-between gap-4 rounded-full md:px-4 md:py-1.5 md:shadow-md">
        <p
          className={cn(
            "text-muted-foreground hidden px-5 text-sm md:block lg:px-0",
            {
              "text-foreground": isSelected,
            },
          )}
        >
          Centros de salud
        </p>
        <CenterSwitch
          onSwitchChange={onSwitchChange}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
        <p
          className={cn(
            "text-muted-foreground hidden px-5 text-sm md:block lg:px-0",
            {
              "text-foreground": !isSelected,
            },
          )}
        >
          Farmacias
        </p>
      </div>
    </div>
  );
};

export default memo(MapHeader);
