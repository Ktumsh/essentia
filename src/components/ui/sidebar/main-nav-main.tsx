"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { SiteConfig } from "@/types/common";

import { SearchIcon } from "../icons/action";
import MainSearch from "../layout/main-search";

interface MainNavMainProps {
  items: SiteConfig["navLinks"];
  isPremium: boolean;
}

const MainNavMain = ({ items, isPremium }: MainNavMainProps) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <MainSearch isPremium={isPremium}>
            <SidebarMenuButton
              tooltip="Busca rapida"
              className="transition-all hover:gap-3 hover:duration-300"
            >
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
                className="transition-all hover:gap-3 hover:duration-300"
              >
                <Link href={item.href}>
                  <item.activeIcon className="group-data-[active=true]/menu-button:-m-px" />
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
