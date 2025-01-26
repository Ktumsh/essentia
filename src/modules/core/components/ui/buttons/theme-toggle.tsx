"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils/common";

type Theme = "light" | "dark" | "system";

const ThemeToggle = ({ className = "!size-6" }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme !== theme) {
      let systemTheme = newTheme;

      if (newTheme === "system") {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        systemTheme = isDark ? "dark" : "light";
      }

      if (systemTheme !== resolvedTheme) {
        setTheme(newTheme);
        if (pathname === "/centros-de-salud") {
          router.replace("/centros-de-salud");
        }
      } else {
        setTheme(newTheme);
      }
    }
  };

  return (
    <div
      className={cn(
        "z-10 flex gap-1.5 rounded-full border border-gray-200 dark:border-dark",
      )}
    >
      <BetterTooltip content="Sistema">
        <Button
          aria-label="Modo sistema"
          size="icon"
          radius="full"
          onClick={() => handleThemeChange("system")}
          className={cn(
            "min-w-6 !bg-transparent text-main-m !shadow-none hover:text-main focus-visible:ring-0 dark:text-main-dark-h dark:hover:text-white",
            theme === "system" &&
              "!bg-gray-100 text-main dark:!bg-dark dark:text-white",
            className,
          )}
        >
          <Monitor
            aria-hidden="true"
            className={cn("!size-3.5", className === "!size-8" && "size-4")}
          />
        </Button>
      </BetterTooltip>

      <BetterTooltip content="Claro">
        <Button
          aria-label="Modo claro"
          size="icon"
          radius="full"
          onClick={() => handleThemeChange("light")}
          className={cn(
            "min-w-6 !bg-transparent text-main-m !shadow-none hover:text-main focus-visible:ring-0 dark:text-main-dark-h dark:hover:text-white",
            theme === "light" &&
              "!bg-gray-100 text-main dark:!bg-dark dark:text-white",
            className,
          )}
        >
          <Sun
            aria-hidden="true"
            className={cn("!size-3.5", className === "!size-8" && "size-4")}
          />
        </Button>
      </BetterTooltip>

      <BetterTooltip content="Oscuro">
        <Button
          aria-label="Modo oscuro"
          size="icon"
          radius="full"
          onClick={() => handleThemeChange("dark")}
          className={cn(
            "min-w-6 !bg-transparent text-main-m !shadow-none hover:text-main focus-visible:ring-0 dark:text-main-dark-h dark:hover:text-white",
            theme === "dark" &&
              "!bg-gray-100 text-main dark:!bg-dark dark:text-white",
            className,
          )}
        >
          <Moon
            aria-hidden="true"
            className={cn("!size-3.5", className === "!size-8" && "size-4")}
          />
        </Button>
      </BetterTooltip>
    </div>
  );
};

export default memo(ThemeToggle);
