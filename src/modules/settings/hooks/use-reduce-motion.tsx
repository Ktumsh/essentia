"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ReducedMotionContextProps {
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const ReducedMotionContext = createContext<
  ReducedMotionContextProps | undefined
>(undefined);

export const ReducedMotionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reduced-motion");
      if (stored !== null) {
        const isReduced = stored === "true";
        if (isReduced) {
          document.documentElement.classList.add("reduced-motion");
        } else {
          document.documentElement.classList.remove("reduced-motion");
        }
        return isReduced;
      } else {
        const mediaQuery = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        if (mediaQuery.matches) {
          document.documentElement.classList.add("reduced-motion");
        }
        return mediaQuery.matches;
      }
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reduced-motion");
      if (stored === null) {
        const mediaQuery = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );

        const handleChange = (e: MediaQueryListEvent) => {
          setIsReducedMotion(e.matches);
          document.documentElement.classList.toggle(
            "reduced-motion",
            e.matches,
          );
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      }
    }
  }, []);

  const toggleReducedMotion = () => {
    setIsReducedMotion((prev) => {
      const newValue = !prev;
      localStorage.setItem("reduced-motion", String(newValue));

      if (newValue) {
        setTimeout(() => {
          document.documentElement.classList.add("reduced-motion");
        }, 300);
      } else {
        document.documentElement.classList.remove("reduced-motion");
      }

      return newValue;
    });
  };

  return (
    <ReducedMotionContext.Provider
      value={{ isReducedMotion, toggleReducedMotion }}
    >
      {children}
    </ReducedMotionContext.Provider>
  );
};

export const useReducedMotion = (): ReducedMotionContextProps => {
  const context = useContext(ReducedMotionContext);
  if (context === undefined) {
    throw new Error(
      "useReducedMotion debe ser usado dentro de un ReducedMotionProvider",
    );
  }
  return context;
};
