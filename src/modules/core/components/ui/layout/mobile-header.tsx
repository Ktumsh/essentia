"use client";

import { Navbar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";

import ChatHistory from "@/modules/chatbot/components/chat-history";
import SidebarMobile from "@/modules/chatbot/components/sidebar-mobile";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { Chat } from "@/types/chat";
import { UserProfileData } from "@/types/session";
import { fetcher } from "@/utils/common";

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
  profileData: UserProfileData | null;
}

const MobileHeader: FC<MobileHeaderProps> = ({ profileData }) => {
  const windowSize = useWindowSize();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSheetChatOpen, setIsSheetChatOpen] = useState(false);
  const isChat = pathname.startsWith("/essentia-ai");
  const { data: history, mutate } = useSWR<Array<Chat>>(
    profileData && isChat ? "/api/chat/history" : null,
    fetcher,
    {
      fallbackData: [],
    },
  );

  const isMobile = windowSize.width < 768;

  useEffect(() => {
    if (isMobile) {
      mutate();
    }
  }, [isMobile, pathname, mutate]);

  if (!isMobile) return null;

  const essentiaAi = pathname.startsWith("/essentia-ai");
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
        classNames={{
          base: "fixed md:hidden bg-white/80 dark:bg-full-dark/80 overflow-hidden border-b border-gray-200 dark:border-dark",
          wrapper: "h-14",
        }}
      >
        {essentiaAi && profileData && (
          <SidebarMobile
            isSheetOpen={isSheetChatOpen}
            setIsSheetOpen={setIsSheetChatOpen}
            sheetSide={sheetSideChat}
          >
            <ChatHistory chats={history} mutate={mutate} />
          </SidebarMobile>
        )}
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
      <div aria-hidden="true" className="pb-14"></div>
    </>
  );
};

export default MobileHeader;
