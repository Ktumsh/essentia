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
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
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
          base: "fixed md:hidden bg-white dark:bg-base-dark shadow-md overflow-hidden",
          wrapper: "h-14",
        }}
      >
        {essentiaAi && (
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
            className="size-8 dark:hidden origin-center transition-all ease-in-out"
            width={32}
            height={32}
            src="/e-logomark-on-light.webp"
            alt="Logo de Essentia"
          />
          <Image
            className="size-8 hidden dark:block origin-center transition-all ease-in-out"
            width={32}
            height={32}
            src="/e-logomark-on-dark.webp"
            alt="Logo de Essentia"
          />
        </Link>
        <Sheet>
          <SheetTrigger>
            <MenuButton profileData={profileData} />
          </SheetTrigger>
          <SheetContent
            side="right"
            hideCloseButton
            className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
          >
            <MobileMenu profileData={profileData} />
          </SheetContent>
        </Sheet>
      </Navbar>
      {/*       <div
        data-overlay-container={isMenuOpen}
        aria-hidden={true}
        onClick={() => toggleMenu()}
        className={`fixed inset-0 size-full min-h-dvh bg-black/80 transition-opacity lg:hidden z-[60] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div> */}
    </>
  );
};

export default MobileHeader;
