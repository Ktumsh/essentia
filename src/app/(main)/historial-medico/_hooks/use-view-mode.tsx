"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type ViewMode = "grid" | "list";

interface ViewModeContextProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextProps | undefined>(
  undefined,
);

interface ViewModeProviderProps {
  children: ReactNode;
  initialMode: ViewMode;
}

export const ViewModeProvider = ({
  children,
  initialMode = "grid",
}: ViewModeProviderProps) => {
  const [viewMode, setViewModeState] = useState<ViewMode>(initialMode);

  useEffect(() => {
    const cookieMatch = document.cookie.match(/view_mode=(grid|list)/);
    if (cookieMatch) {
      setViewModeState(cookieMatch[1] as ViewMode);
    } else {
      document.cookie = `view_mode=${initialMode}; path=/; max-age=31536000`;
    }
  }, [initialMode]);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    document.cookie = `view_mode=${mode}; path=/; max-age=31536000`;
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context)
    throw new Error("useViewMode must be used within a ViewModeProvider");
  return context;
};
