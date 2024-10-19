"use client";

import "./map.css";
import { useEffect, useRef, useState, useCallback, memo } from "react";

import { motion } from "framer-motion";

import CenterSwitch from "./center-switch";
import MapLoading from "./map-loading";
import MapActions from "./map-actions";
import MapHeader from "./map-header";

import useGeolocation from "../hooks/use-geolocation";
import useGoogleMapsLoader from "../hooks/use-google-maps-loader";
import useMapInstance from "../hooks/use-map-instance";
import useMarkers from "../hooks/use-markers";
import useSearchBox from "../hooks/use-searchbox";
import { LocationSelfIcon } from "@/modules/icons/status";
import { createPortal } from "react-dom";

const GoogleMaps = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoaded = useGoogleMapsLoader();
  const mapInstance = useMapInstance({ mapRef, isLoaded });
  const { createMarker, clearMarkers } = useMarkers(mapInstance);

  useEffect(() => {
    if (mapInstance) {
      google.maps.event.addListenerOnce(mapInstance, "tilesloaded", () => {
        setIsLoading(false);
      });
    }
  }, [mapInstance]);

  useEffect(() => {
    if (mapInstance && !infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow();
    }
  }, [mapInstance]);

  const { getCurrentPosition } = useGeolocation();

  const searchNearby = useCallback(
    (types: string[], pos: google.maps.LatLngLiteral) => {
      if (!mapInstance) return;

      const service = new google.maps.places.PlacesService(mapInstance);

      clearMarkers();

      types.forEach((type) => {
        const request: google.maps.places.PlaceSearchRequest = {
          location: pos,
          radius: 2000,
          type,
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            results.forEach((place) => {
              createMarker(place, infoWindowRef.current!);
            });
          }
        });
      });
    },
    [mapInstance, clearMarkers, createMarker]
  );

  useEffect(() => {
    if (mapInstance && infoWindowRef.current) {
      getCurrentPosition(
        (pos) => {
          mapInstance.setCenter(pos);

          const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
            position: pos,
            map: mapInstance,
            title: "Tu ubicación",
            content: markerRef.current!,
          });

          advancedMarker.addListener("click", () => {
            infoWindowRef.current?.setContent("Tu ubicación");
            infoWindowRef.current?.open({
              map: mapInstance,
              anchor: advancedMarker,
            });
          });

          searchNearby(["hospital", "doctor", "clinic"], pos);
        },
        infoWindowRef.current,
        mapInstance
      );
    }
  }, [mapInstance, getCurrentPosition, searchNearby]);

  useSearchBox({
    mapInstance,
    searchRef,
    createMarker,
    clearMarkers,
    infoWindow: infoWindowRef.current!,
  });

  const centerLocation = () => {
    if (mapInstance && infoWindowRef.current) {
      getCurrentPosition(
        (pos) => {
          mapInstance.panTo(pos);
        },
        infoWindowRef.current,
        mapInstance
      );
    }
  };

  const handleSwitchChange = (selected: boolean) => {
    if (mapInstance && infoWindowRef.current) {
      getCurrentPosition(
        (pos) => {
          searchNearby(
            selected ? ["hospital", "doctor", "clinic"] : ["pharmacy"],
            pos
          );
        },
        infoWindowRef.current,
        mapInstance
      );
    }
  };

  const handleZoomIn = () => {
    if (mapInstance) {
      mapInstance.setZoom(mapInstance.getZoom()! + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      mapInstance.setZoom(mapInstance.getZoom()! - 1);
    }
  };

  const handleFullscreen = () => {
    if (mapRef.current) {
      if (mapRef.current.requestFullscreen) {
        mapRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="md:relative h-full max-h-[calc(100%+32px)] z-10">
      <MapHeader>
        <CenterSwitch onSwitchChange={handleSwitchChange} />
      </MapHeader>
      <div className="md:relative h-[calc(100%-40px)]">
        {isLoading && <MapLoading />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={!isLoading && { opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          ref={mapRef}
          className="!absolute inset-0 size-full bg-white dark:bg-base-full-dark md:rounded-3xl overflow-hidden shadow-medium focus:[&_*]:!outline-0 [&_*]:!border-none [&_>_div]:!bg-transparent"
        >
          <input
            ref={searchRef}
            type="text"
            placeholder="Buscar por nombre o ubicación"
            className="!left-0 !top-0 w-56 sm:w-80 h-10 px-4 p-2 mt-2 ml-2 bg-white dark:bg-base-full-dark font-sans placeholder:text-xs lg:placeholder:text-sm placeholder:text-base-color-m dark:placeholder:text-base-color-dark-m text-sm text-base-color dark:text-base-color-dark rounded-full outline-none ring-0 border-0 shadow-small transition"
          />
          <div ref={markerRef} className="bg-white rounded-full p-px">
            <LocationSelfIcon className="size-7 text-sky-500" />
          </div>
        </motion.div>

        <MapActions
          handleFullscreen={handleFullscreen}
          centerLocation={centerLocation}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
      </div>
    </div>
  );
};

export default memo(GoogleMaps);
