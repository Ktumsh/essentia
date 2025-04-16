"use client";

import { Switch } from "@/components/kit/switch";
import { BetterTooltip } from "@/components/kit/tooltip";
import { HospitalIcon, PharmacyIcon } from "@/components/ui/icons/miscellaneus";

interface Props {
  onSwitchChange: (value: boolean) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

const CenterSwitch = ({ onSwitchChange, isSelected, setIsSelected }: Props) => {
  const handleSwitchChange = (selected: boolean) => {
    setIsSelected(selected);
    onSwitchChange(selected);
  };

  return (
    <BetterTooltip
      content={isSelected ? "Buscar farmacias" : "Buscar centros de salud"}
      side="bottom"
    >
      <div className="text-xxs flex min-w-20 flex-col items-center justify-center gap-1 md:min-w-0 md:flex-row md:justify-start md:gap-2 md:text-sm">
        <Switch
          aria-label="Cambiar entre centros y farmacias"
          checked={isSelected}
          onCheckedChange={handleSwitchChange}
          className="pointer-events-auto h-6 w-10 shadow-md data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-red-500 md:shadow-none"
          thumbClass="text-foreground size-5 data-[state=checked]:translate-x-0 data-[state=unchecked]:translate-x-4"
        >
          {isSelected ? (
            <HospitalIcon className="size-3.5" />
          ) : (
            <PharmacyIcon className="size-3.5" />
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
