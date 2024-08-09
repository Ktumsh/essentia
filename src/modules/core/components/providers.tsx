"use client";

import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/modules/chatbot/hooks/use-sidebar";
import { ThemeProvider } from "../hooks/use-theme";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SidebarProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </SidebarProvider>
  );
}
