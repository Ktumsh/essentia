"use client";
import { useEffect, useState, useCallback, RefObject } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

interface UseNavbarChangeProps {
  scrollContainerRef: RefObject<HTMLElement | null>;
}

export const useNavbarChange = ({
  scrollContainerRef,
}: UseNavbarChangeProps) => {
  const VIEWPORT_HEIGHT = scrollContainerRef.current
    ? scrollContainerRef.current.clientHeight / 1.2
    : 0;

  const [isChanged, setIsChanged] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const isMobile = useIsMobile();

  const checkScreenSizeAndUpdateNavbar = useCallback(() => {
    const scrollTop = scrollContainerRef.current
      ? scrollContainerRef.current.scrollTop
      : 0;

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
  }, [isChanged, isMobile, VIEWPORT_HEIGHT, scrollContainerRef]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", checkScreenSizeAndUpdateNavbar);
    // Limpieza del event listener
    return () => {
      scrollContainer.removeEventListener(
        "scroll",
        checkScreenSizeAndUpdateNavbar,
      );
    };
  }, [checkScreenSizeAndUpdateNavbar, scrollContainerRef]);

  return { isChanged, isChanging };
};
