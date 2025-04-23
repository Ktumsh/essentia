"use client";

import { Command } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { useIsMac } from "@/hooks/use-is-mac";
import { cn } from "@/lib/utils";

import { SearchIcon } from "../icons/action";
import MainSearch from "../layout/main-search";

import type { NavConfig } from "@/config/nav.config";

interface MainNavMainProps {
  items: NavConfig["navLinks"];
  isPremium: boolean;
  isCollapsed?: boolean;
}

const MainNavMain = ({ items, isPremium, isCollapsed }: MainNavMainProps) => {
  const pathname = usePathname();

  const isMac = useIsMac();

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <MainSearch isPremium={isPremium}>
              <SidebarMenuButton
                tooltip="Busca rapida"
                className={cn(
                  "bg-accent dark:border-alternative/50 hover:bg-accent active:bg-accent border-2 transition-all duration-300",
                  {
                    "size-8!": isCollapsed,
                  },
                )}
              >
                <SearchIcon
                  aria-hidden="true"
                  className={cn("size-5 group-data-[collapsible=icon]:-m-0.5", {
                    "-m-0.5": isCollapsed,
                  })}
                />
                <div
                  className={cn(
                    "inline-flex w-full items-center justify-between truncate transition-all duration-500 group-data-[collapsible=icon]:invisible group-data-[collapsible=icon]:opacity-0",
                    {
                      invisble: isCollapsed,
                    },
                  )}
                >
                  <span>Busca rápida</span>
                  <kbd className="bg-background text-muted-foreground text-xxs pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono font-medium select-none">
                    {isMac ? (
                      <div className="inline-flex items-center gap-1 font-mono">
                        <Command className="size-[9px]" />+ K
                      </div>
                    ) : (
                      "Ctrl + K"
                    )}
                  </kbd>
                </div>
              </SidebarMenuButton>
            </MainSearch>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
          Principal
        </SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item, index) => {
            const isActive =
              pathname === item.path || pathname.startsWith(item.path + "/");
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.name}
                  className="transition-all hover:gap-3 hover:duration-300"
                >
                  <Link href={item.path}>
                    <item.activeIcon className="group-data-[active=true]/menu-button:-m-px" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default MainNavMain;
