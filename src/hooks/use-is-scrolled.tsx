"use client";

import { useState, useEffect, RefObject } from "react";

function useIsScrolled(scrollRef?: RefObject<HTMLElement | null>): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element: HTMLElement | Window =
      scrollRef && scrollRef.current ? scrollRef.current : window;

    const handleScroll = () => {
      let scrollTop = 0;
      if (element === window) {
        scrollTop =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
      } else {
        scrollTop = (element as HTMLElement).scrollTop;
      }
      setIsScrolled(scrollTop > 0);
    };

    element.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef]);

  return isScrolled;
}

export default useIsScrolled;
