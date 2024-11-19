import { FC } from "react";

import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
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
      <BetterTooltip content="Pantalla completa" side="left">
        <Button
          aria-label="Pantalla completa"
          size="icon"
          radius="lg"
          onClick={handleFullscreen}
          className="absolute right-2 top-2 hidden bg-white text-main-h dark:bg-full-dark dark:text-main-dark md:inline-flex"
        >
          <span className="sr-only">Pantalla completa</span>
          <FullscreenIcon className="!size-6" />
        </Button>
      </BetterTooltip>
      <div className="absolute bottom-28 right-2 z-40 flex h-fit flex-col space-y-4 md:top-1/2 md:-translate-y-1/2 md:space-y-2">
        <BetterTooltip content="Centrar ubicación" side="left">
          <Button
            aria-label="Centrar ubicación"
            radius="full"
            size="icon"
            onClick={centerLocation}
            className="!size-11 bg-white text-main-h dark:bg-full-dark dark:text-main-dark md:!size-9"
          >
            <span className="sr-only">Centrar ubicación</span>
            <CenterLocationIcon className="!size-6 md:!size-5" />
          </Button>
        </BetterTooltip>
        <BetterTooltip content="Aumentar" side="left">
          <Button
            aria-label="Aumentar"
            radius="full"
            size="icon"
            onClick={handleZoomIn}
            className="!size-11 bg-white text-main-h dark:bg-full-dark dark:text-main-dark md:!size-9"
          >
            <span className="sr-only">Aumentar</span>
            <ZoomInIcon className="!size-6 md:!size-5" />
          </Button>
        </BetterTooltip>
        <BetterTooltip content="Alejar" side="left">
          <Button
            aria-label="Alejar"
            radius="full"
            size="icon"
            onClick={handleZoomOut}
            className="!size-11 bg-white text-main-h dark:bg-full-dark dark:text-main-dark md:!size-9"
          >
            <span className="sr-only">Alejar</span>
            <ZoomOutIcon className="!size-6 md:!size-5" />
          </Button>
        </BetterTooltip>
      </div>
    </>
  );
};

export default MapActions;
