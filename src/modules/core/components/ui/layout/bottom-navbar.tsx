"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";

import { siteConfig } from "@/config/site";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";
import { formatPathName } from "@/utils/format";

import MainSearch from "./main-search";

interface BottomNavProps {
  user: UserProfileData | null;
}

const BottomNav = ({ user }: BottomNavProps) => {
  const pathname = usePathname();

  const normalizedPath = formatPathName(pathname);
  const isEssentiaAi = pathname.startsWith("/essentia-ai");
  const isAdditionals = pathname.startsWith("/adicionales");

  const { isPremium } = user || {};

  const pages = siteConfig.navLinks.map((page) => ({
    ...page,
    active:
      normalizedPath === page.href ||
      (page.href === "/adicionales" && isAdditionals) ||
      (page.href === "/essentia-ai" && isEssentiaAi),
  }));

  const navItems = useMemo(
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
    <nav className="fixed inset-x-0 bottom-0 top-auto z-50 flex h-16 justify-center gap-0 overflow-hidden rounded-t-3xl bg-white px-0 shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.2),_0px_1px_6px_0px_rgba(0,_0,_0,_0.05)] dark:bg-full-dark dark:shadow-[0px_2px_6px_0px_var(--background-accent-dark),_0px_1px_8px_0px_rgba(255,_255,_255,_0.02)] md:hidden">
      {navItems.map((item, index) => (
        <Fragment key={index}>
          {item.isSearch ? (
            <li className="relative flex size-full items-center justify-center">
              <MainSearch isPremium={isPremium!} />
            </li>
          ) : (
            <li className="relative flex size-full items-center justify-center">
              <Link
                href={item.href}
                id={`navbar_link_${index}`}
                className={cn(
                  "flex size-full min-w-0 items-center justify-center text-main-m active:bg-gray-100 active:transition-colors dark:text-main-dark-h active:dark:bg-dark/50",
                  item.active &&
                    "rounded-t-none text-bittersweet-400 dark:text-cerise-red-600",
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
                <hr className="absolute bottom-3 h-0.5 w-1.5 rounded-full border-none bg-bittersweet-400 transition-all duration-300 ease-in-out dark:bg-cerise-red-600" />
              )}
            </li>
          )}
        </Fragment>
      ))}
    </nav>
  );
};

export default BottomNav;
