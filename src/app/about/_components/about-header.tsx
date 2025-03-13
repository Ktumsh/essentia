"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useRef, useMemo, useState, RefObject } from "react";

import { Button } from "@/components/kit/button";
import { StarsIcon } from "@/components/ui/icons/common";
import Logo from "@/components/ui/layout/logo";
import { cn } from "@/lib/utils";

import useActiveSection, { Section } from "../_hooks/use-active-section";
import { useNavbarChange } from "../_hooks/use-navbar-change";
import useSmoothScroll from "../_hooks/use-smooth-scroll";

interface AboutHeaderProps {
  session: Session | null;
  isPremium: boolean | null;
  scrollContainerRef: RefObject<HTMLElement | null>;
}

const AboutHeader = ({
  session,
  isPremium,
  scrollContainerRef,
}: AboutHeaderProps) => {
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);

  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [autoScrollTarget, setAutoScrollTarget] = useState("");

  const { isChanged, isChanging } = useNavbarChange({ scrollContainerRef });

  const scrollToNuestroMetodo = useSmoothScroll("#nuestro_metodo");
  const scrollToNuestrosRecursos = useSmoothScroll("#nuestros_recursos");
  const scrollToEssentiaAI = useSmoothScroll("#essentia_ai");
  const scrollToProgreso = useSmoothScroll("#progreso");
  const scrollToHistoriasYLogros = useSmoothScroll("#historias_y_logros");
  const scrollToTodoYMas = useSmoothScroll("#premium");

  const sections: Section[] = useMemo(
    () => [
      { id: "nuestro_metodo", label: "Nuestro método" },
      { id: "nuestros_recursos", label: "Nuestros recursos" },
      { id: "essentia_ai", label: "Essentia AI" },
      { id: "progreso", label: "Progreso" },
      { id: "historias_y_logros", label: "Historias y logros" },
      { id: "premium", label: "Premium" },
    ],
    [],
  );

  const sectionScrollMap: Record<string, () => void> = {
    nuestro_metodo: scrollToNuestroMetodo,
    nuestros_recursos: scrollToNuestrosRecursos,
    essentia_ai: scrollToEssentiaAI,
    progreso: scrollToProgreso,
    historias_y_logros: scrollToHistoriasYLogros,
    premium: scrollToTodoYMas,
  };

  const onAutoScrollEnd = () => {
    setIsAutoScrolling(false);
    setAutoScrollTarget("");
  };

  const activeSection = useActiveSection(
    sections,
    isAutoScrolling,
    autoScrollTarget,
    onAutoScrollEnd,
  );

  const handleSectionClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAutoScrolling(true);
    setAutoScrollTarget(id);
    sectionScrollMap[id]?.();
  };

  const contentVariants = {
    entering: { opacity: 0, transition: { duration: 0.15 } },
    visible: { opacity: 1, transition: { duration: 0.15 } },
  };

  return (
    <header
      ref={headerRef}
      className={cn("sticky inset-x-0 top-0 z-50 flex md:fixed")}
    >
      <nav
        id="nav"
        className={cn(
          "text-foreground z-50 mx-auto flex max-w-full flex-1 items-center justify-center bg-white px-3 transition-all md:max-w-7xl md:bg-transparent",
          isChanged && "mt-4 bg-white! px-28 md:rounded-full",
        )}
      >
        <div className="flex h-14 w-full items-center gap-0 sm:gap-3">
          <motion.div
            className="text-foreground flex flex-1 justify-between gap-5 whitespace-nowrap"
            variants={contentVariants}
            initial={isChanging ? "entering" : "visible"}
            animate={isChanging ? "entering" : "visible"}
          >
            {isChanged ? (
              sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={handleSectionClick(section.id)}
                  className={cn(
                    "transition-transform-opacity after:bg-primary relative after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:rounded-full after:transition-transform after:content-[''] hover:opacity-80",
                    {
                      "after:scale-x-100": activeSection === section.id,
                    },
                  )}
                >
                  {section.label}
                </Link>
              ))
            ) : (
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
                  <Logo />
                </div>
                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-semibold">Essentia</span>
                </div>
              </Link>
            )}
          </motion.div>

          <motion.div
            id="nav_btns"
            className={cn(
              "text-foreground inline-flex items-center gap-4 font-normal",
              isChanged && "hidden",
            )}
            variants={contentVariants}
            initial={isChanging ? "entering" : "visible"}
            animate={isChanging ? "entering" : "visible"}
          >
            {!session && (
              <Button variant="outline" onClick={() => router.push("/signup")}>
                Regístrate
              </Button>
            )}
            {session && !isPremium && (
              <Button
                variant="gradient"
                onClick={() => router.push("/pricing")}
              >
                <StarsIcon className="size-4 **:fill-white focus:outline-hidden" />
                Hazte premium
              </Button>
            )}
            {session && isPremium && (
              <Button variant="outline" onClick={() => router.push("/")}>
                Volver al inicio
              </Button>
            )}
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

export default AboutHeader;
