import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NewIcon } from "@/modules/icons/action";

const HistoryLoading = () => {
  return (
    <>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <div className="flex items-center p-2">
            <h4 className="text-sm font-medium text-main dark:text-white">
              Historial de chat
            </h4>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="rounded-md bg-gray-100 text-sm focus-visible:outline-none dark:bg-dark">
                <NewIcon />
                <span>Nuevo chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <div className="relative flex-1 overflow-y-auto">
          <div className="space-y-2 px-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-full shrink-0 animate-pulse rounded-md bg-gray-100 dark:bg-dark"
              />
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </>
  );
};

export default HistoryLoading;
