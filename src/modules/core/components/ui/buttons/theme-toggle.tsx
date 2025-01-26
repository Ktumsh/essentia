"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils/common";

type Theme = "light" | "dark" | "system";

const ThemeToggle = ({ className = "size-6!" }) => {
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
        "dark:border-dark z-10 flex gap-1.5 rounded-full border border-gray-200",
      )}
    >
      <BetterTooltip content="Sistema">
        <Button
          aria-label="Modo sistema"
          size="icon"
          radius="full"
          onClick={() => handleThemeChange("system")}
          className={cn(
            "text-main-m hover:text-main dark:text-main-dark-h min-w-6 bg-transparent! shadow-none! focus-visible:ring-0 dark:hover:text-white",
            theme === "system" &&
              "text-main dark:bg-dark! bg-gray-100! dark:text-white",
            className,
          )}
        >
          <Monitor
            aria-hidden="true"
            className={cn("size-3.5!", className === "size-8!" && "size-4")}
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
            "text-main-m hover:text-main dark:text-main-dark-h min-w-6 bg-transparent! shadow-none! focus-visible:ring-0 dark:hover:text-white",
            theme === "light" &&
              "text-main dark:bg-dark! bg-gray-100! dark:text-white",
            className,
          )}
        >
          <Sun
            aria-hidden="true"
            className={cn("size-3.5!", className === "size-8!" && "size-4")}
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
            "text-main-m hover:text-main dark:text-main-dark-h min-w-6 bg-transparent! shadow-none! focus-visible:ring-0 dark:hover:text-white",
            theme === "dark" &&
              "text-main dark:bg-dark! bg-gray-100! dark:text-white",
            className,
          )}
        >
          <Moon
            aria-hidden="true"
            className={cn("size-3.5!", className === "size-8!" && "size-4")}
          />
        </Button>
      </BetterTooltip>
    </div>
  );
};

export default memo(ThemeToggle);
