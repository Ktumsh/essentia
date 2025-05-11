"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export function useChatScrollEnd(offset = 5) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const bottom = el.scrollTop + el.clientHeight >= el.scrollHeight - offset;
    setIsAtBottom(bottom);
  }, [offset]);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  return { containerRef, isAtBottom, onScroll };
}
