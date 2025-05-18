"use client";

import { usePathname } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const pathsToExclude = ["/blog"];
  const isExcluded = pathsToExclude.includes(pathname);

  return (
    <NextThemesProvider
      {...props}
      enableSystem={true}
      attribute="class"
      defaultTheme="system"
      forcedTheme={isExcluded ? "light" : undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
