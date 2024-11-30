"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchIcon } from "@/modules/icons/action";
import { SiteConfig } from "@/types/common";

import MainSearch from "../layout/main-search";

interface MainNavMainProps {
  items: SiteConfig["navLinks"];
  isPremium?: boolean;
}

const MainNavMain = ({ items, isPremium }: MainNavMainProps) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <MainSearch isPremium={isPremium}>
            <SidebarMenuButton tooltip="Busca rapida">
              <SearchIcon className="size-5" aria-hidden="true" />
              <span>Busca rápida</span>
            </SidebarMenuButton>
          </MainSearch>
        </SidebarMenuItem>
        {items.map((item, index) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.name}
              >
                <Link href={item.href}>
                  {isActive ? <item.activeIcon /> : <item.icon />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default MainNavMain;
