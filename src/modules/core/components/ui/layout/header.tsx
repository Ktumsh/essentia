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
      <div role="banner" className="z-[100] fixed top-0 w-full hidden md:block">
        <Navbar
          maxWidth="sm"
          classNames={{
            base: "bg-white/80 dark:bg-base-full-dark-80",
            wrapper: "h-14 justify-center",
          }}
        >
          <NavbarContent justify="center">
            <NavbarLinks pages={pages} />
          </NavbarContent>
        </Navbar>
        <div className="z-40 fixed top-0 left-0">
          <div className="flex items-center justify-center w-full px-4 h-14 gap-5">
            <div className="flex items-center gap-2 shrink-0">
              {essentiaAi && profileData && <SidebarToggle />}
              <Link
                className="relative hidden sm:flex items-center justify-center h-10 shrink-0 active:scale-95 transition-transform rounded-full"
                href="/"
                aria-label="Página de inicio"
              >
                <Image
                  className="h-10 w-auto aspect-auto transition-all ease-in-out"
                  width={40}
                  height={40}
                  quality={100}
                  src="/logo-essentia.webp"
                  alt="Logo de Essentia"
                />
              </Link>
              <Link
                href="/"
                className="hidden xl:block font-grotesk text-base-color dark:text-white/95"
              >
                Essentia®️
              </Link>
            </div>
            <MainSearch isPremium={is_premium} />
          </div>
        </div>
        <div className="z-40 h-14 fixed top-0 right-0">
          <div className="flex justify-center items-center size-full text-sm font-normal text-gray-500 dark:text-base-color-dark-h ">
            {!profileData && (
              <Button
                as={Link}
                href="/login"
                size="sm"
                className="rounded-md text-sm px-5 bg-light-gradient-v2 dark:bg-dark-gradient text-white data-[hover=true]:text-white !duration-150"
              >
                Iniciar sesión
              </Button>
            )}
            <div className="flex items-center justify-center h-full px-6">
              <AvatarDropdown profileData={profileData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
