import { Button } from "@nextui-org/react";
import { FC } from "react";

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import {
  FullscreenIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@/modules/icons/action";
import { CenterLocationIcon } from "@/modules/icons/status";

interface MapActionsProps {
  handleFullscreen: () => void;
  centerLocation: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const MapActions: FC<MapActionsProps> = (props) => {
  const { handleFullscreen, centerLocation, handleZoomIn, handleZoomOut } =
    props;
  return (
    <>
      <TooltipCTN content="Pantalla completa" placement="left">
        <Button
          aria-label="Pantalla completa"
          isIconOnly
          onPress={handleFullscreen}
          className="hidden md:inline-flex absolute top-2 right-2 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
        >
          <span className="sr-only">Pantalla completa</span>
          <FullscreenIcon className="size-6" />
        </Button>
      </TooltipCTN>
      <div className="absolute bottom-28 md:top-1/2 md:-translate-y-1/2 right-2 flex flex-col h-fit space-y-4 md:space-y-2 z-40">
        <TooltipCTN content="Centrar ubicación" placement="left">
          <Button
            aria-label="Centrar ubicación"
            size="sm"
            radius="full"
            isIconOnly
            onPress={centerLocation}
            className="!size-12 md:!size-9 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
          >
            <span className="sr-only">Centrar ubicación</span>
            <CenterLocationIcon className="size-7 md:size-5" />
          </Button>
        </TooltipCTN>
        <TooltipCTN content="Aumentar" placement="left">
          <Button
            aria-label="Aumentar"
            size="sm"
            radius="full"
            isIconOnly
            onPress={handleZoomIn}
            className="!size-12 md:!size-9 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
          >
            <span className="sr-only">Aumentar</span>
            <ZoomInIcon className="size-7 md:size-5" />
          </Button>
        </TooltipCTN>
        <TooltipCTN content="Alejar" placement="left">
          <Button
            aria-label="Alejar"
            size="sm"
            radius="full"
            isIconOnly
            onPress={handleZoomOut}
            className="!size-12 md:!size-9 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
          >
            <span className="sr-only">Alejar</span>
            <ZoomOutIcon className="size-7 md:size-5" />
          </Button>
        </TooltipCTN>
      </div>
    </>
  );
};

export default MapActions;
