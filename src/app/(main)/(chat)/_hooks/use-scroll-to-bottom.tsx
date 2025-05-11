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

  // Ref para leer la última posición
  const isAtBottomRef = useRef(isAtBottom);
  useEffect(() => {
    isAtBottomRef.current = isAtBottom;
  }, [isAtBottom]);

  // Cuando recibimos la orden de scroll, lo hacemos SOLO en el contenedor
  useEffect(() => {
    if (scrollBehavior) {
      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: scrollBehavior,
        });
      }
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

    // Cuando llega nuevo contenido y el usuario estaba abajo, volvemos a hacer scroll
    const mo = new MutationObserver(() => {
      if (isAtBottomRef.current) {
        scrollToBottom();
      }
    });
    mo.observe(container, { childList: true, subtree: true });

    // Observamos solo para saber si el usuario está realmente al fondo
    const io = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting ? onViewportEnter() : onViewportLeave(),
      { root: container, threshold: 0.5 },
    );
    io.observe(end);

    // NO «scrollIntoView()» general al montar: omitido

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
