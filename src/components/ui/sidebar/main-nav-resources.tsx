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
import { SiteConfig } from "@/types/common";

interface MainNavResourcesProps {
  items: SiteConfig["asideMenuLinks"];
  isCollapsed?: boolean;
}

const MainNavResources = ({ items, isCollapsed }: MainNavResourcesProps) => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
        Recursos
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const isActive = pathname.startsWith(item.link);
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.name}
                className="transition-all hover:gap-3 hover:duration-300"
              >
                <Link href={item.link}>
                  <span className="-m-px group-data-[active=true]/menu-button:-m-0.5">
                    {item.emoji}
                  </span>
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
