"use client";

import { createContext, useContext, useState } from "react";

type ViewMode = "grid" | "list";

interface ViewModeContextProps {
  getViewMode: (key: "medical" | "saved") => ViewMode;
  setViewMode: (key: "medical" | "saved", mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextProps | undefined>(
  undefined,
);

interface ViewModeProviderProps {
  children: React.ReactNode;
  initialModes: Record<string, ViewMode>;
}

export const ViewModeProvider = ({
  children,
  initialModes,
}: ViewModeProviderProps) => {
  const [viewModes, setViewModes] =
    useState<Record<string, ViewMode>>(initialModes);

  const getViewMode = (key: string): ViewMode => {
    return viewModes[key] || "grid";
  };

  const setViewMode = (key: "medical" | "saved", mode: ViewMode) => {
    setViewModes((prev) => ({ ...prev, [key]: mode }));
    document.cookie = `view_mode_${key}=${mode}; path=/; max-age=31536000`;
  };

  return (
    <ViewModeContext.Provider value={{ getViewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context)
    throw new Error("useViewMode must be used within ViewModeProvider");
  return context;
};
