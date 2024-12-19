"use client";

import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const isAIPage = pathname.startsWith("/essentia-ai");

  const { state } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
        Adicional
      </SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            {state === "expanded" && !isAIPage ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Información">
                    <Info strokeWidth={1.5} />
                    <span>Información</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="transition-height">
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
    </SidebarGroup>
  );
};

export default MainNavInfo;
