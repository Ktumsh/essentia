"use client";

import { ChevronRight } from "lucide-react";
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
import { WarningCircledIcon } from "@/modules/icons/common";
import { SiteConfig } from "@/types/common";

interface MainNavInfoProps {
  items: SiteConfig["menuFooterLinks"]["extras"];
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
                    <WarningCircledIcon className="text-main-m group-data-[active=true]:text-main-h dark:text-main-dark-h dark:group-data-[active=true]:text-white" />
                    <span>Información</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="transition-height">
                  <SidebarMenuSub>
                    {items.map((link) => (
                      <SidebarMenuSubItem key={link.name}>
                        <SidebarMenuSubButton
                          asChild
                          className="shrink-0 text-nowrap"
                        >
                          <Link href={link.link} role="link" target="_self">
                            {link.name}
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
                    <WarningCircledIcon className="text-main-m group-data-[active=true]:text-main-h dark:text-main-dark-h dark:group-data-[active=true]:text-white" />
                    <span>Información</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" sideOffset={4}>
                  <DropdownMenuGroup>
                    {items.map((link) => (
                      <DropdownMenuItem key={link.name}>
                        <link.icon strokeWidth={1.5} />
                        <Link href={link.link} role="link" target="_self">
                          <span>{link.name}</span>
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
