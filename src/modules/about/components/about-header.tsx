"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { useRef, useMemo } from "react";

import { StarsIcon } from "@/modules/icons/common";
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
    ],
  );

  const vh = typeof window !== "undefined" ? window.innerHeight / 1.4 : 0;
  const { isChanged, isChanging } = useNavbarChange(vh);
  const activeSection = useActiveSection(sections);

  return (
    <header
      ref={headerRef}
      id="header"
      className="static inset-x-0 top-0 z-50 w-full transition-transform duration-300 ease-in-out md:fixed"
    >
      <nav
        id="nav"
        className={cn(
          "z-50 flex items-center justify-between px-5 text-main shadow-md transition-all duration-300 ease-in-out",
          isChanged
            ? "bg-white/50 text-main-h backdrop-blur-2xl"
            : "bg-white sm:mx-5 sm:my-2 sm:rounded-lg",
        )}
      >
        <div
          className={`flex h-16 w-full items-center gap-0 sm:gap-3 ${
            isChanged ? "justify-center md:justify-between" : "justify-between"
          }`}
        >
          <div
            id="nav_links"
            className={`flex whitespace-nowrap font-light text-main transition-opacity duration-150 ${
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
                    "nav_link mr-5 bg-clip-text px-2 font-medium transition-transform duration-100 hover:scale-105 hover:bg-light-gradient hover:text-transparent after:hover:bg-transparent after:hover:bg-light-gradient",
                    activeSection === section.id && "active",
                  )}
                >
                  {section.label}
                </Link>
              ))
            ) : (
              <div className="flex items-center gap-2">
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
                <Link
                  href="/"
                  className="hidden font-grotesk text-main dark:text-white/95 md:block"
                >
                  Essentia
                </Link>
              </div>
            )}
          </div>
          <div
            id="nav_btns"
            className={cn(
              "inline-flex items-center gap-4 font-normal text-main transition-opacity duration-150",
              isChanging || isChanged
                ? "pointer-events-none opacity-0"
                : "opacity-100",
            )}
          >
            {!session && (
              <Link
                href="/login"
                className="inline-flex h-10 min-w-20 items-center justify-center gap-2 border border-gray-200 bg-white px-4 text-main hover:bg-gray-100 hover:opacity-80 dark:border-dark dark:bg-full-dark hover:dark:bg-dark"
              >
                Inicia sesión
              </Link>
            )}
            <Link
              href="/premium"
              className="inline-flex h-10 min-w-20 items-center justify-center gap-2 rounded-md bg-light-gradient-v2 px-4 text-sm text-white !duration-150 hover:text-white hover:opacity-80 dark:bg-dark-gradient"
            >
              <StarsIcon
                aria-hidden="true"
                className="size-4 focus:outline-none [&_*]:fill-white"
              />
              Hazte premium
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AboutHeader;
