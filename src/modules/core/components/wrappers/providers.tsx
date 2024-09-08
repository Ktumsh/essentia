import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/modules/chatbot/hooks/use-sidebar";
import { ThemeProvider } from "../../hooks/use-theme";
import SessionProviderComponent from "../../hooks/use-session";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProviderComponent>
      <SidebarProvider>
        <ThemeProvider {...props}>{children}</ThemeProvider>
      </SidebarProvider>
    </SessionProviderComponent>
  );
}
