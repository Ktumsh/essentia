"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchIcon } from "@/modules/icons/action";
import { SiteConfig } from "@/types/common";

import MainSearch from "../layout/main-search";

interface MainNavMainProps {
  items: SiteConfig["navLinks"];
}

const MainNavMain = ({ items }: MainNavMainProps) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Principal</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <MainSearch>
            <SidebarMenuButton tooltip="Busca rapida">
              <SearchIcon className="size-5" aria-hidden="true" />
              <span>Busca rápida</span>
            </SidebarMenuButton>
          </MainSearch>
          {items.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <SidebarMenuButton
                key={index}
                asChild
                isActive={isActive}
                tooltip={item.name}
              >
                <Link href={item.href}>
                  {isActive ? <item.activeIcon /> : <item.icon />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default MainNavMain;
