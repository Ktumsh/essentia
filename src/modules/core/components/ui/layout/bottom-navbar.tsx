"use client";

import { siteConfig } from "@/config/site";

import { Button, Navbar } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import MainSearch from "./main-search";
import Link from "next/link";

import { Fragment } from "react";
import { cn } from "@/utils/common";
import { formatPathName } from "@/utils/format";

const BottomNav = () => {
  const pathname = usePathname();

  const normalizedPath = formatPathName(pathname);

  const essentiaAi = pathname.startsWith("/essentia-ai");

  const pages = siteConfig.navLinks.map((page) => ({
    ...page,
    active:
      normalizedPath === page.href ||
      (page.href === "/adicionales" &&
        normalizedPath.startsWith("/adicionales")) ||
      (page.href === "/essentia-ai" && essentiaAi),
  }));

  const navItems = [
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
  ];

  return (
    <Navbar
      classNames={{
        base: "fixed md:hidden bottom-0 top-auto bg-white dark:bg-base-full-dark z-50",
        wrapper: "h-14 justify-center gap-0 px-0",
      }}
    >
      {navItems.map((item, index) => (
        <Fragment key={index}>
          {item.isSearch ? (
            <li className="relative flex items-center justify-center size-full">
              <MainSearch />
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
                  "!h-full after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-[3px] after:bg-current after:scale-x-0 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-full-dark-50 text-gray-500 dark:text-gray-400 dark:data-[hover=true]:text-bittersweet-400 dark:dark:data-[hover=true]:text-cerise-red-600 min-w-0",
                  item.active
                    ? "current-page rounded-t-none text-bittersweet-400 dark:text-cerise-red-600 after:bg-bittersweet-400 dark:after:bg-cerise-red-600 after:scale-x-100 data-[hover=true]:bg-transparent dark:data-[hover=true]:bg-transparent"
                    : "not-current"
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
            </li>
          )}
        </Fragment>
      ))}
    </Navbar>
  );
};

export default BottomNav;
