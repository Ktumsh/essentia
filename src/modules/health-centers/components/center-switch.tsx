import { Switch } from "@nextui-org/react";
import { HospitalIcon, PharmacyIcon } from "@/modules/icons/miscellaneus";
import TooltipCTN from "@/modules/core/components/ui/tooltip-ctn";

interface Props {
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  onSwitchChange: (value: boolean) => void;
}

export default function CenterSwitch({
  isSelected,
  setIsSelected,
  onSwitchChange,
}: Props) {
  const handleSwitchChange = (selected: boolean) => {
    setIsSelected(selected);
    onSwitchChange(selected);
  };

  return (
    <TooltipCTN
      content={
        isSelected
          ? "Buscar farmacias cercanas"
          : "Buscar centros de salud cercanos"
      }
      placement="top-start"
    >
      <div className="flex flex-col gap-2 bg-base md:min-w-48">
        <Switch
          size="lg"
          isSelected={isSelected}
          onValueChange={handleSwitchChange}
          thumbIcon={isSelected ? <HospitalIcon /> : <PharmacyIcon />}
          className="flex flex-col justify-center sm:flex-row z-10 gap-2 sm:gap-0"
          classNames={{
            label:
              "text-xs sm:text-base text-base-color dark:text-base-color-dark",
            wrapper:
              "group-data-[selected=true]:bg-white bg-white dark:group-data-[selected=true]:bg-base-dark dark:bg-base-dark shadow-small mr-0 sm:mr-2",
            thumb: "bg-bittersweet-400 dark:bg-cerise-red-600",
            thumbIcon: "text-white",
          }}
        >
          <span className="hidden sm:block">
            {isSelected ? "Centros de salud" : "Farmacias"}
          </span>
          <span className="sm:hidden block self-start w-full">
            {isSelected ? "Centros" : "Farmacias"}
          </span>
        </Switch>
      </div>
    </TooltipCTN>
  );
}
