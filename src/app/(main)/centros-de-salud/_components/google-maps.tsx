"use client";

import "@/styles/map.css";

import { motion } from "motion/react";
import { useEffect, useRef, useState, useCallback, memo } from "react";

import { LocationSelfIcon } from "@/components/ui/icons/status";
import { useIsMobile } from "@/hooks/use-mobile";

import CenterSwitch from "./center-switch";
import MapActions from "./map-actions";
import MapHeader from "./map-header";
import MapIndicator from "./map-indicator";
import MapLoading from "./map-loading";
import useGeolocation from "../_hooks/use-geolocation";
import useGoogleMapsLoader from "../_hooks/use-google-maps-loader";
import useMapInstance from "../_hooks/use-map-instance";
import useMarkers from "../_hooks/use-markers";
import useSearchBox from "../_hooks/use-searchbox";

const TRAVEL_MODE: Record<string, string> = {
  DRIVING: "En auto",
  WALKING: "A pie",
  TRANSIT: "Transporte público",
};

const GoogleMaps = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const searchRef = useRef<HTMLInputElement>(null);

  const markerRef = useRef<HTMLDivElement>(null);

  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [travelMode, setTravelMode] = useState<string>(
    TRAVEL_MODE[window.__selectedTravelMode || "DRIVING"],
  );

  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  const isLoaded = useGoogleMapsLoader();

  const mapInstance = useMapInstance({ mapRef, isLoaded });

  const { createMarker, clearMarkers, clearDirections } = useMarkers(
    mapInstance,
    isMobile,
    setIsOpen,
  );

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
              let allowedTypes: string[];
              if (type === "pharmacy") {
                allowedTypes = ["pharmacy"];
              } else {
                allowedTypes = ["hospital", "doctor", "clinic"];
              }

              const disallowedKeywords = ["taller", "bicicleta", "mecánica"];

              const matches = place.types?.filter((t) =>
                allowedTypes.includes(t),
              );
              const nameLower = place.name?.toLowerCase() || "";
              const containsDisallowed = disallowedKeywords.some((keyword) =>
                nameLower.includes(keyword),
              );

              if (matches && matches.length > 0 && !containsDisallowed) {
                createMarker(place, infoWindowRef.current!);
              }
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
          mapInstance.setZoom(18);
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

  /* const handleFullscreen = () => {
    if (mapRef.current) {
      if (mapRef.current.requestFullscreen) {
        mapRef.current.requestFullscreen();
      }
    }
  }; */

  useEffect(() => {
    if (!isOpen) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style" &&
          document.body.style.pointerEvents === "none"
        ) {
          document.body.style.pointerEvents = "auto";
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const mode = window.__selectedTravelMode || "DRIVING";
      setTravelMode(TRAVEL_MODE[mode] || "En auto");
    });

    observer.observe(document.body, { attributes: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="z-10 h-full min-h-[calc(100dvh-88px)] md:relative md:min-h-full">
      <MapHeader>
        <CenterSwitch onSwitchChange={handleSwitchChange} />
      </MapHeader>
      <div className="h-[calc(100dvh-88px)] md:relative">
        {isLoading && <MapLoading />}
        <motion.div
          initial={{ opacity: 0 }}
          animate={!isLoading && { opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          ref={mapRef}
          className="bg-background absolute! inset-0 size-full overflow-hidden shadow-md **:focus:outline-0! [&_>_div]:bg-transparent!"
        >
          <input
            ref={searchRef}
            type="text"
            placeholder="Buscar por nombre o ubicación"
            className="text-foreground placeholder:text-muted-foreground bg-background top-0! left-0! mt-2 ml-2 h-10 w-56 rounded-full border-0 p-2 px-4 font-sans text-sm shadow-md ring-0 outline-hidden transition placeholder:text-xs sm:w-80 lg:placeholder:text-sm"
          />
          <div ref={markerRef} className="rounded-full bg-white p-px">
            <LocationSelfIcon className="size-7 text-sky-500" />
          </div>
        </motion.div>
        <MapActions
          centerLocation={centerLocation}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
        <MapIndicator
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          travelMode={travelMode}
          clearDirections={clearDirections}
        />
      </div>
    </div>
  );
};

export default memo(GoogleMaps);
