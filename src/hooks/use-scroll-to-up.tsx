"use client";

import { useState, useEffect } from "react";

const useScrollToUp = (scrollRef?: React.RefObject<HTMLElement | null>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef?.current || window;

    const handleScroll = () => {
      const scrollTop = scrollRef?.current
        ? scrollRef.current.scrollTop
        : window.scrollY;
      setIsVisible(scrollTop > 100);
    };

    if (scrollElement === window) {
      window.addEventListener("scroll", handleScroll);
    } else {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement === window) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);

  const scrollToTop = () => {
    const scrollElement = scrollRef?.current || document.documentElement;
    scrollElement.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { isVisible, scrollToTop };
};

export default useScrollToUp;
