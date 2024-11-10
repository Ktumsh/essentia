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
          className="absolute right-2 top-2 hidden bg-white text-main-h dark:bg-full-dark dark:text-main-dark md:inline-flex"
        >
          <span className="sr-only">Pantalla completa</span>
          <FullscreenIcon className="size-6" />
        </Button>
      </TooltipCTN>
      <div className="absolute bottom-28 right-2 z-40 flex h-fit flex-col space-y-4 md:top-1/2 md:-translate-y-1/2 md:space-y-2">
        <TooltipCTN content="Centrar ubicación" placement="left">
          <Button
            aria-label="Centrar ubicación"
            size="sm"
            radius="full"
            isIconOnly
            onPress={centerLocation}
            className="!size-11 bg-white text-main-h dark:bg-full-dark dark:text-main-dark md:!size-9"
          >
            <span className="sr-only">Centrar ubicación</span>
            <CenterLocationIcon className="size-6 md:size-5" />
          </Button>
        </TooltipCTN>
        <TooltipCTN content="Aumentar" placement="left">
          <Button
            aria-label="Aumentar"
            size="sm"
            radius="full"
            isIconOnly
            onPress={handleZoomIn}
            className="!size-11 bg-white text-main-h dark:bg-full-dark dark:text-main-dark md:!size-9"
          >
            <span className="sr-only">Aumentar</span>
            <ZoomInIcon className="size-6 md:size-5" />
          </Button>
        </TooltipCTN>
        <TooltipCTN content="Alejar" placement="left">
          <Button
            aria-label="Alejar"
            size="sm"
            radius="full"
            isIconOnly
            onPress={handleZoomOut}
            className="!size-11 bg-white text-main-h dark:bg-full-dark dark:text-main-dark md:!size-9"
          >
            <span className="sr-only">Alejar</span>
            <ZoomOutIcon className="size-6 md:size-5" />
          </Button>
        </TooltipCTN>
      </div>
    </>
  );
};

export default MapActions;
