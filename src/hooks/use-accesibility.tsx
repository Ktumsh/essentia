"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FontSize = "small" | "medium" | "large";

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(
  null,
);

export const AccessibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");
  const [isReducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const storedFontSize =
      (localStorage.getItem("fontSize") as FontSize) || "medium";
    const storedMotion = localStorage.getItem("reducedMotion") === "true";

    setFontSizeState(storedFontSize);
    setReducedMotion(storedMotion);
  }, []);

  useEffect(() => {
    if (fontSize === "medium") {
      document.documentElement.removeAttribute("data-font-size");
    } else {
      document.documentElement.setAttribute("data-font-size", fontSize);
    }
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("reducedMotion", String(isReducedMotion));

    if (isReducedMotion) {
      setTimeout(() => {
        document.documentElement.classList.add("reduced-motion");
      }, 300);
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
  }, [isReducedMotion]);

  const setFontSize = (size: FontSize) => setFontSizeState(size);
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);

  return (
    <AccessibilityContext.Provider
      value={{ fontSize, setFontSize, isReducedMotion, toggleReducedMotion }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context)
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  return context;
};
