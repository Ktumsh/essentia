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
              >
                <Link href={item.link}>
                  <item.activeIcon className="text-main-m group-data-[active=true]:text-main-h dark:text-main-dark-h dark:group-data-[active=true]:text-white" />
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
