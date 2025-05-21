"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useRef,
  useEffect,
  useState,
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

const MultiSelectContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: {},
  dispatch: () => {},
});

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
      return { ...state, [action.key]: { selectedIds: [], lastIndex: null } };
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

  // multi-select mode flag & long-press helpers
  const [multiMode, setMultiMode] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressTriggered = useRef(false);

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
    // exit multiMode if nothing remains
    if (newIds.length === 0 && multiMode) setMultiMode(false);
  };

  // ─── Mobile: long-press to enter/exit multiMode ─────────────────────────
  const handlePointerDown = (id: string, index: number) => {
    if (!isMobile) return;
    longPressTriggered.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      if (!multiMode) {
        setMultiMode(true);
        handleToggle(id, index);
      } else {
        clearSelection();
        setMultiMode(false);
      }
    }, 500);
  };

  const handlePointerUp = (id: string, index: number) => {
    if (!isMobile) return;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    // if it wasn’t a long-press but we’re in multiMode, treat as toggle
    if (!longPressTriggered.current && multiMode) {
      handleToggle(id, index);
    }
  };

  // ─── Click outside: clear *only* selection, leave multiMode flag alone ───
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !modalRef.current?.contains(e.target as Node)
      ) {
        clearSelection();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [clearSelection]);

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
