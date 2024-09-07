"use client";

import { FC } from "react";
import { Navbar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import MenuButton from "./menu-button";
import MobileMenu from "./mobile-menu";
import { usePathname } from "next/navigation";
import SidebarMobile from "@/modules/chatbot/componentes/sidebar-mobile";
import ChatHistory from "@/modules/chatbot/componentes/chat-history";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { UserProfileData } from "@/types/session";

interface MobileHeaderProps {
  profileData: UserProfileData | null;
}

const MobileHeader: FC<MobileHeaderProps> = ({ profileData }) => {
  const pathname = usePathname();

  const essentiaAi = pathname.startsWith("/essentia-ai");

  return (
    <>
      <Navbar
        shouldHideOnScroll
        classNames={{
          base: "fixed md:hidden bg-white dark:bg-base-full-dark shadow-md overflow-hidden",
          wrapper: "h-14",
        }}
      >
        {essentiaAi && profileData && (
          <SidebarMobile>
            <ChatHistory userId={profileData?.id} />
          </SidebarMobile>
        )}
        <Link
          className="relative size-8 active:scale-95 transition-transform rounded-full"
          href="/"
          aria-label="Página de inicio"
        >
          <Image
            className="h-8 w-auto aspect-auto transition-all ease-in-out"
            width={27}
            height={40}
            quality={100}
            src="/logo-essentia.webp"
            alt="Logo de Essentia"
          />
        </Link>
        <Sheet>
          <SheetTrigger>
            <MenuButton profileData={profileData} />
          </SheetTrigger>
          <SheetContent
            aria-labelledby="dialog-description"
            side="right"
            hideCloseButton
            className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
          >
            <span className="sr-only">
              <SheetTitle>Menú</SheetTitle>
            </span>
            <span id="dialog-description" className="sr-only">
              <SheetDescription>
                Este es el menú móvil donde puedes navegar por las opciones.
              </SheetDescription>
            </span>
            <MobileMenu profileData={profileData} />
          </SheetContent>
        </Sheet>
      </Navbar>
    </>
  );
};

export default MobileHeader;
