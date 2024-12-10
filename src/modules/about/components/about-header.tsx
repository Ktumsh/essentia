"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Session } from "next-auth";
import { useRef, useMemo } from "react";

import Logo from "@/modules/core/components/ui/utils/logo";
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

  const { isChanged, isChanging } = useNavbarChange();
  const activeSection = useActiveSection(sections);

  const navVariants = {
    default: {
      backgroundColor: "#fff",
      backdropFilter: "blur(0px)",
      boxShadow:
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    changed: {
      backgroundColor: "rgba(255,255,255,0.5)",
      backdropFilter: "blur(40px)",
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    entering: { opacity: 0, transition: { duration: 0.15 } },
    visible: { opacity: 1, transition: { duration: 0.15 } },
  };

  return (
    <motion.header
      ref={headerRef}
      id="header"
      className="sticky inset-x-0 top-0 z-50 w-full md:fixed"
      initial={false}
      animate={isChanged ? { y: 0 } : { y: 0 }}
    >
      <motion.nav
        id="nav"
        className={cn(
          "z-50 flex items-center justify-between px-5 text-main transition-all",
          !isChanged && "sm:mx-5 sm:my-2 sm:rounded-lg",
        )}
        variants={navVariants}
        initial="default"
        animate={isChanged ? "changed" : "default"}
      >
        <div
          className={cn(
            "flex h-14 w-full items-center gap-0 sm:gap-3",
            isChanged ? "justify-center" : "justify-between",
          )}
        >
          <motion.div
            id="nav_links"
            className="flex whitespace-nowrap font-light text-main"
            variants={contentVariants}
            initial={isChanging ? "entering" : "visible"}
            animate={isChanging ? "entering" : "visible"}
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
                    "nav_link mr-5 bg-clip-text px-2 font-medium transition-transform",
                    activeSection === section.id && "active",
                  )}
                >
                  {section.label}
                </Link>
              ))
            ) : (
              <Link href="/" className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#d5d8eb] md:size-10">
                  <Logo className="h-4 md:h-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight md:text-base">
                  <span className="truncate font-semibold">Essentia</span>
                </div>
              </Link>
            )}
          </motion.div>

          <motion.div
            id="nav_btns"
            className={cn(
              "inline-flex items-center gap-4 font-normal text-main",
              isChanged && "hidden",
            )}
            variants={contentVariants}
            initial={isChanging ? "entering" : "visible"}
            animate={isChanging ? "entering" : "visible"}
          >
            {!session && (
              <Link
                href="/login"
                className="inline-flex h-8 min-w-20 items-center justify-center gap-2 border border-gray-200 bg-white px-4 text-main hover:bg-gray-100 hover:opacity-80 dark:border-dark dark:bg-full-dark hover:dark:bg-dark"
              >
                Inicia sesión
              </Link>
            )}
            <Link
              href="/premium"
              className="inline-flex h-8 min-w-20 items-center justify-center gap-2 rounded-md bg-light-gradient-v2 px-4 text-sm text-white !duration-150 hover:text-white hover:opacity-80 dark:bg-dark-gradient md:h-10"
            >
              <StarsIcon
                aria-hidden="true"
                className="size-4 focus:outline-none [&_*]:fill-white"
              />
              Hazte premium
            </Link>
          </motion.div>
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default AboutHeader;
