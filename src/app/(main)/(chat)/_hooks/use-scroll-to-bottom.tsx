import { useRef, useEffect, useCallback } from "react";
import useSWR from "swr";

type ScrollFlag = ScrollBehavior | false;

export function useScrollToBottom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { data: isAtBottom = false, mutate: setIsAtBottom } = useSWR(
    "messages:is-at-bottom",
    null,
    { fallbackData: false },
  );
  const { data: scrollBehavior = false, mutate: setScrollBehavior } =
    useSWR<ScrollFlag>("messages:should-scroll", null, { fallbackData: false });

  const isAtBottomRef = useRef(isAtBottom);
  useEffect(() => {
    isAtBottomRef.current = isAtBottom;
  }, [isAtBottom]);

  useEffect(() => {
    if (scrollBehavior) {
      endRef.current?.scrollIntoView({ behavior: scrollBehavior });
      setScrollBehavior(false);
    }
  }, [scrollBehavior, setScrollBehavior]);

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      setScrollBehavior(behavior);
    },
    [setScrollBehavior],
  );

  const onViewportEnter = useCallback(() => {
    setIsAtBottom(true);
  }, [setIsAtBottom]);

  const onViewportLeave = useCallback(() => {
    setIsAtBottom(false);
  }, [setIsAtBottom]);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;
    if (!container || !end) return;

    const mo = new MutationObserver(() => {
      if (isAtBottomRef.current) {
        scrollToBottom();
      }
    });
    mo.observe(container, { childList: true, subtree: true });

    const io = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting ? onViewportEnter() : onViewportLeave(),
      { root: container, threshold: 0.5 },
    );
    io.observe(end);

    scrollToBottom();

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [scrollToBottom, onViewportEnter, onViewportLeave]);

  return {
    containerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    onViewportEnter,
    onViewportLeave,
  };
}
