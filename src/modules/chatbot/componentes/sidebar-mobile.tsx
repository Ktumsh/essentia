import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/modules/core/components/ui/sheet";
import { SidebarIcon } from "@/modules/icons/navigation";

interface SidebarMobileProps {
  children: ReactNode;
}

const SidebarMobile = ({ children }: SidebarMobileProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="h-10 rounded-lg px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark transition-colors duration-150">
          <SidebarIcon />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
      >
        <Sidebar className="flex">{children}</Sidebar>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
