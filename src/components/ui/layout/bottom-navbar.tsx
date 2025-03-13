"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";

import { Button } from "@/components/kit/button";
import { navConfig } from "@/config/nav.config";
import { cn } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";
import { IconSvgProps } from "@/types/common";
import { formatPathName } from "@/utils/format";

import MainSearch from "./main-search";

import type { JSX } from "react/jsx-runtime";

type NavItems = {
  active: boolean;
  name: string;
  href: string;
  icon: (props: IconSvgProps) => JSX.Element | null;
  activeIcon: (props: IconSvgProps) => JSX.Element | null;
  isSearch?: boolean;
};

interface BottomNavProps {
  user: UserProfileData | null;
}

const BottomNav = ({ user }: BottomNavProps) => {
  const pathname = usePathname();

  const normalizedPath = formatPathName(pathname);
  const isEssentiaAi = pathname.startsWith("/essentia-ai");
  const isAdditionals = pathname.startsWith("/adicionales");

  const { isPremium } = user || {};

  const pages = navConfig.navLinks.map((page) => ({
    ...page,
    active:
      normalizedPath === page.href ||
      (page.href === "/adicionales" && isAdditionals) ||
      (page.href === "/essentia-ai" && isEssentiaAi),
  }));

  const navItems: NavItems[] = useMemo(
    () => [
      ...pages.slice(0, 1),
      {
        name: "Search",
        href: "#",
        icon: () => null,
        activeIcon: () => null,
        active: false,
        isSearch: true,
      },
      ...pages.slice(1),
    ],
    [pages],
  );

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-70 flex h-16 justify-center gap-0 overflow-hidden rounded-t-3xl px-0 shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.2),_0px_1px_6px_0px_rgba(0,_0,_0,_0.05)] md:hidden dark:shadow-[0px_2px_6px_0px_var(--color-alternative),_0px_1px_8px_0px_rgba(255,_255,_255,_0.02)]">
      {navItems.map((item, index) => (
        <Fragment key={index}>
          {item.isSearch ? (
            <li className="relative flex size-full items-center justify-center">
              <MainSearch isPremium={isPremium!}>
                <Button
                  aria-label="Busca rápida"
                  variant="ghost"
                  fullWidth
                  className="text-muted-foreground dark:active:bg-accent/50! inline-flex h-full! min-w-0 p-0 transition-none after:absolute after:top-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-current after:content-[''] hover:bg-transparent! active:bg-slate-100! active:transition-colors md:hidden"
                >
                  <span className="sr-only">Busca rápida</span>
                  <Search className="size-6!" aria-hidden="true" />
                </Button>
              </MainSearch>
            </li>
          ) : (
            <li className="relative flex size-full items-center justify-center">
              <Link
                href={item.href}
                id={`navbar_link_${index}`}
                className={cn(
                  "text-muted-foreground dark:active:bg-accent/50 active:bg-accent flex size-full min-w-0 items-center justify-center active:transition-colors",
                  item.active && "text-primary rounded-t-none",
                )}
              >
                {item.active ? (
                  item.activeIcon ? (
                    <item.activeIcon className="size-6" aria-hidden="true" />
                  ) : null
                ) : item.icon ? (
                  <item.icon className="size-6" aria-hidden="true" />
                ) : null}
              </Link>
              {item.active && (
                <hr className="bg-primary absolute bottom-3 h-0.5 w-1.5 rounded-full border-none transition-all duration-300 ease-in-out" />
              )}
            </li>
          )}
        </Fragment>
      ))}
    </nav>
  );
};

export default BottomNav;
