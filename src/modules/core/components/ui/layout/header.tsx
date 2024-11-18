"use client";

import { Button, Navbar, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import AppSidebarToggle from "@/modules/core/components/ui/sidebar/app-sidebar-toggle";
import { UserProfileData } from "@/types/session";
import { formatPathName } from "@/utils/format";

import NavbarLinks from "./navbar-links";

const Header = ({ profileData }: { profileData: UserProfileData | null }) => {
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

  return (
    <>
      <div role="banner" className="sticky top-0 z-50 hidden w-full md:block">
        <Navbar
          maxWidth="sm"
          position="sticky"
          classNames={{
            base: "bg-white/80 dark:bg-full-dark/80",
            wrapper: "h-14 justify-center",
          }}
        >
          <NavbarContent justify="center">
            <NavbarLinks pages={pages} />
          </NavbarContent>
        </Navbar>
        <div className="absolute left-0 top-0 z-40">
          <div className="flex h-14 w-full items-center justify-center gap-5 px-4">
            <AppSidebarToggle />
          </div>
        </div>
        <div className="absolute right-0 top-0 z-40 h-14 px-6">
          <div className="flex size-full items-center justify-center text-sm font-normal text-gray-500 dark:text-main-dark-h">
            {!profileData && (
              <Button
                as={Link}
                href="/login"
                size="sm"
                className="rounded-md bg-light-gradient-v2 px-5 text-sm text-white !duration-150 data-[hover=true]:text-white dark:bg-dark-gradient"
              >
                Inicia sesión
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
