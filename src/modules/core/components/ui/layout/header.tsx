"use client";

import { Button, Navbar, NavbarContent } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import SidebarToggle from "@/modules/chatbot/components/sidebar-toggle";
import { UserProfileData } from "@/types/session";
import { formatPathName } from "@/utils/format";

import AvatarDropdown from "./main-dropdown";
import MainSearch from "./main-search";
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

  const { is_premium } = profileData ?? {};

  return (
    <>
      <div role="banner" className="fixed top-0 z-[100] hidden w-full md:block">
        <Navbar
          maxWidth="sm"
          classNames={{
            base: "bg-white/80 dark:bg-full-dark/80",
            wrapper: "h-14 justify-center",
          }}
        >
          <NavbarContent justify="center">
            <NavbarLinks pages={pages} />
          </NavbarContent>
        </Navbar>
        <div className="fixed left-0 top-0 z-40">
          <div className="flex h-14 w-full items-center justify-center gap-5 px-4">
            <div className="flex shrink-0 items-center gap-2">
              {essentiaAi && profileData && <SidebarToggle />}
              <Link
                className="relative hidden h-10 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95 sm:flex"
                href="/"
                aria-label="Página de inicio"
              >
                <Image
                  className="aspect-auto h-10 w-auto transition-all ease-in-out"
                  width={40}
                  height={40}
                  quality={100}
                  src="/logo-essentia.webp"
                  alt="Logo de Essentia"
                />
              </Link>
              <Link
                href="/"
                className="hidden font-grotesk text-main dark:text-white/95 xl:block"
              >
                Essentia®️
              </Link>
            </div>
            <MainSearch isPremium={is_premium} />
          </div>
        </div>
        <div className="fixed right-0 top-0 z-40 h-14">
          <div className="flex size-full items-center justify-center text-sm font-normal text-gray-500 dark:text-main-dark-h">
            {!profileData && (
              <Button
                as={Link}
                href="/login"
                size="sm"
                className="rounded-md bg-light-gradient-v2 px-5 text-sm text-white !duration-150 data-[hover=true]:text-white dark:bg-dark-gradient"
              >
                Iniciar sesión
              </Button>
            )}
            <div className="flex h-full items-center justify-center px-6">
              <AvatarDropdown profileData={profileData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
