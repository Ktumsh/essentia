"use client";

import { usePathname } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const isAbout = pathname.startsWith("/about");
  return (
    <NextThemesProvider
      {...props}
      enableSystem={true}
      attribute="class"
      defaultTheme="system"
      forcedTheme={isAbout ? "light" : undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
