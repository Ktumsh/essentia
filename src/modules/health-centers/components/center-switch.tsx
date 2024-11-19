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
    >
      <div className="bg-base flex min-w-20 flex-col items-center justify-center gap-1 text-xs md:min-w-0 md:flex-row md:justify-start md:gap-2 md:text-sm">
        <Switch
          checked={isSelected}
          onCheckedChange={handleSwitchChange}
          className="pointer-events-auto data-[state=checked]:bg-white data-[state=unchecked]:bg-white dark:data-[state=checked]:bg-full-dark dark:data-[state=unchecked]:bg-full-dark md:data-[state=checked]:bg-main md:data-[state=unchecked]:bg-main dark:md:data-[state=checked]:bg-main-dark dark:md:data-[state=unchecked]:bg-main-dark"
          thumbClass="bg-main md:bg-white text-main-dark dark:bg-main-dark dark:md:bg-full-dark dark:text-main md:text-main dark:md:text-main-dark"
        >
          {isSelected ? <HospitalIcon /> : <PharmacyIcon />}
        </Switch>
        <span className="w-full self-start text-center text-main-dark sm:hidden">
          {isSelected ? "Centros" : "Farmacias"}
        </span>
      </div>
    </BetterTooltip>
  );
};

export default CenterSwitch;
