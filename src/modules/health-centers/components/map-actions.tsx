import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import {
  FullscreenIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@/modules/icons/action";
import { CenterLocationIcon } from "@/modules/icons/status";
import { Button } from "@nextui-org/react";
import { FC } from "react";

interface MapActionsProps {
  handleFullscreen: () => void;
  centerLocation: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const MapActions: FC<MapActionsProps> = (props) => {
  return (
    <>
      <TooltipCTN content="Pantalla completa" placement="left">
        <Button
          isIconOnly
          className="hidden md:inline-flex absolute top-2 right-2 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
          onPress={props.handleFullscreen}
        >
          <FullscreenIcon className="size-6" />
        </Button>
      </TooltipCTN>
      <div className="absolute bottom-28 md:top-1/2 md:-translate-y-1/2 right-2 flex flex-col h-fit space-y-2 z-40">
        <TooltipCTN content="Centrar ubicación" placement="left">
          <Button
            size="sm"
            radius="full"
            isIconOnly
            className="!size-9 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
            onPress={props.centerLocation}
          >
            <CenterLocationIcon className="size-5" />
          </Button>
        </TooltipCTN>
        <TooltipCTN content="Aumentar" placement="left">
          <Button
            size="sm"
            radius="full"
            isIconOnly
            className="!size-9 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
            onPress={props.handleZoomIn}
          >
            <ZoomInIcon className="size-5" />
          </Button>
        </TooltipCTN>
        <TooltipCTN content="Alejar" placement="left">
          <Button
            size="sm"
            radius="full"
            isIconOnly
            className="!size-9 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
            onPress={props.handleZoomOut}
          >
            <ZoomOutIcon className="size-5" />
          </Button>
        </TooltipCTN>
      </div>
    </>
  );
};

export default MapActions;
