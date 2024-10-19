"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useState, useEffect } from "react";

const fetchApiKey = async () => {
  const response = await fetch("/api/maps");
  const data = await response.json();
  return data.apiKey;
};

const useGoogleMapsLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeLoader = async () => {
      const apiKey = await fetchApiKey();
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places", "marker"],
      });

      try {
        await loader.importLibrary("maps");
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading Google Maps script:", error);
      }
    };

    initializeLoader();
  }, []);

  return isLoaded;
};

export default useGoogleMapsLoader;
