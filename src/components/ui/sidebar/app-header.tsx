import Link from "next/link";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { cn } from "@/lib/utils";

import Greeting from "../layout/greeting";
import Logo from "../layout/logo";

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
            isActive
            className={cn(
              "group-data-[collapsible=icon]:border-background",
              isCollapsed && "border-background size-8! p-0",
            )}
          >
            <Link href="/">
              <div
                className={cn(
                  "bg-logo flex shrink-0 items-center justify-center rounded-md group-data-[state=collapsed]:size-[30px]",
                  isCollapsed ? "size-full" : "size-8",
                )}
              >
                <Logo width={16} height={16} className="h-4" />
              </div>
              <div className="grid flex-1 text-left text-sm">
                <span className="truncate font-semibold">Essentia</span>
                <span className="text-muted-foreground truncate text-xs">
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
