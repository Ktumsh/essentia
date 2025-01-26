import * as React from "react";

const MOBILE_BREAKPOINT = 768;

interface MobileContextValue {
  isMobile: boolean;
}

const MobileContext = React.createContext<MobileContextValue | undefined>(
  undefined,
);

export const MobileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

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
      setIsMobile(checkIfMobile());
    };

    setIsMobile(checkIfMobile());

    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useIsMobile = () => {
  const context = React.useContext(MobileContext);

  if (context === undefined) {
    throw new Error("useMobile debe ser usado dentro de MobileProvider");
  }

  return context.isMobile;
};
