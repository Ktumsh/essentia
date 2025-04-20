"use client";

import { useEffect, useState } from "react";

export const useIsMac = () => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.userAgent.includes("Macintosh"));
  }, []);

  return isMac;
};
