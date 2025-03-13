"use client";

import { ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import { Skeleton } from "@/components/kit/skeleton";

type Theme = "light" | "dark" | "system";

const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const getThemeName = (theme: string) => {
    switch (theme) {
      case "light":
        return "Claro";
      case "dark":
        return "Oscuro";
      default:
        return "Sistema";
    }
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "light":
        return <Sun className="size-3.5" />;
      case "dark":
        return <Moon className="size-3.5" />;
      default:
        return <Monitor className="size-3.5" />;
    }
  };

  if (!mounted)
    return (
      <div className="dark:border-dark flex h-9 w-32 items-center justify-between rounded-md border border-slate-200 px-3 py-2 shadow-xs md:w-48">
        <Skeleton className="h-2.5 w-1/3" />
        <ChevronDown className="size-4 opacity-50" />
      </div>
    );

  return (
    <Select value={theme} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-32 shrink-0 md:w-48" autoFocus={false}>
        <div className="inline-flex items-center gap-2">
          {getThemeIcon(theme!)}
          <SelectValue>{getThemeName(theme!)}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="system">
            <div className="inline-flex items-center gap-2">
              <Monitor className="size-3.5" />
              <span>Sistema</span>
            </div>
          </SelectItem>
          <SelectItem value="light">
            <div className="inline-flex items-center gap-2">
              <Sun className="size-3.5" />
              <span>Claro</span>
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="inline-flex items-center gap-2">
              <Moon className="size-3.5" />
              <span>Oscuro</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ThemeSelect;
