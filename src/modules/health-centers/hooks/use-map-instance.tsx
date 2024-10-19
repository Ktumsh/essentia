"use client";

import { useEffect, useState } from "react";

interface UseMapInstanceProps {
  mapRef: React.RefObject<HTMLDivElement>;
  isLoaded: boolean;
}

const useMapInstance = ({ mapRef, isLoaded }: UseMapInstanceProps) => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (isLoaded && mapRef.current && !mapInstance) {
      const locationInMap = {
        lat: -33.4489,
        lng: -70.6693,
      };

      const mapOptions: google.maps.MapOptions = {
        zoom: 17,
        center: locationInMap,
        mapId: "13605448a0dcb21f",
        minZoom: 3,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        streetViewControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
        rotateControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
      };

      const map = new google.maps.Map(mapRef.current, mapOptions);
      setMapInstance(map);
    }
  }, [isLoaded, mapRef, mapInstance]);

  return mapInstance;
};

export default useMapInstance;
