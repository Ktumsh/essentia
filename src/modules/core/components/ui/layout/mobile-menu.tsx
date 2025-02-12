"use client";

import {
  ChevronRight,
  ChevronsUpDown,
  LogIn,
  Menu,
  SunMoon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Fragment, useState } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { StarsIcon } from "@/modules/icons/common";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import ThemeToggle from "../buttons/theme-toggle";
import Greeting from "../utils/greeting";
import Logo from "../utils/logo";

interface MobileMenuProps {
  user: UserProfileData | null;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = useIsMobile();

  const { firstName, lastName, username, profileImage, isPremium } = user || {};

  const fullName = `${firstName} ${lastName}`;

  const resourceLinks = siteConfig.asideMenuLinks;
  const menuFooterLinks = siteConfig.menuFooterLinks;

  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger className="flex size-8 items-center justify-center">
          <Menu strokeWidth={1.5} className="size-6" />
        </DrawerTrigger>
        <DrawerContent className="gap-4 overflow-y-auto">
          <DrawerHeader className="mx-0 flex flex-col space-y-4 border-0 text-center sm:text-left">
            <DrawerTitle className="hidden">Menú</DrawerTitle>
            <DrawerDescription className="hidden">
              Este es el menú móvil donde puedes navegar por las opciones.
            </DrawerDescription>
            <Link
              href="/"
              className="relative mt-0! inline-flex items-center gap-2"
            >
              <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-md">
                <Logo width={16} height={16} className="h-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Essentia</span>
                <span className="text-main-m dark:text-main-dark-m truncate text-xs">
                  <Greeting />
                </span>
              </div>
              {isPremium && (
                <div className="bg-light-gradient-v2 text-main-h dark:bg-dark-gradient dark:text-main-dark absolute top-1/2 right-0 -translate-y-1/2 rounded-sm p-1 text-xs">
                  <StarsIcon className="size-3.5 **:fill-white" />
                </div>
              )}
            </Link>
            {!user && (
              <Button
                variant="gradient"
                fullWidth
                onClick={() => router.push("/login")}
              >
                <LogIn
                  aria-hidden="true"
                  className="size-4 **:fill-white focus:outline-hidden"
                />
                Inicia sesión
              </Button>
            )}
          </DrawerHeader>
          <Separator />
          <div role="group" className="flex flex-1 flex-col">
            <div className="group flex">
              <div className="text-main-m dark:text-main-dark-m inline-flex h-8 shrink-0 items-center rounded-md text-xs font-medium">
                Recursos
              </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
              {resourceLinks.map((link) => (
                <DrawerClose asChild key={link.name}>
                  <Link
                    href={link.link}
                    className={cn(
                      "inline-flex items-center gap-3 px-0 py-1.5 text-sm",
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
                </DrawerClose>
              ))}
            </div>
          </div>
          <DrawerFooter className="gap-0 space-y-2 p-0 text-sm">
            <Separator className="my-4!" />
            <Collapsible className="group/collapsible">
              <CollapsibleTrigger asChild>
                <button className="inline-flex w-full items-center py-1.5">
                  <span>Información</span>
                  <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="transition-height">
                {menuFooterLinks.extras.map((item) => (
                  <DrawerClose asChild key={item.name}>
                    <Link
                      href={item.link}
                      className="inline-flex w-full items-center gap-3 py-1.5"
                    >
                      <item.icon strokeWidth={1.5} className="size-3.5" />
                      <span>{item.name}</span>
                    </Link>
                  </DrawerClose>
                ))}
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="group/collapsible">
              <CollapsibleTrigger asChild>
                <button className="inline-flex w-full items-center py-1.5">
                  <span>Configuración y soporte</span>
                  <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="transition-height">
                {menuFooterLinks.config.map((item, index) => (
                  <DrawerClose asChild key={item.name}>
                    <Link
                      href={
                        index === 0
                          ? isMobile
                            ? "/settings"
                            : item.link
                          : item.link
                      }
                      className="inline-flex w-full items-center gap-3 py-1.5"
                    >
                      <item.icon strokeWidth={1.5} className="size-3.5" />
                      <span>{item.name}</span>
                    </Link>
                  </DrawerClose>
                ))}
              </CollapsibleContent>
            </Collapsible>
            <div className="inline-flex items-center justify-between py-1.5">
              <div className="flex flex-row items-center gap-3">
                <SunMoon className="size-3.5" />
                <span>Tema</span>
              </div>
              <ThemeToggle className="size-8!" />
            </div>
            <Separator className="my-4!" />
            {user ? (
              <DrawerClose asChild>
                <button
                  className="relative inline-flex w-full items-center gap-2"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  {profileImage ? (
                    <Avatar className="size-8 rounded-lg">
                      <Image
                        priority
                        src={profileImage}
                        width={32}
                        height={32}
                        alt={username || "Invitado"}
                      />
                    </Avatar>
                  ) : (
                    <Avatar className="size-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        <AvatarIcon className="text-main-h dark:text-main-dark-h size-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {fullName !== "undefined undefined"
                        ? fullName
                        : "Invitado"}
                    </span>
                    {username && (
                      <span className="text-main-m dark:text-main-dark-m truncate text-xs">
                        @{username}
                      </span>
                    )}
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </button>
              </DrawerClose>
            ) : (
              <button
                className="relative inline-flex w-full items-center gap-2"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    <AvatarIcon className="text-main-h dark:text-main-dark-h size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Invitado</span>
                </div>
              </button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {user && (
        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          autoFocus={false}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="dark:bg-dark flex flex-col overflow-hidden rounded-xl bg-gray-100">
                {menuFooterLinks.account.slice(0, 2).map((item, index) => (
                  <Fragment key={item.name}>
                    <DrawerClose asChild>
                      <Button
                        variant="mobile"
                        onClick={() => router.push(item.link || "#")}
                      >
                        <item.icon />
                        {item.name}
                      </Button>
                    </DrawerClose>
                    <Separator
                      className={cn("dark:bg-accent-dark/50 z-10 ml-3", {
                        hidden: index === 1,
                      })}
                    />
                  </Fragment>
                ))}
              </div>
              <div className="dark:bg-dark flex flex-col overflow-hidden rounded-xl bg-gray-100">
                {menuFooterLinks.account.slice(2, 3).map((item) => (
                  <Fragment key={item.name}>
                    <DrawerClose asChild>
                      <Button
                        variant="mobile"
                        onClick={() => router.push(item.link || "#")}
                      >
                        <item.icon />
                        {item.name}
                      </Button>
                    </DrawerClose>
                  </Fragment>
                ))}
              </div>
              <div className="dark:bg-dark flex flex-col overflow-hidden rounded-xl bg-gray-100">
                {menuFooterLinks.account.slice(3).map((item) => (
                  <Fragment key={item.name}>
                    <DrawerClose asChild>
                      <Button
                        variant="mobile"
                        onClick={() => signOut({ callbackUrl: "/logout" })}
                      >
                        <item.icon />
                        {item.name}
                      </Button>
                    </DrawerClose>
                  </Fragment>
                ))}
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default MobileMenu;
