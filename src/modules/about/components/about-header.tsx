"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useMemo } from "react";

import { StarsIcon } from "@/modules/icons/common";
import { Session } from "@/types/session";
import { cn } from "@/utils/common";

import { useActiveSection } from "../hooks/use-active-section";
import { useNavbarChange } from "../hooks/use-navbar-change";
import useSmoothScroll from "../hooks/use-smooth-scroll";

type Section = {
  id: string;
  label: string;
  scrollTo: () => void;
};

interface AboutHeaderProps {
  session: Session | null;
}

const AboutHeader = ({ session }: AboutHeaderProps) => {
  const headerRef = useRef<HTMLElement | null>(null);

  const scrollToNuestrosRecursos = useSmoothScroll("#nuestros_recursos");
  const scrollToNuestroMetodo = useSmoothScroll("#nuestro_metodo");
  const scrollToEssentiaAI = useSmoothScroll("#essentia_ai");
  const scrollToTodoYMas = useSmoothScroll("#premium");

  const sections: Section[] = useMemo(
    () => [
      {
        id: "nuestros_recursos",
        label: "Nuestros recursos",
        scrollTo: scrollToNuestrosRecursos,
      },
      {
        id: "nuestro_metodo",
        label: "Nuestro método",
        scrollTo: scrollToNuestroMetodo,
      },
      { id: "essentia_ai", label: "Essentia AI", scrollTo: scrollToEssentiaAI },
      { id: "premium", label: "Premium", scrollTo: scrollToTodoYMas },
    ],
    [
      scrollToNuestrosRecursos,
      scrollToNuestroMetodo,
      scrollToEssentiaAI,
      scrollToTodoYMas,
    ]
  );

  const vh = typeof window !== "undefined" ? window.innerHeight / 1.4 : 0;
  const { isChanged, isChanging } = useNavbarChange(vh);
  const activeSection = useActiveSection(sections);

  return (
    <header
      ref={headerRef}
      id="header"
      className="static md:fixed top-0 inset-x-0 w-full z-50 transition-transform duration-300 ease-in-out"
    >
      <nav
        id="nav"
        className={cn(
          "px-5 shadow-md items-center flex justify-between text-main z-50 transition-all duration-300 ease-in-out",
          isChanged
            ? "bg-white/50 backdrop-blur-2xl text-main-h"
            : "bg-white sm:mx-5 sm:my-2 sm:rounded-lg"
        )}
      >
        <div
          className={`flex items-center w-full h-16 gap-0 sm:gap-3 ${
            isChanged ? "justify-center md:justify-between" : "justify-between"
          }`}
        >
          <div
            id="nav_links"
            className={`flex text-main font-light whitespace-nowrap transition-opacity duration-150 ${
              isChanging ? "opacity-0" : "opacity-100"
            }`}
          >
            {isChanged ? (
              sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    section.scrollTo();
                  }}
                  className={cn(
                    "nav_link font-medium hover:text-transparent after:hover:bg-transparent hover:bg-light-gradient bg-clip-text hover:scale-105 after:hover:bg-light-gradient mr-5 px-2 transition-transform duration-100",
                    activeSection === section.id && "active"
                  )}
                >
                  {section.label}
                </Link>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  className="relative size-8 active:scale-95 transition-transform rounded-full"
                  href="/"
                  aria-label="Página de inicio"
                >
                  <Image
                    className="h-8 w-auto aspect-auto transition-all ease-in-out"
                    width={32}
                    height={32}
                    quality={100}
                    src="/logo-essentia.webp"
                    alt="Logo de Essentia"
                    priority
                  />
                </Link>
                <Link
                  href="/"
                  className="hidden md:block font-grotesk text-main dark:text-white/95"
                >
                  Essentia®️
                </Link>
              </div>
            )}
          </div>
          <div
            id="nav_btns"
            className={cn(
              "items-center text-main font-normal inline-flex gap-4 transition-opacity duration-150",
              isChanging || isChanged
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            )}
          >
            {!session && (
              <Button
                as={Link}
                href="/login"
                variant="light"
                radius="sm"
                className="bg-white dark:bg-full-dark data-[hover=true]:bg-gray-100 data-[hover=true]:dark:bg-dark border border-gray-200 dark:border-dark text-main"
              >
                Inicia sesión
              </Button>
            )}
            <Button
              as={Link}
              href="/premium"
              startContent={
                <StarsIcon
                  aria-hidden="true"
                  className="size-4 [&_*]:fill-white focus:outline-none"
                />
              }
              className="rounded-md text-sm bg-light-gradient-v2 dark:bg-dark-gradient text-white data-[hover=true]:text-white !duration-150"
            >
              Hazte premium
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AboutHeader;
