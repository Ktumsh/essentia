"use client";

import { useRef } from "react";

type UseGlowingEffectReturnType = {
  setRef: (el: HTMLDivElement | null, index?: number) => void;
  handleMouseMove: (
    e: React.MouseEvent<HTMLDivElement>,
    index?: number
  ) => void;
};

export function useGlowingEffect(): UseGlowingEffectReturnType {
  const elementRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index?: number
  ): void => {
    if (index !== undefined) {
      const element = elementRefs.current[index];
      if (element) {
        const x = e.pageX - element.offsetLeft;
        const y = e.pageY - element.offsetTop;

        element.style.setProperty("--x", `${x}px`);
        element.style.setProperty("--y", `${y}px`);
      }
    } else if (elementRefs.current[0]) {
      const element = elementRefs.current[0];
      const x = e.pageX - element.offsetLeft;
      const y = e.pageY - element.offsetTop;

      element.style.setProperty("--x", `${x}px`);
      element.style.setProperty("--y", `${y}px`);
    }
  };

  const setRef = (el: HTMLDivElement | null, index?: number) => {
    if (index !== undefined) {
      if (elementRefs.current[index] !== el) {
        elementRefs.current[index] = el;
      }
    } else {
      elementRefs.current[0] = el;
    }
  };

  return { handleMouseMove, setRef };
}
