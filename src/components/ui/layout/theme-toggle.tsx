"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";

import { MonitorButton } from "@/components/button-kit/monitor-button";
import { MoonButton } from "@/components/button-kit/moon-button";
import { SunButton } from "@/components/button-kit/sun-button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "size-6!" }: ThemeToggleProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme !== theme) {
      if (newTheme === "system") {
        if (systemTheme && systemTheme !== resolvedTheme) {
          setTheme(newTheme);
          if (pathname === "/centros-de-salud") {
            router.replace("/centros-de-salud");
          }
        } else {
          setTheme(newTheme);
        }
      } else {
        setTheme(newTheme);
        if (pathname === "/centros-de-salud") {
          router.replace("/centros-de-salud");
        }
      }
    }
  };

  return (
    <div
      className={cn(
        "bg-background z-10 flex gap-1.5 rounded-full border p-0.5",
      )}
    >
      <BetterTooltip content="Sistema">
        <MonitorButton
          aria-label="Modo sistema"
          size="icon"
          onClick={() => handleThemeChange("system")}
          svgClassName={cn("size-3.5!", className === "size-8!" && "size-4")}
          className={cn(
            "text-foreground/80 hover:text-foreground min-w-6 bg-transparent! shadow-none! focus-visible:ring-0",
            theme === "system" && "text-foreground bg-accent!",
            className,
          )}
        />
      </BetterTooltip>

      <BetterTooltip content="Claro">
        <SunButton
          aria-label="Modo claro"
          size="icon"
          onClick={() => handleThemeChange("light")}
          svgClassName={cn("size-3.5!", className === "size-8!" && "size-4")}
          className={cn(
            "text-foreground/80 hover:text-foreground min-w-6 bg-transparent! shadow-none! focus-visible:ring-0",
            theme === "light" && "text-foreground bg-accent!",
            className,
          )}
        />
      </BetterTooltip>

      <BetterTooltip content="Oscuro">
        <MoonButton
          aria-label="Modo oscuro"
          size="icon"
          onClick={() => handleThemeChange("dark")}
          svgClassName={cn("size-3.5!", className === "size-8!" && "size-4")}
          className={cn(
            "text-foreground/80 hover:text-foreground min-w-6 bg-transparent! shadow-none! focus-visible:ring-0",
            theme === "dark" && "text-foreground bg-accent!",
            className,
          )}
        />
      </BetterTooltip>
    </div>
  );
};

export default memo(ThemeToggle);
