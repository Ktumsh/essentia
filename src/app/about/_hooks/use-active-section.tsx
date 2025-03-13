"use client";

import { useEffect, useRef, useState } from "react";

export type Section = {
  id: string;
  label: string;
};

const useActiveSection = (
  sections: Section[],
  isAutoScrolling: boolean,
  autoScrollTarget: string,
  onAutoScrollEnd: (sectionId: string) => void,
) => {
  const [activeSection, setActiveSection] = useState("");

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            if (!isAutoScrolling) {
              setActiveSection(currentId);
            } else if (currentId === autoScrollTarget) {
              setActiveSection(currentId);
              onAutoScrollEnd(currentId);
            }
          }
        }
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.current!.observe(element);
    });

    return () => observer.current?.disconnect();
  }, [sections, isAutoScrolling, autoScrollTarget, onAutoScrollEnd]);

  return activeSection;
};

export default useActiveSection;
