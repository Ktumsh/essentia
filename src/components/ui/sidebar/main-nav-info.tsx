"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { InfoCircledIcon, LegalIcon } from "@/components/icons/common";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/kit/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/kit/dropdown-menu";
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
} from "@/components/kit/sidebar";

import type { NavConfig } from "@/config/nav.config";

interface MainNavInfoProps {
  items: NavConfig["menuFooterLinks"];
  isCollapsed?: boolean;
}

const MainNavInfo = ({ items, isCollapsed }: MainNavInfoProps) => {
  const pathname = usePathname();

  const isAerisPage = pathname.startsWith("/aeris");

  const { state } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
        Adicional
      </SidebarGroupLabel>
      <SidebarDropdown
        label="Sobre Essentia"
        icon={InfoCircledIcon}
        items={items.extras}
        tooltip="Sobre Essentia"
        isAerisPage={isAerisPage}
        state={state}
      />
      <SidebarDropdown
        label="Legal"
        icon={LegalIcon}
        items={items.legal}
        tooltip="Legal"
        isAerisPage={isAerisPage}
        state={state}
      />
    </SidebarGroup>
  );
};

export default MainNavInfo;

const SidebarDropdown = ({
  label,
  icon: Icon,
  items,
  tooltip,
  isAerisPage,
  state,
}: {
  label: string;
  icon: React.ElementType;
  items: NavConfig["menuFooterLinks"]["extras" | "legal"];
  tooltip: string;
  isAerisPage: boolean;
  state: "expanded" | "collapsed";
}) => {
  const { data: session } = useSession();
  const forceState = session?.user?.id && isAerisPage ? true : false;

  return (
    <SidebarMenu>
      <Collapsible asChild className="group/collapsible">
        <SidebarMenuItem>
          {state === "expanded" && !isAerisPage ? (
            <>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={tooltip} forceState={forceState}>
                  <Icon />
                  <span>{label}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="transition-height">
                <SidebarMenuSub>
                  {items.map((item) => (
                    <SidebarMenuSubItem key={item.name}>
                      <SidebarMenuSubButton
                        asChild
                        className="shrink-0 text-nowrap"
                      >
                        <Link href={item.path}>{item.name}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip={tooltip} forceState={forceState}>
                  <Icon />
                  <span>{label}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" sideOffset={4}>
                <DropdownMenuGroup>
                  {items.map((item) => (
                    <DropdownMenuItem key={item.name}>
                      <item.icon />
                      <Link href={item.path}>
                        <span>{item.name}</span>
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
  );
};
