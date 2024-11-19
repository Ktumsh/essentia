import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollToBottom = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth", // Desplazamiento suave
      });
    }
  }, []);

  useEffect(() => {
    const { current } = scrollRef;

    if (current) {
      const handleScroll = () => {
        const offset = 25;
        const isAtBottom =
          current.scrollTop + current.clientHeight >=
          current.scrollHeight - offset;

        setIsAtBottom(isAtBottom);
      };

      current.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      return () => {
        current.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (visibilityRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
          });
        },
        {
          rootMargin: "0px 0px -150px 0px",
        },
      );

      observer.observe(visibilityRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return {
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible,
  };
};
