import { Bug, ChevronRight, Info } from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SiteConfig } from "@/types/common";

interface MainNavInfoProps {
  items: SiteConfig["footerLinks"]["more"];
}

const MainNavInfo = ({ items }: MainNavInfoProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Extras</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Acerca de">
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
                        <span>{link.text}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
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
