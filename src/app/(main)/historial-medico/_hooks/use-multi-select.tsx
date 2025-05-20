"use client";

import { useEffect, useRef, useState } from "react";

export function useMultiSelect<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (e: React.MouseEvent, id: string, index: number) => {
    const isCtrl = e.metaKey || e.ctrlKey;
    const isShift = e.shiftKey;

    if (isCtrl) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
      setLastIndex(index);
    } else if (isShift && lastIndex !== null) {
      const [start, end] = [
        Math.min(lastIndex, index),
        Math.max(lastIndex, index),
      ];
      const range = items.slice(start, end + 1).map((item) => item.id);
      const allSelected = range.every((id) => selectedIds.includes(id));
      setSelectedIds(
        allSelected ? [id] : Array.from(new Set([...selectedIds, ...range])),
      );
      setLastIndex(index);
    } else {
      setSelectedIds([id]);
      setLastIndex(index);
    }
  };

  const handleToggle = (id: string, index: number) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
    setLastIndex(index);
  };

  const clearSelection = () => {
    setSelectedIds([]);
    setLastIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        clearSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    selectedIds,
    handleSelect,
    handleToggle,
    clearSelection,
    containerRef,
    setSelectedIds,
  };
}
