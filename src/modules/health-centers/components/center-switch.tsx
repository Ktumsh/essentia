"use client";

import { Switch } from "@nextui-org/react";
import { useState } from "react";

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
      content={
        isSelected
          ? "Buscar farmacias cercanas"
          : "Buscar centros de salud cercanos"
      }
      side="bottom"
      align="end"
    >
      <div className="bg-base flex flex-col gap-2 md:min-w-48">
        <Switch
          size="lg"
          isSelected={isSelected}
          onValueChange={handleSwitchChange}
          thumbIcon={isSelected ? <HospitalIcon /> : <PharmacyIcon />}
          className="pointer-events-auto z-10 flex flex-col justify-center gap-2 sm:flex-row sm:gap-0"
          classNames={{
            label:
              "text-xs sm:text-base text-white md:text-main-h md:dark:text-main-dark",
            wrapper:
              "group-data-[selected=true]:bg-white bg-white dark:group-data-[selected=true]:bg-full-dark dark:bg-full-dark border border-gray-200 dark:border-dark shadow-small mr-0 sm:mr-2",
            thumb: "bg-bittersweet-400 dark:bg-cerise-red-600",
            thumbIcon: "text-white",
          }}
        >
          <span className="hidden sm:block">
            {isSelected ? "Centros de salud" : "Farmacias"}
          </span>
          <span className="block w-full self-start sm:hidden">
            {isSelected ? "Centros" : "Farmacias"}
          </span>
        </Switch>
      </div>
    </BetterTooltip>
  );
};

export default CenterSwitch;
