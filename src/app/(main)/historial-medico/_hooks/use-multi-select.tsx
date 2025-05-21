"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useReducer,
  ReactNode,
} from "react";

import { useIsMac } from "@/hooks/use-is-mac";
import { useIsMobile } from "@/hooks/use-mobile";

type Entry = { selectedIds: string[]; lastIndex: number | null };
type State = Record<string, Entry>;
type Action =
  | {
      type: "SET_SELECTION";
      key: string;
      selectedIds: string[];
      lastIndex: number | null;
    }
  | { type: "CLEAR_SELECTION"; key: string };

const MultiSelectContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: {}, dispatch: () => {} });

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SELECTION":
      return {
        ...state,
        [action.key]: {
          selectedIds: action.selectedIds,
          lastIndex: action.lastIndex,
        },
      };
    case "CLEAR_SELECTION":
      return {
        ...state,
        [action.key]: { selectedIds: [], lastIndex: null },
      };
    default:
      return state;
  }
}

export const MultiSelectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <MultiSelectContext.Provider value={{ state, dispatch }}>
      {children}
    </MultiSelectContext.Provider>
  );
};

export function useMultiSelect<T extends { id: string }>(
  key: string,
  items: T[],
) {
  const { state, dispatch } = useContext(MultiSelectContext);
  const entry = state[key] || { selectedIds: [], lastIndex: null };
  const { selectedIds, lastIndex } = entry;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const isMac = useIsMac();
  const isMobile = useIsMobile();

  const [multiMode, setMultiMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressTriggered = useRef(false);
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  const setSelection = (ids: string[], newIndex: number | null) =>
    dispatch({
      type: "SET_SELECTION",
      key,
      selectedIds: ids,
      lastIndex: newIndex,
    });

  const clearSelection = React.useCallback(
    () => dispatch({ type: "CLEAR_SELECTION", key }),
    [dispatch, key],
  );

  // ─── Detect drag for mobile scroll ──────────────────────────────────────
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (pointerDownPos.current) {
        const dx = Math.abs(e.clientX - pointerDownPos.current.x);
        const dy = Math.abs(e.clientY - pointerDownPos.current.y);
        if (dx > 10 || dy > 10) {
          setIsDragging(true);
          if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
          }
        }
      }
    };
    const el = containerRef.current;
    if (el) el.addEventListener("pointermove", handleMove);
    return () => {
      if (el) el.removeEventListener("pointermove", handleMove);
    };
  }, []);

  // ─── Desktop: click + Ctrl/Shift logic ───────────────────────────────────
  const handleSelect = (e: React.MouseEvent, id: string, index: number) => {
    if (isMobile) return;
    const isCtrl = isMac ? e.metaKey : e.ctrlKey;
    const isShift = e.shiftKey;

    if (!isCtrl && !isShift) {
      setSelection([id], index);
    } else if (isShift && lastIndex !== null) {
      const [start, end] = [
        Math.min(lastIndex, index),
        Math.max(lastIndex, index),
      ];
      const range = items.slice(start, end + 1).map((it) => it.id);
      const allIn = range.every((i) => selectedIds.includes(i));
      const newIds = allIn
        ? [id]
        : Array.from(new Set([...selectedIds, ...range]));
      setSelection(newIds, index);
    } else if (isCtrl) {
      const newIds = selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id];
      setSelection(newIds, index);
    }
  };

  // ─── Pure toggle (e.g. checkbox) ────────────────────────────────────────
  const handleToggle = (id: string, index: number) => {
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    setSelection(newIds, index);
    if (newIds.length === 0 && multiMode) setMultiMode(false);
  };

  // ─── Mobile: long-press to enter/exit multiMode ─────────────────────────
  const handlePointerDown = (
    id: string,
    index: number,
    e: React.PointerEvent,
  ) => {
    if (!isMobile) return;
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    longPressTriggered.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      setIsDragging(false);
      if (!multiMode) {
        setMultiMode(true);
        handleToggle(id, index);
      } else {
        clearSelection();
        setMultiMode(false);
      }
    }, 1000);
  };

  const handlePointerUp = (id: string, index: number) => {
    if (!isMobile) return;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    // Sólo toggle si no fue un long-press, estamos en multiMode y no hubo drag
    if (!longPressTriggered.current && multiMode && !isDragging) {
      handleToggle(id, index);
    }
    // reset
    setIsDragging(false);
    pointerDownPos.current = null;
  };

  // ─── Click outside: clear selección sólo fuera de multiMode ──────────────
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        !multiMode &&
        !containerRef.current?.contains(e.target as Node) &&
        !modalRef.current?.contains(e.target as Node)
      ) {
        clearSelection();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [clearSelection, multiMode]);

  return {
    selectedIds,
    handleSelect,
    handleToggle,
    clearSelection,
    containerRef,
    modalRef,
    setSelectedIds: (ids: string[]) => setSelection(ids, null),
    handlePointerDown,
    handlePointerUp,
  };
}
