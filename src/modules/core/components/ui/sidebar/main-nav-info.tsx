"use client";

import { Bug, ChevronRight, Info } from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SiteConfig } from "@/types/common";

interface MainNavInfoProps {
  items: SiteConfig["footerLinks"]["more"];
  isCollapsed?: boolean;
}

const MainNavInfo = ({ items, isCollapsed }: MainNavInfoProps) => {
  const { state } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
        Extras
      </SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            {state === "expanded" ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Información">
                    <Info strokeWidth={1.5} />
                    <span>Información</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {items.map((link) => (
                      <SidebarMenuSubItem key={link.text}>
                        <SidebarMenuSubButton asChild>
                          <Link href={link.href} role="link" target="_self">
                            {link.text}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton tooltip="Información">
                    <Info strokeWidth={1.5} />
                    <span>Información</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" sideOffset={4}>
                  <DropdownMenuGroup>
                    {items.map((link) => (
                      <DropdownMenuItem key={link.text}>
                        <Link href={link.href} role="link" target="_self">
                          <span>{link.text}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Reportar un error" asChild>
            <Link
              href="https://github.com/Ktumsh/essentia/issues/new"
              target="_blank"
            >
              <Bug strokeWidth={1.5} />
              <span>Reportar un error</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default MainNavInfo;
