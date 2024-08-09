"use client";

import "./map.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import CenterSwitch from "./center-switch";
import { Button, LinkIcon, Tooltip } from "@nextui-org/react";
import { tooltipStyles } from "@/styles/tooltip-styles";
import ReactDOMServer from "react-dom/server";
import InfoWindowContent from "./info-window-content";
import { CenterLocationIcon } from "@/modules/icons/status";
import {
  FullscreenIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@/modules/icons/action";

export default function GoogleMaps() {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);
  const markers = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [isSelected, setIsSelected] = useState(true);

  const createMarker = useCallback(
    (
      place: google.maps.places.PlaceResult,
      map: google.maps.Map,
      infoWindow: google.maps.InfoWindow
    ) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: place.geometry!.location!,
        title: place.name,
      });

      marker.addListener("click", () => {
        const service = new google.maps.places.PlacesService(map);
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
              const contentString = ReactDOMServer.renderToString(
                <InfoWindowContent placeDetails={placeDetails} />
              );
              infoWindow.setContent(contentString);
              infoWindow.open(map, marker);
            }
          }
        );
      });

      markers.current.push(marker);
    },
    []
  );

  const clearMarkers = useCallback(() => {
    markers.current.forEach((marker) => {
      if (marker.map) {
        marker.map = null;
      }
    });
    markers.current = [];
  }, []);

  const searchNearby = useCallback(
    (types: string[], pos: google.maps.LatLngLiteral) => {
      if (!mapInstance.current) return;

      const service = new google.maps.places.PlacesService(mapInstance.current);

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
              createMarker(place, mapInstance.current!, infoWindow.current!);
            });
          }
        });
      });
    },
    [createMarker, clearMarkers]
  );

  useEffect(() => {
    const fetchApiKey = async () => {
      const response = await fetch("/api/maps");
      const data = await response.json();
      return data.apiKey;
    };

    const initializeMap = async () => {
      const apiKey = await fetchApiKey();
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places", "marker"],
      });

      loader
        .load()
        .then(async () => {
          if (!google.maps) {
            console.error("Google Maps script not loaded properly.");
            return;
          }

          const locationInMap = {
            lat: -33.4489,
            lng: -70.6693,
          };

          const mapOptions: google.maps.MapOptions = {
            zoom: 17,
            mapId: "13605448a0dcb21f",
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

          const map = new google.maps.Map(
            mapRef.current as HTMLDivElement,
            mapOptions
          );
          mapInstance.current = map;

          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: locationInMap,
          });

          markers.current.push(marker);
          infoWindow.current = new google.maps.InfoWindow();

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };

                map.setCenter(pos);
                searchNearby(["hospital", "doctor", "clinic"], pos);
              },
              () => {
                handleLocationError(
                  true,
                  infoWindow.current!,
                  map.getCenter() as google.maps.LatLng,
                  map
                );
              }
            );
          } else {
            handleLocationError(
              false,
              infoWindow.current!,
              map.getCenter() as google.maps.LatLng,
              map
            );
          }

          const searchBox = new google.maps.places.SearchBox(
            searchRef.current as HTMLInputElement
          );
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(
            searchRef.current as HTMLInputElement
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

              createMarker(place, map, infoWindow.current!);

              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map.fitBounds(bounds);
          });
        })
        .catch((error) => {
          console.error("Error loading Google Maps script:", error);
        });
    };

    initializeMap();
  }, [searchNearby, clearMarkers, createMarker]);

  const handleLocationError = (
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng,
    map: google.maps.Map
  ) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: El servicio de geolocalización falló."
        : "Error: Tu navegador no soporta geolocalización."
    );
    infoWindow.open(map);
  };

  const centerLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapInstance.current!.setCenter(pos);
          mapInstance.current!.setZoom(17);
        },
        () => {
          console.log("Error: El servicio de geolocalización falló.");
        }
      );
    }
  };

  const handleSwitchChange = (selected: boolean) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          searchNearby(
            selected ? ["hospital", "doctor", "clinic"] : ["pharmacy"],
            pos
          );
        },
        () => {
          console.log("Error: El servicio de geolocalización falló.");
        }
      );
    }
  };

  const handleZoomIn = () => {
    if (mapInstance.current) {
      mapInstance.current.setZoom(mapInstance.current.getZoom()! + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstance.current) {
      mapInstance.current.setZoom(mapInstance.current.getZoom()! - 1);
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
    <div className="relative h-full z-10">
      <div className="py-5 flex items-center">
        <div className="flex items-center w-full gap-5">
          <h2 className="text-base sm:text-2xl font-bold text-base-color-h dark:text-base-color-dark">
            Consulta centros de salud o farmacias cercanas
          </h2>
          <CenterSwitch
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            onSwitchChange={handleSwitchChange}
          />
        </div>
      </div>
      <div
        ref={mapRef}
        className="peer fullscreen w-full h-96 sm:h-[600px] rounded-xl overflow-hidden shadow-medium !focus:outline-0 [&_*]:!border-none"
      >
        <input
          ref={searchRef}
          type="text"
          placeholder="Buscar por nombre o ubicación"
          className="w-56 sm:w-80 h-[38px] px-4 p-2 mt-2 ml-2 bg-white dark:bg-base-full-dark placeholder:text-xs lg:placeholder:text-sm placeholder:text-base-color-m dark:placeholder:text-base-color-dark-m text-sm text-base-color dark:text-base-color-dark rounded-full outline-none ring-0 focus:ring-base-dark-50 border-0 shadow-small transition"
        />
      </div>
      <Tooltip
        content="Pantalla completa"
        placement="left"
        delay={800}
        closeDelay={0}
        classNames={{
          content: tooltipStyles.content,
        }}
      >
        <Button
          isIconOnly
          className="absolute top-20 right-2 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
          onPress={handleFullscreen}
        >
          <FullscreenIcon className="size-6" />
        </Button>
      </Tooltip>
      <Tooltip
        content="Centrar ubicación"
        placement="left"
        delay={800}
        closeDelay={0}
        classNames={{
          content: tooltipStyles.content,
        }}
      >
        <Button
          size="sm"
          radius="full"
          isIconOnly
          className="!size-9 absolute top-1/2 right-2 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
          onPress={centerLocation}
        >
          <CenterLocationIcon className="size-5" />
        </Button>
      </Tooltip>
      <div className="absolute bottom-56 right-2 flex flex-col space-y-2 z-50">
        <Tooltip
          content="Aumentar"
          placement="left"
          delay={800}
          closeDelay={0}
          classNames={{
            content: tooltipStyles.content,
          }}
        >
          <Button
            size="sm"
            radius="full"
            isIconOnly
            className="!size-9 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
            onPress={handleZoomIn}
          >
            <ZoomInIcon className="size-5" />
          </Button>
        </Tooltip>
        <Tooltip
          content="Alejar"
          placement="left"
          delay={800}
          closeDelay={0}
          classNames={{
            content: tooltipStyles.content,
          }}
        >
          <Button
            size="sm"
            radius="full"
            isIconOnly
            className="!size-9 bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark"
            onPress={handleZoomOut}
          >
            <ZoomOutIcon className="size-5" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
