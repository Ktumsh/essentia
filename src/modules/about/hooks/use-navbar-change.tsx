"use client";

import { useEffect, useState, useCallback } from "react";

export const useNavbarChange = (vh: number) => {
  const [isChanged, setIsChanged] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const checkScreenSizeAndUpdateNavbar = useCallback(() => {
    const scrollTop = window.scrollY;

    if (isLargeScreen) {
      if (scrollTop > vh && !isChanged) {
        setIsChanging(true);
        setTimeout(() => {
          setIsChanged(true);
          setIsChanging(false);
        }, 150);
      } else if (scrollTop <= vh && isChanged) {
        setIsChanging(true);
        setTimeout(() => {
          setIsChanged(false);
          setIsChanging(false);
        }, 150);
      }
    } else {
      setIsChanged(false);
      setIsChanging(false);
    }
  }, [isChanged, isLargeScreen, vh]);

  useEffect(() => {
    setIsLargeScreen(window.innerWidth >= 640);

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", checkScreenSizeAndUpdateNavbar);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", checkScreenSizeAndUpdateNavbar);
    };
  }, [checkScreenSizeAndUpdateNavbar]);

  return { isChanged, isChanging, isLargeScreen };
};
