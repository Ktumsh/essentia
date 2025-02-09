import Link from "next/link";
import React from "react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Greeting from "../utils/greeting";
import Logo from "../utils/logo";

interface AppHeaderProps {
  isCollapsed?: boolean;
}

const AppHeader = ({ isCollapsed }: AppHeaderProps) => {
  return (
    <SidebarHeader className="mb-2 space-y-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            asChild
            className={isCollapsed ? "size-8! p-0" : ""}
          >
            <Link href="/">
              <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-md">
                <Logo width={16} height={16} className="h-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Essentia</span>
                <span className="text-main-m dark:text-main-dark-m truncate text-xs">
                  <Greeting />
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppHeader;
