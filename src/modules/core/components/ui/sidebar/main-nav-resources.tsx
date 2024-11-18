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
import { SiteConfig } from "@/types/common";

interface MainNavResourcesProps {
  items: SiteConfig["asideMenuLinks"];
}

const MainNavResources = ({ items }: MainNavResourcesProps) => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recursos</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const isActive = pathname === item.link;
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.name}
              >
                <Link href={item.link}>
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

export default MainNavResources;
