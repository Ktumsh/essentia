"use client";

import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const router = useRouter();

  return (
    <NextUIProvider locale="es-ES" navigate={router.push}>
      <NextThemesProvider
        {...props}
        enableSystem={true}
        attribute="class"
        defaultTheme="system"
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
