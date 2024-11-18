"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@/modules/icons/common";
import { SystemIcon } from "@/modules/icons/status";
import { cn } from "@/utils/common";

type Theme = "light" | "dark" | "system";

export const ThemeToggle = ({ className = "!size-6" }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div
      className={cn(
        "z-10 flex gap-1.5 rounded-full border border-gray-200 dark:border-dark",
      )}
    >
      <Button
        aria-label="Modo sistema"
        disableRipple
        isIconOnly
        size="sm"
        radius="full"
        onPress={() => handleThemeChange("system")}
        className={cn(
          "min-w-6 bg-transparent text-main-h dark:text-gray-400",
          theme === "system" && "!bg-gray-200 dark:!bg-dark",
          className,
        )}
      >
        <SystemIcon
          aria-hidden="true"
          className={cn("!size-3", className === "!size-8" && "size-4")}
        />
      </Button>
      <Button
        aria-label="Modo claro"
        disableRipple
        isIconOnly
        size="sm"
        radius="full"
        onPress={() => handleThemeChange("light")}
        className={cn(
          "min-w-6 bg-transparent text-main-h dark:text-gray-400",
          theme === "light" && "!bg-gray-200 dark:!bg-dark",
          className,
        )}
      >
        <SunIcon
          aria-hidden="true"
          className={cn("!size-3", className === "!size-8" && "size-4")}
        />
      </Button>
      <Button
        aria-label="Modo oscuro"
        disableRipple
        isIconOnly
        size="sm"
        radius="full"
        onPress={() => handleThemeChange("dark")}
        className={cn(
          "min-w-6 bg-transparent text-main-h dark:text-gray-400",
          theme === "dark" && "!bg-gray-200 dark:!bg-dark",
          className,
        )}
      >
        <MoonIcon
          aria-hidden="true"
          className={cn("!size-3", className === "!size-8" && "size-4")}
        />
      </Button>
    </div>
  );
};
