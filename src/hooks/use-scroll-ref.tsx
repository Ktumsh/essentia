"use client";

import { createContext, useContext, RefObject } from "react";

export const ScrollContext = createContext<RefObject<HTMLDivElement> | null>(
  null,
);

export const useScrollRef = () => useContext(ScrollContext);
