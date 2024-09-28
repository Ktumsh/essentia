"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

import { Avatar, Button, Listbox, ListboxItem } from "@nextui-org/react";
import { ThemeToggle } from "../buttons/theme-toggle";
import { MOBILE_MENU_CONTENT_ID } from "@/consts/mobile-menu";
import { siteConfig } from "@/config/site";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  AvatarIcon,
  SettingsIcon,
  ThemeIcon,
} from "@/modules/icons/miscellaneus";
import { HelpIcon, LogoutIcon } from "@/modules/icons/action";
import { UserProfileData } from "@/types/session";
import Footer from "./footer";
import { AccountFillIcon, PricingFillIcon } from "@/modules/icons/interface";
import { usePremium } from "@/modules/core/hooks/use-premium-status";
import { StarsIcon } from "@/modules/icons/common";
import { cn } from "@/utils/common";

interface MobileMenuProps {
  profileData: UserProfileData | null;
}

const MobileMenu: FC<MobileMenuProps> = ({ profileData }) => {
  const [currentPath, setCurrentPath] = useState("");
  const { first_name, last_name, username, profile_image, is_premium } =
    profileData || {};

  const resourceLinks = siteConfig.asideMenuLinks;

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <>
      {/* Mobile Menu */}
      <div
        id={MOBILE_MENU_CONTENT_ID}
        role="menu"
        className="flex w-screen max-w-[300px] h-full flex-col items-center bg-white dark:bg-base-full-dark lg:hidden px-8 overflow-y-hidden"
      >
        <nav className="size-full">
          <div className="flex flex-col justify-between size-full max-h-dvh">
            <div className="flex flex-col size-full text-base-color-h dark:text-base-color-dark-h overflow-y-hidden">
              <div className="flex w-full h-auto py-5 border-b-1 border-gray-200 dark:border-base-dark">
                <div className="relative inline-flex items-start gap-2 w-full">
                  {profileData ? (
                    <>
                      {profile_image ? (
                        <Link
                          href={`/profile/${username}`}
                          aria-label="Perfil de usuario"
                          className="size-12 bg-white dark:bg-base-full-dark border-2 border-gray-200 dark:border-base-dark rounded-full overflow-hidden"
                        >
                          <Image
                            className="object-cover object-center rounded-full"
                            width={44}
                            height={44}
                            src={profile_image}
                            alt="Avatar del usuario"
                          />
                        </Link>
                      ) : (
                        <Avatar
                          as={Link}
                          href={`/profile/${username}`}
                          showFallback
                          src="https://images.unsplash.com/broken"
                          size="sm"
                          icon={<AvatarIcon />}
                          classNames={{
                            icon: "text-base-color-m dark:text-base-color-dark-m size-[80%]",
                            base: "bg-gray-300 dark:bg-gray-600",
                            name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                          }}
                        />
                      )}
                      <Link
                        className="inline-flex flex-col items-start active:bg-gray-200 dark:active:bg-base-dark transition-colors duration-100"
                        href={`/profile/${username}`}
                      >
                        <span className="font-medium text-inherit transition-none capitalize">
                          {`${first_name} ${last_name}`}
                        </span>
                        <span className="text-sm text-base-color-m dark:text-base-color-dark-d transition-none">
                          @{username}
                        </span>
                        {is_premium && (
                          <div className="absolute top-1/2 -translate-y-1/2 right-0 p-1 mr-2">
                            <StarsIcon
                              aria-hidden="true"
                              className="size-6 stars-icon v2 focus:outline-none"
                            />
                          </div>
                        )}
                      </Link>
                    </>
                  ) : (
                    <Button
                      as={Link}
                      href="/login"
                      size="sm"
                      fullWidth
                      className="rounded-md text-sm px-5 bg-light-gradient-v2 dark:bg-dark-gradient text-white data-[hover=true]:text-white !duration-150"
                    >
                      Iniciar sesión
                    </Button>
                  )}
                </div>
              </div>
              <div className="relative size-full overflow-y-scroll scrollbar-hide">
                <div className="flex flex-col justify-between h-full py-5">
                  <div role="group">
                    <div className="group flex">
                      <div className="text-base-color-h dark:text-base-color-dark-h justify-between px-0 text-base font-medium bg-transparent data-[hover=true]:bg-transparent data-[pressed=true]:scale-100">
                        Recursos
                      </div>
                    </div>
                    <div className="overflow-hidden transition-all pt-3">
                      <div
                        aria-label="Recursos"
                        className="w-full flex flex-col outline-none gap-3"
                      >
                        {resourceLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.link}
                            className={cn(
                              "inline-flex gap-2 items-center text-sm px-0 py-1.5",
                              currentPath === link.link
                                ? "text-bittersweet-400 dark:text-cerise-red-400"
                                : "text-base-color-h dark:text-base-color-dark-h"
                            )}
                          >
                            <link.icon
                              className={`size-5 transition-colors ${
                                currentPath === link.link
                                  ? "text-bittersweet-400 dark:text-cerise-red-400"
                                  : "text-base-color-h dark:text-base-color-dark"
                              }`}
                            />
                            <span>{link.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div role="group">
                    <footer className="flex flex-col justify-end gap-3 text-base-color-m dark:text-base-color-dark-m">
                      <Link
                        className="relative flex items-center w-full py-1.5 text-sm"
                        href="/account"
                      >
                        <AccountFillIcon className="mr-3 size-3.5" />
                        Cuenta
                      </Link>
                      <Link
                        className="relative flex items-center w-full py-1.5 text-sm"
                        href="/premium"
                      >
                        <PricingFillIcon className="mr-3 size-3.5" />
                        Premium
                      </Link>
                      <Link
                        className="relative flex items-center w-full py-1.5 text-sm"
                        href=""
                      >
                        <SettingsIcon className="mr-3 size-3.5" />
                        Configuración
                      </Link>
                      <Link
                        className="relative flex items-center w-full py-1.5 text-sm"
                        href=""
                      >
                        <HelpIcon className="mr-3 size-3.5" />
                        Centro de ayuda
                      </Link>
                      <div className="w-full flex items-center justify-between py-1.5">
                        <div className="flex flex-row items-center">
                          <ThemeIcon className="mr-3 size-3.5" />
                          <span className="text-sm">Tema</span>
                        </div>
                        <ThemeToggle className="!size-8" />
                      </div>
                      {profileData ? (
                        <button
                          id="logout"
                          className="relative flex items-center w-full py-1.5 text-sm font-medium text-bittersweet-400 dark:text-cerise-red-600"
                          onClick={() => signOut({ callbackUrl: "/logout" })}
                        >
                          <LogoutIcon className="mr-3 size-3.5" />
                          Cerrar sesión
                        </button>
                      ) : null}
                      {/* <div className="pb-5">
                        <Footer isMobile />
                      </div> */}
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
