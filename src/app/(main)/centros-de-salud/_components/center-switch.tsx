"use client";

import { useState } from "react";

import { Switch } from "@/components/kit/switch";
import { BetterTooltip } from "@/components/kit/tooltip";
import { HospitalIcon, PharmacyIcon } from "@/components/ui/icons/miscellaneus";

interface Props {
  onSwitchChange: (value: boolean) => void;
}

const CenterSwitch = ({ onSwitchChange }: Props) => {
  const [isSelected, setIsSelected] = useState(true);

  const handleSwitchChange = (selected: boolean) => {
    setIsSelected(selected);
    onSwitchChange(selected);
  };

  return (
    <BetterTooltip
      content={isSelected ? "Buscar farmacias" : "Buscar centros"}
      side="bottom"
      align="end"
    >
      <div className="text-xxs flex min-w-20 flex-col items-center justify-center gap-1 md:min-w-0 md:flex-row md:justify-start md:gap-2 md:text-sm">
        <Switch
          aria-label="Cambiar entre centros y farmacias"
          checked={isSelected}
          onCheckedChange={handleSwitchChange}
          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary pointer-events-auto shadow-md md:shadow-none"
          thumbClass="text-foreground"
        >
          {isSelected ? (
            <HospitalIcon className="size-3" />
          ) : (
            <PharmacyIcon className="size-3" />
          )}
        </Switch>
        <span className="text-foreground w-full self-start text-center font-medium md:sr-only">
          {isSelected ? "Centros" : "Farmacias"}
        </span>
      </div>
    </BetterTooltip>
  );
};

export default CenterSwitch;
