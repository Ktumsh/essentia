"use client";

import "@/styles/map.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback, memo } from "react";

import { LocationSelfIcon } from "@/modules/icons/status";

import CenterSwitch from "./center-switch";
import MapActions from "./map-actions";
import MapHeader from "./map-header";
import MapLoading from "./map-loading";
import useGeolocation from "../hooks/use-geolocation";
import useGoogleMapsLoader from "../hooks/use-google-maps-loader";
import useMapInstance from "../hooks/use-map-instance";
import useMarkers from "../hooks/use-markers";
import useSearchBox from "../hooks/use-searchbox";

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
    [mapInstance, clearMarkers, createMarker],
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
        mapInstance,
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
        mapInstance,
      );
    }
  };

  const handleSwitchChange = (selected: boolean) => {
    if (mapInstance && infoWindowRef.current) {
      getCurrentPosition(
        (pos) => {
          searchNearby(
            selected ? ["hospital", "doctor", "clinic"] : ["pharmacy"],
            pos,
          );
        },
        infoWindowRef.current,
        mapInstance,
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
    <div className="z-10 h-full min-h-[calc(100dvh-56px)] md:relative md:min-h-full">
      <MapHeader>
        <CenterSwitch onSwitchChange={handleSwitchChange} />
      </MapHeader>
      <div className="h-[calc(100dvh-56px)] md:relative">
        {isLoading && <MapLoading />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={!isLoading && { opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          ref={mapRef}
          className="!absolute inset-0 size-full overflow-hidden bg-white shadow-md dark:bg-full-dark [&_*]:!border-none focus:[&_*]:!outline-0 [&_>_div]:!bg-transparent"
        >
          <input
            ref={searchRef}
            type="text"
            placeholder="Buscar por nombre o ubicación"
            className="!left-0 !top-0 ml-2 mt-2 h-10 w-56 rounded-full border-0 bg-white p-2 px-4 font-sans text-sm text-main shadow-md outline-none ring-0 transition placeholder:text-xs placeholder:text-main-m dark:bg-full-dark dark:text-main-dark dark:placeholder:text-main-dark-m sm:w-80 lg:placeholder:text-sm"
          />
          <div ref={markerRef} className="rounded-full bg-white p-px">
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
