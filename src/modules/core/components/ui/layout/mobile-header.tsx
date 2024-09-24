"use client";

import { FC, useState } from "react"; // Asegúrate de importar useState
import { Navbar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import MenuButton from "../buttons/menu-button";
import MobileMenu from "./mobile-menu";
import { usePathname } from "next/navigation";
import SidebarMobile from "@/modules/chatbot/componentes/sidebar-mobile";
import ChatHistory from "@/modules/chatbot/componentes/chat-history";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetEdgeDragArea,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import { UserProfileData } from "@/types/session";
import { Chat } from "@/types/chat";

interface MobileHeaderProps {
  profileData: UserProfileData | null;
  chats: Chat[];
}

const MobileHeader: FC<MobileHeaderProps> = ({ profileData, chats }) => {
  const pathname = usePathname();

  const essentiaAi = pathname.startsWith("/essentia-ai");

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSheetChatOpen, setIsSheetChatOpen] = useState(false);

  const sheetSide = "right";
  const sheetSideChat = "left";

  return (
    <>
      <SheetEdgeDragArea onOpen={() => setIsSheetOpen(true)} side={sheetSide} />
      {essentiaAi && profileData && (
        <SheetEdgeDragArea
          onOpen={() => setIsSheetChatOpen(true)}
          side={sheetSideChat}
        />
      )}
      <Navbar
        shouldHideOnScroll
        classNames={{
          base: "fixed md:hidden bg-white dark:bg-base-full-dark shadow-md overflow-hidden",
          wrapper: "h-14",
        }}
      >
        {essentiaAi && profileData && (
          <SidebarMobile
            isSheetOpen={isSheetChatOpen}
            setIsSheetOpen={setIsSheetChatOpen}
            sheetSide={sheetSideChat}
          >
            <ChatHistory chats={chats} />
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
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className="focus-visible:outline-none">
            <MenuButton profileData={profileData} />
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
            <MobileMenu profileData={profileData} />
          </SheetContent>
        </Sheet>
      </Navbar>
    </>
  );
};

export default MobileHeader;
