"use client";

import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/modules/chatbot/hooks/use-sidebar";
import { ThemeProvider } from "../hooks/use-theme";
import SessionProviderComponent from "../hooks/use-session";
import { usePathname } from "next/navigation";

export function Providers({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();

  const login = pathname.startsWith("/login");
  const signup = pathname.startsWith("/signup");
  return (
    <SessionProviderComponent>
      <SidebarProvider>
        <ThemeProvider
          forcedTheme={login || signup ? "light" : undefined}
          {...props}
        >
          {children}
        </ThemeProvider>
      </SidebarProvider>
    </SessionProviderComponent>
  );
}
