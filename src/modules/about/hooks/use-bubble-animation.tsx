"use client";

import { useEffect, RefObject } from "react";

const useBubbleAnimation = (bubbles: RefObject<HTMLImageElement>[]) => {
  useEffect(() => {
    const inView = new Map<Element, number>();
    const speed = 0.1;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      inView.forEach((initialScrollY, image) => {
        const deltaY = scrollY - initialScrollY;
        const translateYValue = deltaY > 0 ? deltaY * speed : 0;
        (image as HTMLElement).style.transform =
          `translate3d(0px, ${translateYValue}px, 0px)`;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inView.set(entry.target, window.scrollY);
          } else {
            inView.delete(entry.target);
            (entry.target as HTMLElement).style.transform = "";
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    bubbles.forEach((bubbleRef) => {
      if (bubbleRef.current) observer.observe(bubbleRef.current);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [bubbles]);
};

export default useBubbleAnimation;
