"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import AppSidebarToggle from "@/modules/core/components/ui/sidebar/app-sidebar-toggle";
import { UserProfileData } from "@/types/session";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetEdgeDragArea,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import MobileMenu from "./mobile-menu";
import MenuButton from "../buttons/menu-button";

interface MobileHeaderProps {
  user: UserProfileData | null;
}

const MobileHeader = ({ user }: MobileHeaderProps) => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isAIPage = pathname.startsWith("/essentia-ai");

  console.log("isAIPage", isAIPage);

  return (
    <>
      <SheetEdgeDragArea onOpen={() => setIsSheetOpen(true)} />
      <nav className="sticky top-0 z-50 flex h-14 items-center justify-between overflow-hidden border-b border-gray-200 bg-white/80 px-6 backdrop-blur-lg backdrop-saturate-150 dark:border-dark dark:bg-full-dark/80 md:hidden">
        {isAIPage && <AppSidebarToggle />}
        <Link
          className="relative size-8 rounded-full transition-transform active:scale-95"
          href="/"
          aria-label="Página de inicio"
        >
          <Image
            className="aspect-auto h-8 w-auto transition-all ease-in-out"
            width={32}
            height={32}
            quality={100}
            src="/logo-essentia.webp"
            alt="Logo de Essentia"
            priority
          />
        </Link>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className="focus-visible:outline-none">
            <MenuButton profileData={user} />
          </SheetTrigger>
          <SheetContent
            aria-labelledby="dialog-description"
            side="right"
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
            <MobileMenu profileData={user} />
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};

export default MobileHeader;
