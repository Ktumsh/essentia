"use client";

import {
  BusFront,
  CalendarFold,
  CarFront,
  CornerUpRight,
  Footprints,
  Globe,
  MapPinHouse,
  Phone,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export interface InfoWindowContentProps {
  name?: string;
  formatted_address?: string;
  rating?: number;
  opening_hours?: google.maps.places.PlaceOpeningHours;
  formatted_phone_number?: string;
  website?: string;
}

const InfoWindowContent = (props: InfoWindowContentProps) => {
  const {
    name,
    formatted_address,
    rating,
    opening_hours,
    formatted_phone_number,
    website,
  } = props;

  const { weekday_text } = opening_hours || {};

  return (
    <div className="text-foreground/80 flex flex-col gap-2 text-xs font-normal md:text-sm">
      <h2 className="text-foreground font-merriweather! text-base font-semibold md:text-lg">
        {name}
      </h2>
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-1">
          <MapPinHouse className="size-2.5 md:size-3" />
          <span className="text-foreground font-medium">Dirección</span>
        </div>
        <p className="pl-4">{formatted_address}</p>
      </div>
      {rating && (
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1">
            <Star className="size-2.5 md:size-3" />
            <span className="text-foreground font-medium">Rating</span>
          </div>
          <p className="pl-4">{rating} estrellas</p>
        </div>
      )}
      {weekday_text && (
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1">
            <CalendarFold className="size-2.5 md:size-3" />
            <span className="text-foreground font-medium">Horario</span>
          </div>
          {weekday_text.map((text, index) => (
            <p key={index} className="pl-4">
              {text}
            </p>
          ))}
        </div>
      )}
      {formatted_phone_number && (
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1">
            <Phone className="size-2.5 md:size-3" />
            <span className="text-foreground font-medium">Teléfono</span>
          </div>
          <p className="pl-4">{formatted_phone_number}</p>
        </div>
      )}
      {website && (
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1">
            <Globe className="size-2.5 md:size-3" />
            <span className="text-foreground font-medium">Sitio web</span>
          </div>
          <a
            className="text-primary line-clamp-1 pl-4 text-ellipsis hover:underline"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        </div>
      )}
      <div className="border-border flex flex-col items-end justify-center border-t pt-2">
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col items-center justify-center gap-1.5">
            <Button
              id="btn-directions"
              size="icon"
              radius="full"
              variant="destructive"
              className="bg-primary! relative before:absolute before:inset-0 before:m-auto before:size-3.5 before:rotate-45 before:rounded-xs before:bg-white before:content-['']"
            >
              <CornerUpRight className="text-primary! z-10 size-2.5!" />
              <span className="sr-only">Indicaciones</span>
            </Button>
            <p className="text-primary font-semibold">Indicaciones</p>
          </div>
          <div
            id="travel-mode-wrapper"
            className="flex flex-col items-center justify-center gap-1.5"
          >
            <ToggleGroup
              variant="outline"
              type="single"
              defaultValue={window.__selectedTravelMode}
              className="gap-2"
            >
              <ToggleGroupItem
                value="DRIVING"
                aria-label="Auto"
                data-value="DRIVING"
                title="En auto"
                className="text-foreground/80 dark:border-alternative/50 rounded-full shadow-none"
              >
                <CarFront />
                <span className="sr-only">Auto</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="WALKING"
                aria-label="A pie"
                data-value="WALKING"
                title="A pie"
                className="text-foreground/80 dark:border-alternative/50 rounded-full shadow-none"
              >
                <Footprints />
                <span className="sr-only">A pie</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="TRANSIT"
                aria-label="Transporte público"
                data-value="TRANSIT"
                title="Transporte público"
                className="text-foreground/80 dark:border-alternative/50 rounded-full shadow-none"
              >
                <BusFront />
                <span className="sr-only">Transporte público</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="text-foreground font-semibold">Modo de viaje</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoWindowContent;
