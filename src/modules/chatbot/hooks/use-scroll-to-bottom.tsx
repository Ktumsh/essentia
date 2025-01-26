import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type RefObject,
} from "react";

export function useScrollToBottom<T extends HTMLElement>(): [
  RefObject<T | null>,
  RefObject<T | null>,
  () => void,
  boolean,
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const isAtBottomRef = useRef(isAtBottom);

  useEffect(() => {
    isAtBottomRef.current = isAtBottom;
  }, [isAtBottom]);

  const scrollToBottom = useCallback(() => {
    const end = endRef.current;
    if (end) {
      end.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (!container || !end) return;

    const mutationObserver = new MutationObserver(() => {
      if (isAtBottomRef.current) {
        scrollToBottom();
      }
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const atBottom = entry.isIntersecting;
        if (atBottom !== isAtBottomRef.current) {
          isAtBottomRef.current = atBottom;
          setIsAtBottom(atBottom);
        }
      },
      {
        root: container,
        threshold: 0.5,
      },
    );

    intersectionObserver.observe(end);

    scrollToBottom();

    return () => {
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [scrollToBottom]);

  return [containerRef, endRef, scrollToBottom, isAtBottom];
}
