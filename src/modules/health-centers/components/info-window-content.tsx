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
    <div className="text-main-h dark:text-main-dark-h flex flex-col gap-2 text-xs font-normal md:text-sm">
      <h2 className="text-main text-base font-semibold md:text-xl dark:text-white">
        {name}
      </h2>
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-1">
          <MapPinHouse strokeWidth={1.5} className="size-2.5 md:size-3" />
          <span className="text-main font-medium dark:text-white">
            Dirección
          </span>
        </div>
        <p className="pl-4">{formatted_address}</p>
      </div>
      {rating && (
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1">
            <Star strokeWidth={1.5} className="size-2.5 md:size-3" />
            <span className="text-main font-medium dark:text-white">
              Rating
            </span>
          </div>
          <p className="pl-4">{rating} estrellas</p>
        </div>
      )}
      {weekday_text && (
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1">
            <CalendarFold strokeWidth={1.5} className="size-2.5 md:size-3" />
            <span className="text-main font-medium dark:text-white">
              Horario
            </span>
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
            <Phone strokeWidth={1.5} className="size-2.5 md:size-3" />
            <span className="text-main font-medium dark:text-white">
              Teléfono
            </span>
          </div>
          <p className="pl-4">{formatted_phone_number}</p>
        </div>
      )}
      {website && (
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1">
            <Globe strokeWidth={1.5} className="size-2.5 md:size-3" />
            <span className="text-main font-medium dark:text-white">
              Sitio web
            </span>
          </div>
          <a
            className="text-danger line-clamp-1 pl-4 text-ellipsis hover:underline"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        </div>
      )}
      <div className="dark:border-dark flex flex-col items-end justify-center border-t border-gray-200 pt-2">
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col items-center justify-center gap-1.5">
            <Button
              id="btn-directions"
              size="icon"
              radius="full"
              variant="destructive"
              className="bg-danger! relative before:absolute before:inset-0 before:m-auto before:size-3.5 before:rotate-45 before:rounded-xs before:bg-white before:content-['']"
            >
              <CornerUpRight className="text-danger! z-10 size-2.5!" />
              <span className="sr-only">Indicaciones</span>
            </Button>
            <p className="text-danger font-semibold">Indicaciones</p>
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
                className="text-main-h dark:text-main-dark dark:border-accent-dark rounded-full shadow-none"
              >
                <CarFront />
                <span className="sr-only">Auto</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="WALKING"
                aria-label="A pie"
                data-value="WALKING"
                title="A pie"
                className="text-main-h dark:text-main-dark dark:border-accent-dark rounded-full shadow-none"
              >
                <Footprints />
                <span className="sr-only">A pie</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="TRANSIT"
                aria-label="Transporte público"
                data-value="TRANSIT"
                title="Transporte público"
                className="text-main-h dark:text-main-dark dark:border-accent-dark rounded-full shadow-none"
              >
                <BusFront />
                <span className="sr-only">Transporte público</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <p className="text-main dark:text-main-dark font-semibold">
              Modo de viaje
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoWindowContent;
