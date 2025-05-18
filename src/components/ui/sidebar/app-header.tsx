import Link from "next/link";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { cn } from "@/lib/utils";

import FullLogo from "../layout/full-logo";
import Greeting from "../layout/greeting";

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
              "group-data-[collapsible=icon]:border-background h-auto gap-2.5 px-3",
              isCollapsed && "border-background size-8! p-0",
            )}
          >
            <Link href="/">
              {isCollapsed ? (
                <FullLogo
                  collapsed
                  className={cn(
                    "group-data-[state=collapsed]:size-[30px]",
                    isCollapsed && "size-full",
                  )}
                />
              ) : (
                <FullLogo
                  className={cn(
                    "group-data-[state=collapsed]:size-[30px]",
                    isCollapsed && "size-full",
                  )}
                />
              )}
              <div className="grow">
                <p className="truncate text-sm font-semibold">Essentia</p>
                <p className="text-muted-foreground truncate text-xs">
                  <Greeting />
                </p>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppHeader;
