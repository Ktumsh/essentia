"use client";

import { LogOut, Menu, SunMoon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { StarsIcon } from "@/modules/icons/common";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import { ThemeToggle } from "../buttons/theme-toggle";

interface MobileMenuProps {
  user: UserProfileData | null;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const pathname = usePathname();

  const { firstName, lastName, username, profileImage, isPremium } = user || {};

  const resourceLinks = siteConfig.asideMenuLinks;
  const menuFooterLinks = siteConfig.menuFooterLinks;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu strokeWidth={1.5} className="size-6" />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <SheetDescription className="sr-only">
            Este es el menú móvil donde puedes navegar por las opciones.
          </SheetDescription>
          {user ? (
            <Link
              href={`/profile/${username}`}
              className="relative inline-flex w-full items-start gap-2"
            >
              <Avatar className="size-12">
                {profileImage && (
                  <AvatarImage
                    src={profileImage}
                    alt={"Avatar de " + username}
                  />
                )}
                <AvatarFallback>
                  <AvatarIcon />
                </AvatarFallback>
              </Avatar>
              <div className="inline-flex flex-col items-start transition-colors duration-100 active:bg-gray-200 dark:active:bg-dark">
                <span className="font-medium capitalize text-inherit transition-none">
                  {`${firstName} ${lastName}`}
                </span>
                <span className="text-sm text-main-m transition-none dark:text-main-dark-l">
                  @{username}
                </span>
                {isPremium && (
                  <div className="absolute right-0 top-1/2 mr-2 -translate-y-1/2 p-1">
                    <StarsIcon
                      aria-hidden="true"
                      className="stars-icon v2 size-6 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="box-border inline-flex h-8 w-full min-w-16 select-none appearance-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md bg-light-gradient-v2 px-5 text-sm font-normal text-white subpixel-antialiased tap-highlight-transparent transition-transform-colors-opacity active:scale-[0.97] motion-reduce:transition-none dark:bg-dark-gradient"
            >
              Iniciar sesión
            </Link>
          )}
        </SheetHeader>
        <Separator />
        <div role="group" className="flex flex-1 flex-col">
          <div className="group flex">
            <div className="inline-flex h-8 shrink-0 items-center rounded-md text-xs font-medium text-main-m">
              Recursos
            </div>
          </div>
          <div aria-label="Recursos" className="flex w-full flex-col space-y-2">
            {resourceLinks.map((link) => (
              <SheetClose asChild key={link.name}>
                <Link
                  href={link.link}
                  className={cn(
                    "inline-flex items-center gap-2 px-0 py-1.5 text-sm",
                    pathname === link.link
                      ? "text-danger"
                      : "text-main-h dark:text-main-dark-h",
                  )}
                >
                  <link.activeIcon
                    className={`size-4 transition-colors ${
                      pathname === link.link
                        ? "text-danger"
                        : "text-main-h dark:text-main-dark"
                    }`}
                  />
                  <span>{link.name}</span>
                </Link>
              </SheetClose>
            ))}
          </div>
        </div>
        <SheetFooter className="text-sm">
          {menuFooterLinks.map((link) => (
            <SheetClose asChild key={link.name}>
              <Link
                href={link.link}
                className="inline-flex items-center space-x-3 py-1.5"
              >
                <link.icon strokeWidth={1.5} className="size-3.5" />
                <span>{link.name}</span>
              </Link>
            </SheetClose>
          ))}
          <div className="inline-flex items-center justify-between py-1.5">
            <div className="flex flex-row items-center space-x-3">
              <SunMoon className="size-3.5" />
              <span>Tema</span>
            </div>
            <ThemeToggle className="!size-8" />
          </div>
          {user && (
            <SheetClose asChild>
              <button
                className="inline-flex items-center py-1.5"
                onClick={() => signOut({ callbackUrl: "/logout" })}
              >
                <LogOut strokeWidth={1.5} className="mr-3 size-3.5" />
                Cerrar sesión
              </button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
