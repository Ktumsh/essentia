import * as React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SidebarProvider } from "@/modules/chatbot/hooks/use-sidebar";
import { ThemeProvider } from "../../hooks/use-theme";
import SessionProviderComponent from "../../hooks/use-session";
import { PremiumProvider } from "../../hooks/use-premium-status";

export async function Providers({
  isPremium,
  children,
  ...props
}: { isPremium: boolean } & ThemeProviderProps) {
  return (
    <SessionProviderComponent>
      <PremiumProvider isPremium={isPremium}>
        <SidebarProvider>
          <ThemeProvider {...props}>{children}</ThemeProvider>
        </SidebarProvider>
      </PremiumProvider>
    </SessionProviderComponent>
  );
}
