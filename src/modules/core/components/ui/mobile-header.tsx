"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import MenuButton from "./menu-button";
import MobileMenu from "./mobile-menu";
import { useSwipeable } from "react-swipeable";
import { usePathname } from "next/navigation";
import SidebarMobile from "@/modules/chatbot/componentes/sidebar-mobile";
import ChatHistory from "@/modules/chatbot/componentes/chat-history";

interface MobileHeaderProps {
  session: any;
}

const MobileHeader = ({ session }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const essentiaAi = pathname.startsWith("/essentia-ai");

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      document.body.classList.toggle("overflow-hidden", newState);
      return newState;
    });
  }, []);

  const handleSwipedLeft = useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      document.body.classList.add("overflow-hidden");
    }
  }, [isMenuOpen]);

  const handleSwipedRight = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const bodyElement = document.body;

    const handleSwipe = (event: Event) => {
      if (event instanceof TouchEvent || event instanceof MouseEvent) {
        swipeHandlers.ref(bodyElement);
      }
    };

    bodyElement.addEventListener("touchstart", handleSwipe);
    bodyElement.addEventListener("mousedown", handleSwipe);

    return () => {
      bodyElement.removeEventListener("touchstart", handleSwipe);
      bodyElement.removeEventListener("mousedown", handleSwipe);
    };
  }, [swipeHandlers]);

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
          <>
            <SidebarMobile>
              <ChatHistory userId={session?.user.id} />
            </SidebarMobile>
          </>
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
        <MenuButton
          sessionImage={session?.user?.image}
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </Navbar>
      <MobileMenu isMenuOpen={isMenuOpen} session={session} />
      <div
        data-overlay-container={isMenuOpen}
        aria-hidden={true}
        onClick={() => toggleMenu()}
        className={`fixed inset-0 size-full min-h-dvh bg-black/80 transition-opacity lg:hidden z-[60] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
    </>
  );
};

export default MobileHeader;
