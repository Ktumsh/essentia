"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

interface MobileContextValue {
  isMobile: boolean;
}

const MobileContext = React.createContext<MobileContextValue | undefined>(
  undefined,
);

interface MobileProviderProps {
  children: React.ReactNode;
  initialMobileState?: boolean;
}

export const MobileProvider: React.FC<MobileProviderProps> = ({
  children,
  initialMobileState = false,
}) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(initialMobileState);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const mobileRegex =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      const isUserAgentMobile = mobileRegex.test(userAgent);
      const isMatchMediaMobile = mql.matches;
      return isUserAgentMobile || isMatchMediaMobile;
    };

    const onChange = () => {
      const mobile = checkIfMobile();
      setIsMobile(mobile);
      document.cookie = `isMobile=${mobile.toString()}; path=/; max-age=604800`;
    };

    const currentMobile = checkIfMobile();
    if (currentMobile !== isMobile) {
      setIsMobile(currentMobile);
      document.cookie = `isMobile=${currentMobile.toString()}; path=/; max-age=604800`;
    }

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useIsMobile = () => {
  const context = React.useContext(MobileContext);
  if (!context) {
    throw new Error("useIsMobile debe usarse dentro de MobileProvider");
  }
  return context.isMobile;
};
