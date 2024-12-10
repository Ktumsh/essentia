"use client";

import { useEffect, useState, useCallback } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";

const VIEWPORT_HEIGHT = window.innerHeight / 1.4;

export const useNavbarChange = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const isMobile = useIsMobile();

  const checkScreenSizeAndUpdateNavbar = useCallback(() => {
    const scrollTop = window.scrollY;

    if (!isMobile) {
      if (scrollTop > VIEWPORT_HEIGHT && !isChanged) {
        setIsChanging(true);
        setTimeout(() => {
          setIsChanged(true);
          setIsChanging(false);
        }, 150);
      } else if (scrollTop <= VIEWPORT_HEIGHT && isChanged) {
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
  }, [isChanged, isMobile, VIEWPORT_HEIGHT]);

  useEffect(() => {
    window.addEventListener("scroll", checkScreenSizeAndUpdateNavbar);

    return () => {
      window.removeEventListener("scroll", checkScreenSizeAndUpdateNavbar);
    };
  }, [checkScreenSizeAndUpdateNavbar, isMobile]);

  return { isChanged, isChanging };
};
