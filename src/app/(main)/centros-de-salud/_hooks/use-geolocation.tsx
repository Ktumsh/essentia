import { useCallback } from "react";

const useGeolocation = () => {
  const handleLocationError = useCallback(
    (
      browserHasGeolocation: boolean,
      infoWindow: google.maps.InfoWindow,
      map: google.maps.Map,
    ) => {
      const pos = map.getCenter()!;
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: El servicio de geolocalización falló."
          : "Error: Tu navegador no soporta geolocalización.",
      );
      infoWindow.open(map);
    },
    [],
  );

  const getCurrentPosition = useCallback(
    (
      callback: (pos: google.maps.LatLngLiteral) => void,
      infoWindow: google.maps.InfoWindow,
      map: google.maps.Map,
    ) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            callback(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        );
      } else {
        handleLocationError(false, infoWindow, map);
      }
    },
    [handleLocationError],
  );

  return { getCurrentPosition };
};

export default useGeolocation;
