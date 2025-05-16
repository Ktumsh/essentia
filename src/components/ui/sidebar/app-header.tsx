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
              "group-data-[collapsible=icon]:border-background h-auto gap-2.5 px-3",
              isCollapsed && "border-background size-8! p-0",
            )}
          >
            <Link href="/">
              {isCollapsed ? (
                <div
                  className={cn(
                    "bg-logo mask mask-squircle grid aspect-square place-content-center group-data-[state=collapsed]:size-[30px]",
                    isCollapsed ? "size-full" : "size-8",
                  )}
                >
                  <Logo width={16} height={16} className="h-4" />
                </div>
              ) : (
                <div className="relative inline-flex align-middle">
                  <div
                    className={cn(
                      "bg-logo mask mask-squircle grid aspect-square place-content-center group-data-[state=collapsed]:size-[30px]",
                      isCollapsed ? "size-full" : "size-8",
                    )}
                  >
                    <Logo width={16} height={16} className="h-4" />
                  </div>
                </div>
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
