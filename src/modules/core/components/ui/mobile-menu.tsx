"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

import {
  Avatar,
  Button,
  Divider,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { ThemeToggle } from "../theme-toggle";
import { MOBILE_MENU_CONTENT_ID } from "@/consts/mobile-menu";
import { siteConfig } from "@/config/site";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { cn, getFirstNameAndLastName, usernameOrEmail } from "@/utils/common";
import {
  AvatarIcon,
  SettingsIcon,
  ThemeIcon,
} from "@/modules/icons/miscellaneus";
import { Chevron } from "@/modules/icons/navigation";
import { CommunityIcon } from "@/modules/icons/interface";
import { HelpIcon, LogoutIcon } from "@/modules/icons/action";
import { UserProfileData } from "@/types/session";

interface MobileMenuProps {
  profileData: UserProfileData | null;
}

const MobileMenu: FC<MobileMenuProps> = ({ profileData }) => {
  const [currentPath, setCurrentPath] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { first_name, last_name, username, image } = profileData || {};

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
                <div className="inline-flex flex-col items-start justify-center gap-2">
                  {image ? (
                    <Link
                      href={`/profile/${username}`}
                      aria-label="Perfil de usuario"
                    >
                      <Image
                        className="size-8 rounded-full"
                        width={96}
                        height={96}
                        src={image}
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
                      {username}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="relative size-full overflow-y-scroll scrollbar-hide">
                <div className="flex flex-col justify-between h-full">
                  <div role="group">
                    <div className="group flex mt-5">
                      <Button
                        variant="light"
                        radius="none"
                        disableRipple
                        fullWidth
                        endContent={
                          <Chevron
                            className={cn(
                              isOpen ? "rotate-90" : "-rotate-90",
                              "size-6 transition-transform"
                            )}
                          />
                        }
                        className={cn(
                          isOpen
                            ? "text-black dark:text-white"
                            : "text-base-color-h dark:text-base-color-dark-h",
                          "justify-between px-0 text-base font-medium bg-transparent data-[hover=true]:bg-transparent data-[pressed=true]:scale-100"
                        )}
                        onPress={() => setIsOpen(!isOpen)}
                      >
                        Recursos
                      </Button>
                    </div>
                    <div
                      className={cn(
                        isOpen ? "h-[268px] opacity-100" : "h-0 opacity-0",
                        "overflow-hidden transition-all"
                      )}
                    >
                      <Listbox
                        aria-label="Recursos"
                        classNames={{
                          base: "px-0 pt-3",
                          list: "gap-3",
                        }}
                      >
                        {resourceLinks.map((link) => (
                          <ListboxItem
                            key={link.name}
                            href={link.link}
                            variant="light"
                            startContent={
                              <link.icon
                                className={`size-5 transition-colors ${
                                  currentPath === link.link
                                    ? "text-bittersweet-400 dark:text-cerise-red-400"
                                    : "text-base-color-h dark:text-base-color-dark"
                                }`}
                              />
                            }
                            classNames={{
                              base: "px-0",
                            }}
                            className={
                              currentPath === link.link
                                ? "text-bittersweet-400 dark:text-cerise-red-400"
                                : "text-base-color-h dark:text-base-color-dark-h"
                            }
                          >
                            {link.name}
                          </ListboxItem>
                        ))}
                      </Listbox>
                    </div>
                    <Divider className="mt-5 bg-gray-200 dark:bg-base-dark" />
                    <div className="group mt-5">
                      <Button
                        as={Link}
                        href="/comunidad"
                        aria-label="Comunidad"
                        variant="solid"
                        radius="none"
                        startContent={<CommunityIcon className="size-5" />}
                        className="justify-start px-0 text-base font-medium bg-transparent text-base-color-h dark:text-base-color-dark-h"
                      >
                        Comunidad
                      </Button>
                    </div>
                  </div>

                  <div role="group">
                    <footer className="flex flex-col justify-end text-base-color-m dark:text-base-color-dark-m">
                      <Link
                        className="relative flex items-center w-full py-5 text-sm"
                        href=""
                      >
                        <SettingsIcon className="mr-3 size-[14px]" />
                        Configuración
                      </Link>
                      <Link
                        className="relative flex items-center w-full py-5 text-sm"
                        href=""
                      >
                        <HelpIcon className="mr-3 size-[14px]" />
                        Centro de Ayuda
                      </Link>
                      <div className="w-full flex items-center justify-between py-3">
                        <div className="flex flex-row items-center">
                          <ThemeIcon className="mr-3 size-[14px]" />
                          <span className="text-sm">Tema</span>
                        </div>
                        <ThemeToggle className="!size-8" />
                      </div>
                      {profileData ? (
                        <button
                          id="logout"
                          className="relative flex items-center w-full py-5 text-sm font-medium text-bittersweet-400 dark:text-cerise-red-600"
                          onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                          <LogoutIcon className="mr-3 size-[14px]" />
                          Cerrar sesión
                        </button>
                      ) : null}
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
