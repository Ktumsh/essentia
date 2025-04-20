"use client";

import { RefObject, useEffect } from "react";

interface UseParallaxOptions {
  factor?: number;
}

export function useParallax(
  scrollRef: RefObject<HTMLElement> | RefObject<HTMLDivElement> | null,
  imageRef: RefObject<HTMLElement> | RefObject<HTMLImageElement | null>,
  { factor = 600 }: UseParallaxOptions = {},
) {
  useEffect(() => {
    const imgEl = imageRef?.current;
    if (!imgEl) return;

    const isWindow = !scrollRef || !scrollRef.current;
    const container = isWindow ? window : scrollRef.current;

    const getScrollTop = () =>
      isWindow
        ? window.scrollY || window.pageYOffset
        : (container as HTMLElement).scrollTop;

    const totalScroll = isWindow
      ? document.documentElement.scrollHeight - window.innerHeight
      : (container as HTMLElement).scrollHeight -
        (container as HTMLElement).clientHeight;

    let ticking = false;
    const updateParallax = () => {
      const scrollTop = getScrollTop();
      const progress = scrollTop / (totalScroll || 1);
      const translateY = progress * factor;
      imgEl.style.transform = `translateY(${translateY}px)`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    if (isWindow) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      (container as HTMLElement).addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    updateParallax();

    return () => {
      if (isWindow) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        (container as HTMLElement).removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef, imageRef, factor]);
}
