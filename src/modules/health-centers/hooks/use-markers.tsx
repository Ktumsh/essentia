"use client";

import { useRef, useCallback } from "react";
import { renderToString } from "react-dom/server";

import InfoWindowContent from "../components/info-window-content";

const useMarkers = (mapInstance: google.maps.Map | null) => {
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const createMarker = useCallback(
    (
      place: google.maps.places.PlaceResult,
      infoWindow: google.maps.InfoWindow,
    ) => {
      if (!mapInstance || !place.geometry || !place.geometry.location) return;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapInstance,
        position: place.geometry.location,
        title: place.name,
      });

      marker.addListener("click", () => {
        const service = new google.maps.places.PlacesService(mapInstance);
        service.getDetails(
          {
            placeId: place.place_id!,
            fields: [
              "name",
              "formatted_address",
              "geometry",
              "rating",
              "opening_hours",
              "formatted_phone_number",
              "website",
            ],
          },
          (placeDetails, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              placeDetails
            ) {
              const contentString = renderToString(
                <InfoWindowContent placeDetails={placeDetails} />,
              );
              infoWindow.setContent(contentString);
              infoWindow.open(mapInstance, marker);
            }
          },
        );
      });

      markersRef.current.push(marker);
    },
    [mapInstance],
  );

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];
  }, []);

  return { createMarker, clearMarkers };
};

export default useMarkers;
