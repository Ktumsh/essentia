"use client";

import { useState, useEffect, useRef } from "react";

const useScrollToUp = (scrollRef?: React.RefObject<HTMLElement | null>) => {
  const [isVisible, setIsVisible] = useState(false);
  const defaultScrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scrollElement =
      scrollRef?.current || document.documentElement || document.body;

    const handleScroll = () => {
      const scrollTop =
        scrollElement === document.documentElement ||
        scrollElement === document.body
          ? window.scrollY
          : scrollElement.scrollTop;
      setIsVisible(scrollTop > 20);
    };

    if (
      scrollElement === document.documentElement ||
      scrollElement === document.body
    ) {
      window.addEventListener("scroll", handleScroll);
    } else {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (
        scrollElement === document.documentElement ||
        scrollElement === document.body
      ) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);

  const scrollToTop = () => {
    const scrollElement =
      scrollRef?.current ||
      defaultScrollRef.current ||
      document.documentElement;
    if (scrollElement) {
      scrollElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return { isVisible, scrollToTop };
};

export default useScrollToUp;
