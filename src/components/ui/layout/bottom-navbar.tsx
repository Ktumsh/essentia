"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";

import { navConfig } from "@/config/nav.config";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn , formatPathName } from "@/utils";


const BottomNav = () => {
  const pathname = usePathname();

  const normalizedPath = formatPathName(pathname);
  const isAeris = pathname.startsWith("/aeris");
  const isAdditionals = pathname.startsWith("/herramientas");
  const { user } = useUserProfile();
  const isPremium = user?.isPremium || false;

  const pages = navConfig.navLinks.map((page) => ({
    ...page,
    active:
      normalizedPath === page.path ||
      (page.path === "/herramientas" && isAdditionals) ||
      (page.path === "/aeris" && isAeris),
  }));

  const navItems = useMemo(() => [...pages], [pages]);

  if (isAeris && isPremium) return null;

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-50 flex h-16 justify-center gap-0 overflow-hidden rounded-t-3xl px-0 shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.2),_0px_1px_6px_0px_rgba(0,_0,_0,_0.05)] md:hidden dark:shadow-[0px_2px_6px_0px_var(--color-alternative),_0px_1px_8px_0px_rgba(255,_255,_255,_0.02)]">
      {navItems.map((item, index) => (
        <Fragment key={index}>
          <li className="relative flex size-full items-center justify-center">
            <Link
              href={item.path}
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
        </Fragment>
      ))}
    </nav>
  );
};

export default BottomNav;
