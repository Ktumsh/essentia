import { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/modules/core/components/ui/sheet";
import { SidebarIcon } from "@/modules/icons/navigation";

import { Sidebar } from "./sidebar";

interface SidebarMobileProps {
  children: ReactNode;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  sheetSide: "left" | "right";
}

const SidebarMobile = ({
  children,
  isSheetOpen,
  setIsSheetOpen,
  sheetSide,
}: SidebarMobileProps) => {
  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button className="h-10 rounded-lg px-2 text-main-h transition-colors duration-150 hover:bg-gray-200 focus-visible:outline-none dark:text-main-dark-h dark:hover:bg-full-dark">
            <SidebarIcon />
            <span className="sr-only">Alternar barra lateral</span>
          </button>
        </SheetTrigger>
        <SheetContent
          aria-labelledby="dialog-description"
          side={sheetSide}
          hideCloseButton
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          className="inset-y-0 flex h-auto w-[300px] flex-col p-0 focus-visible:outline-none [&_*]:outline-none"
        >
          <span className="sr-only">
            <SheetTitle>Menú</SheetTitle>
          </span>
          <span id="dialog-description" className="sr-only">
            <SheetDescription>
              Este es el menú móvil donde puedes navegar por las opciones.
            </SheetDescription>
          </span>
          <Sidebar className="flex">{children}</Sidebar>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SidebarMobile;
