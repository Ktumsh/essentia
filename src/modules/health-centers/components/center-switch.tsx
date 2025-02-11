"use client";

import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import { BetterTooltip } from "@/components/ui/tooltip";
import { HospitalIcon, PharmacyIcon } from "@/modules/icons/miscellaneus";

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
      <div className="bg-base text-xxs flex min-w-20 flex-col items-center justify-center gap-1 md:min-w-0 md:flex-row md:justify-start md:gap-2 md:text-sm">
        <Switch
          aria-label="Cambiar entre centros y farmacias"
          checked={isSelected}
          onCheckedChange={handleSwitchChange}
          className="data-[state=checked]:bg-danger data-[state=unchecked]:bg-danger dark:data-[state=checked]:bg-danger dark:data-[state=unchecked]:bg-danger pointer-events-auto shadow-md md:shadow-none"
          thumbClass="bg-main bg-white text-main-dark dark:bg-full-dark dark:text-main text-main dark:text-main-dark"
        >
          {isSelected ? <HospitalIcon /> : <PharmacyIcon />}
        </Switch>
        <span className="text-main w-full self-start text-center font-medium md:sr-only dark:text-white">
          {isSelected ? "Centros" : "Farmacias"}
        </span>
      </div>
    </BetterTooltip>
  );
};

export default CenterSwitch;
