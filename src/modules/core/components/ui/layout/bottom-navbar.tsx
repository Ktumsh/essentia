"use client";

import { Button, Navbar } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Fragment, useMemo } from "react";

import { siteConfig } from "@/config/site";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";
import { formatPathName } from "@/utils/format";

import MainSearch from "./main-search";

interface BottomNavProps {
  profileData: UserProfileData | null;
}

const BottomNav: FC<BottomNavProps> = ({ profileData }) => {
  const pathname = usePathname();

  const normalizedPath = formatPathName(pathname);
  const essentiaAi = pathname.startsWith("/essentia-ai");

  const { is_premium } = profileData || {};

  const pages = siteConfig.navLinks.map((page) => ({
    ...page,
    active:
      normalizedPath === page.href ||
      (page.href === "/adicionales" &&
        normalizedPath.startsWith("/adicionales")) ||
      (page.href === "/essentia-ai" && essentiaAi),
  }));

  const navItems = useMemo(
    () => [
      ...pages.slice(0, 1),
      {
        name: "Search",
        href: "#",
        icon: () => null,
        fillIcon: () => null,
        active: false,
        isSearch: true,
      },
      ...pages.slice(1),
    ],
    [pages]
  );

  return (
    <Navbar
      classNames={{
        base: "fixed md:hidden bottom-0 top-auto bg-white dark:bg-base-full-dark z-50 rounded-t-3xl overflow-hidden",
        wrapper: "h-16 justify-center gap-0 px-0",
      }}
    >
      {navItems.map((item, index) => (
        <Fragment key={index}>
          {item.isSearch ? (
            <li className="relative flex items-center justify-center size-full">
              <MainSearch isPremium={is_premium} />
            </li>
          ) : (
            <li className="relative flex items-center justify-center size-full">
              <Button
                as={Link}
                href={item.href}
                id={`navbar_link_${index}`}
                fullWidth
                radius="none"
                variant="light"
                color="danger"
                className={cn(
                  "!h-full text-gray-500 dark:text-gray-400 data-[hover=true]:text-bittersweet-400 dark:dark:data-[hover=true]:text-cerise-red-600 min-w-0",
                  item.active &&
                    "rounded-t-none text-bittersweet-400 dark:text-cerise-red-600 bg-transparent dark:bg-transparent"
                )}
              >
                {item.active ? (
                  item.fillIcon ? (
                    <item.fillIcon className="size-6" aria-hidden="true" />
                  ) : null
                ) : item.icon ? (
                  <item.icon className="size-6" aria-hidden="true" />
                ) : null}
              </Button>
              {item.active && (
                <hr className="absolute bottom-3 h-0.5 w-1.5 rounded-full bg-bittersweet-400 dark:bg-cerise-red-600 transition-all duration-300 ease-in-out border-none" />
              )}
            </li>
          )}
        </Fragment>
      ))}
    </Navbar>
  );
};

export default BottomNav;
