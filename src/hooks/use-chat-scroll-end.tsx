"use client";

import { useEffect, useRef, useState } from "react";

export function useChatScrollEnd(offset: number = 5) {
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const element = chatScrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolledToBottom =
        element.scrollHeight - element.scrollTop <=
        element.clientHeight + offset;
      setIsAtBottom(scrolledToBottom);
    };

    element.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return { chatScrollRef, isAtBottom };
}
