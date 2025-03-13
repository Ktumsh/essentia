"use client";

declare global {
  interface Window {
    __selectedTravelMode?: string;
  }
}

import { useRef, useCallback } from "react";
import { renderToString } from "react-dom/server";

import InfoWindowContent, {
  InfoWindowContentProps,
} from "../_components/info-window-content";

if (typeof window !== "undefined") {
  window.__selectedTravelMode = "DRIVING";
}

const useMarkers = (
  mapInstance: google.maps.Map | null,
  isMobile?: boolean,
  setIsOpen?: (open: boolean) => void
) => {
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );

  const getDirectionsRenderer = useCallback(() => {
    if (!directionsRendererRef.current && mapInstance) {
      directionsRendererRef.current = new google.maps.DirectionsRenderer();
      directionsRendererRef.current.setMap(mapInstance);
      const panel = document.getElementById("directions-content");
      if (panel) {
        directionsRendererRef.current.setPanel(panel);
      }
    }
    return directionsRendererRef.current;
  }, [mapInstance]);

  const clearDirections = useCallback(() => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.set("directions", null);
      directionsRendererRef.current = null;
    }
    const card = document.getElementById("fixed-directions-panel");
    if (card) {
      card.classList.add("hidden");
    }
    if (isMobile && setIsOpen) {
      setIsOpen(false);
    }
  }, [isMobile, setIsOpen]);

  const getTravelMode = () => {
    return window.__selectedTravelMode || "DRIVING";
  };

  const createMarker = useCallback(
    (
      place: google.maps.places.PlaceResult,
      infoWindow: google.maps.InfoWindow
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
                <InfoWindowContent
                  {...(placeDetails as InfoWindowContentProps)}
                />
              );
              infoWindow.setContent(contentString);
              infoWindow.open(mapInstance, marker);

              const iwOuter = document.querySelector(".gm-style-iw");

              if (iwOuter) {
                iwOuter.classList.add("animate-fade-in");
              }

              google.maps.event.addListenerOnce(infoWindow, "domready", () => {
                const toggleButtons = document.querySelectorAll(
                  "#travel-mode-wrapper button"
                );
                toggleButtons.forEach((btn) => {
                  btn.addEventListener("click", () => {
                    toggleButtons.forEach((otherBtn) => {
                      otherBtn.setAttribute("data-state", "off");
                      otherBtn.setAttribute("aria-checked", "false");
                    });
                    btn.setAttribute("data-state", "on");
                    btn.setAttribute("aria-checked", "true");
                    const newValue =
                      btn.getAttribute("data-value") || "DRIVING";
                    window.__selectedTravelMode = newValue;

                    const directionsButton =
                      document.getElementById("btn-directions");
                    if (directionsButton) {
                      directionsButton.click();
                    }
                  });
                });

                const directionsButton =
                  document.getElementById("btn-directions");
                if (directionsButton) {
                  directionsButton.addEventListener("click", () => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const origin = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                          };
                          const destination = marker.position;
                          const travelMode = getTravelMode();

                          if (isMobile && setIsOpen) {
                            setIsOpen(true);
                            setTimeout(() => {
                              const directionsRenderer =
                                getDirectionsRenderer();
                              if (directionsRenderer) {
                                directionsRenderer.set("directions", null);
                              }
                              const directionsService =
                                new google.maps.DirectionsService();
                              const request: google.maps.DirectionsRequest = {
                                origin,
                                destination: destination!,
                                travelMode:
                                  travelMode as google.maps.TravelMode,
                              };
                              directionsService.route(
                                request,
                                (result, status) => {
                                  if (
                                    status ===
                                      google.maps.DirectionsStatus.OK &&
                                    result
                                  ) {
                                    if (directionsRenderer) {
                                      directionsRenderer.setDirections(result);
                                    }
                                  } else {
                                    console.error(
                                      "Error al obtener las direcciones: ",
                                      status
                                    );
                                  }
                                }
                              );
                            }, 300);
                          } else {
                            const directionsRenderer = getDirectionsRenderer();
                            const cardEl = document.getElementById(
                              "fixed-directions-panel"
                            );
                            if (cardEl) {
                              cardEl.classList.add("hidden");
                            }
                            if (directionsRenderer) {
                              directionsRenderer.set("directions", null);
                            }
                            const directionsService =
                              new google.maps.DirectionsService();
                            const request: google.maps.DirectionsRequest = {
                              origin,
                              destination: destination!,
                              travelMode: travelMode as google.maps.TravelMode,
                            };
                            directionsService.route(
                              request,
                              (result, status) => {
                                if (
                                  status === google.maps.DirectionsStatus.OK &&
                                  result
                                ) {
                                  if (directionsRenderer) {
                                    directionsRenderer.setDirections(result);
                                  }
                                  if (cardEl) {
                                    cardEl.classList.remove("hidden");
                                  }
                                } else {
                                  console.error(
                                    "Error al obtener las direcciones: ",
                                    status
                                  );
                                }
                              }
                            );
                          }
                        },
                        (error) => {
                          console.error(
                            "Error al obtener la ubicación: ",
                            error
                          );
                        },
                        {
                          enableHighAccuracy: true,
                          timeout: 5000,
                          maximumAge: 0,
                        }
                      );
                    } else {
                      console.error("El navegador no soporta geolocalización");
                    }
                  });
                }

                const outsideClickListener = (event: MouseEvent) => {
                  const iwContainer = document.querySelector(".gm-style-iw");
                  if (
                    iwContainer &&
                    !iwContainer.contains(event.target as Node)
                  ) {
                    infoWindow.close();
                    document.removeEventListener("click", outsideClickListener);
                  }
                };

                document.addEventListener("click", outsideClickListener);
              });
            }
          }
        );
      });

      markersRef.current.push(marker);
    },
    [mapInstance, getDirectionsRenderer, isMobile, setIsOpen]
  );

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];
  }, []);

  return { createMarker, clearMarkers, clearDirections };
};

export default useMarkers;
