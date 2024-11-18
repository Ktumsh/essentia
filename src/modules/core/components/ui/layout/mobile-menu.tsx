"use client";

import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FC, useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { MOBILE_MENU_CONTENT_ID } from "@/consts/mobile-menu";
import { HelpIcon, LogoutIcon } from "@/modules/icons/action";
import { StarsIcon } from "@/modules/icons/common";
import { AccountFillIcon, PricingFillIcon } from "@/modules/icons/interface";
import {
  AvatarIcon,
  SettingsIcon,
  ThemeIcon,
} from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import { ThemeToggle } from "../buttons/theme-toggle";

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
        className="flex h-full w-screen max-w-[300px] flex-col items-center overflow-y-hidden bg-white px-8 dark:bg-full-dark lg:hidden"
      >
        <nav className="size-full">
          <div className="flex size-full max-h-dvh flex-col justify-between">
            <div className="flex size-full flex-col overflow-y-hidden text-main-h dark:text-main-dark-h">
              <div className="flex h-auto w-full border-b-1 border-gray-200 py-5 dark:border-dark">
                {profileData && (
                  <div className="relative inline-flex w-full items-start gap-2">
                    {profile_image ? (
                      <Link
                        href={`/profile/${username}`}
                        aria-label="Perfil de usuario"
                        className="size-12 overflow-hidden rounded-full border-2 border-gray-200 bg-white dark:border-dark dark:bg-full-dark"
                      >
                        <Image
                          className="rounded-full object-cover object-center"
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
                        size="sm"
                        icon={<AvatarIcon />}
                        classNames={{
                          icon: "text-main-m dark:text-main-dark-m size-[80%]",
                          base: "bg-gray-300 dark:bg-gray-600",
                          name: "font-medium text-main-h dark:text-main-dark-h",
                        }}
                      />
                    )}
                    <Link
                      className="inline-flex flex-col items-start transition-colors duration-100 active:bg-gray-200 dark:active:bg-dark"
                      href={`/profile/${username}`}
                    >
                      <span className="font-medium capitalize text-inherit transition-none">
                        {`${first_name} ${last_name}`}
                      </span>
                      <span className="text-sm text-main-m transition-none dark:text-main-dark-l">
                        @{username}
                      </span>
                      {is_premium && (
                        <div className="absolute right-0 top-1/2 mr-2 -translate-y-1/2 p-1">
                          <StarsIcon
                            aria-hidden="true"
                            className="stars-icon v2 size-6 focus:outline-none"
                          />
                        </div>
                      )}
                    </Link>
                  </div>
                )}
                {!profileData && (
                  <Link
                    href="/login"
                    className="box-border inline-flex h-8 w-full min-w-16 select-none appearance-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md bg-light-gradient-v2 px-5 text-sm font-normal text-white subpixel-antialiased tap-highlight-transparent transition-transform-colors-opacity active:scale-[0.97] motion-reduce:transition-none dark:bg-dark-gradient"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
              <div className="relative size-full overflow-y-scroll scrollbar-hide">
                <div className="flex h-full flex-col justify-between py-5">
                  <div role="group">
                    <div className="group flex">
                      <div className="justify-between bg-transparent px-0 text-base font-medium text-main-h data-[pressed=true]:scale-100 data-[hover=true]:bg-transparent dark:text-main-dark-h">
                        Recursos
                      </div>
                    </div>
                    <div className="overflow-hidden pt-3 transition-all">
                      <div
                        aria-label="Recursos"
                        className="flex w-full flex-col gap-3 outline-none"
                      >
                        {resourceLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.link}
                            className={cn(
                              "inline-flex items-center gap-2 px-0 py-1.5 text-sm",
                              currentPath === link.link
                                ? "text-bittersweet-400 dark:text-cerise-red-400"
                                : "text-main-h dark:text-main-dark-h",
                            )}
                          >
                            <link.activeIcon
                              className={`size-5 transition-colors ${
                                currentPath === link.link
                                  ? "text-bittersweet-400 dark:text-cerise-red-400"
                                  : "text-main-h dark:text-main-dark"
                              }`}
                            />
                            <span>{link.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div role="group">
                    <footer className="flex flex-col justify-end gap-3 text-main-m dark:text-main-dark-m">
                      <Link
                        className="relative flex w-full items-center py-1.5 text-sm"
                        href="/account"
                      >
                        <AccountFillIcon className="mr-3 size-3.5" />
                        Cuenta
                      </Link>
                      <Link
                        className="relative flex w-full items-center py-1.5 text-sm"
                        href="/premium"
                      >
                        <PricingFillIcon className="mr-3 size-3.5" />
                        Premium
                      </Link>
                      <Link
                        className="relative flex w-full items-center py-1.5 text-sm"
                        href=""
                      >
                        <SettingsIcon className="mr-3 size-3.5" />
                        Configuración
                      </Link>
                      <Link
                        className="relative flex w-full items-center py-1.5 text-sm"
                        href=""
                      >
                        <HelpIcon className="mr-3 size-3.5" />
                        Centro de ayuda
                      </Link>
                      <div className="flex w-full items-center justify-between py-1.5">
                        <div className="flex flex-row items-center">
                          <ThemeIcon className="mr-3 size-3.5" />
                          <span className="text-sm">Tema</span>
                        </div>
                        <ThemeToggle className="!size-8" />
                      </div>
                      {profileData ? (
                        <button
                          id="logout"
                          className="relative flex w-full items-center py-1.5 text-sm font-medium text-bittersweet-400 dark:text-cerise-red-600"
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
