import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { ZoomInIcon, ZoomOutIcon } from "@/components/ui/icons/action";
import { CenterLocationIcon } from "@/components/ui/icons/status";

interface MapActionsProps {
  centerLocation: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const MapActions = (props: MapActionsProps) => {
  const { centerLocation, handleZoomIn, handleZoomOut } = props;

  return (
    <>
      {/* <BetterTooltip content="Pantalla completa" side="left">
        <Button
          aria-label="Pantalla completa"
          variant="outline"
          size="icon"
          radius="lg"
          onClick={handleFullscreen}
          className="absolute right-2 top-2 hidden md:inline-flex"
        >
          <span className="sr-only">Pantalla completa</span>
          <Maximize className="size-6!" />
        </Button>
      </BetterTooltip> */}
      <div className="absolute top-1/2 right-2 z-40 flex h-fit -translate-y-1/2 flex-col space-y-4 md:space-y-2">
        <BetterTooltip content="Centrar ubicación" side="left">
          <Button
            aria-label="Centrar ubicación"
            variant="outline"
            size="icon"
            onClick={centerLocation}
            className="bg-background size-9"
          >
            <span className="sr-only">Centrar ubicación</span>
            <CenterLocationIcon className="size-5!" />
          </Button>
        </BetterTooltip>
        <BetterTooltip content="Aumentar" side="left">
          <Button
            aria-label="Aumentar"
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            className="bg-background size-9"
          >
            <span className="sr-only">Aumentar</span>
            <ZoomInIcon className="size-5!" />
          </Button>
        </BetterTooltip>
        <BetterTooltip content="Alejar" side="left">
          <Button
            aria-label="Alejar"
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            className="bg-background size-9"
          >
            <span className="sr-only">Alejar</span>
            <ZoomOutIcon className="size-5!" />
          </Button>
        </BetterTooltip>
      </div>
    </>
  );
};

export default MapActions;
