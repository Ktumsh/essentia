import { MutableRefObject, useEffect } from "react";

interface UseSearchBoxProps {
  mapInstance: google.maps.Map | null;
  searchRef: MutableRefObject<HTMLInputElement | null>;
  createMarker: (
    place: google.maps.places.PlaceResult,
    infoWindow: google.maps.InfoWindow,
  ) => void;
  clearMarkers: () => void;
  infoWindow: google.maps.InfoWindow;
}

const useSearchBox = ({
  mapInstance,
  searchRef,
  createMarker,
  clearMarkers,
  infoWindow,
}: UseSearchBoxProps) => {
  useEffect(() => {
    if (!mapInstance || !searchRef.current) return;

    const searchBox = new google.maps.places.SearchBox(searchRef.current);
    mapInstance.controls[google.maps.ControlPosition.TOP_LEFT].push(
      searchRef.current,
    );

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (!places || places.length === 0) {
        return;
      }

      const bounds = new google.maps.LatLngBounds();
      clearMarkers();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        createMarker(place, infoWindow);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      mapInstance.fitBounds(bounds);
    });
  }, [mapInstance, searchRef, createMarker, clearMarkers, infoWindow]);
};

export default useSearchBox;
