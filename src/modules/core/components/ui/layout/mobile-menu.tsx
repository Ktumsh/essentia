"use client";

import {
  ChevronRight,
  ChevronsUpDown,
  LucideProps,
  Menu,
  SunMoon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/drawer";
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
import Greeting from "../greeting";
import Logo from "../utils/logo";

type Item = {
  name: string;
  link?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

interface MobileMenuProps {
  user: UserProfileData | null;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { firstName, lastName, username, profileImage, isPremium } = user || {};

  const fullName = `${firstName} ${lastName}`;

  const resourceLinks = siteConfig.asideMenuLinks;
  const menuFooterLinks = siteConfig.menuFooterLinks;

  const handleAccountAction = (index: number, item: Item) => {
    if (index <= 2) {
      router.push(item.link || "#");
    } else {
      signOut({ callbackUrl: "/logout" });
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu strokeWidth={1.5} className="size-6" />
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col overflow-y-auto">
          <SheetHeader className="space-y-4">
            <SheetTitle className="hidden">Menú</SheetTitle>
            <SheetDescription className="hidden">
              Este es el menú móvil donde puedes navegar por las opciones.
            </SheetDescription>
            <Link
              href="/"
              className="relative !mt-0 inline-flex items-center gap-2"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-logo">
                <Logo width={16} height={16} className="h-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Essentia</span>
                <span className="truncate text-xs text-main-m dark:text-main-dark-m">
                  <Greeting />
                </span>
              </div>
              {isPremium && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded bg-light-gradient-v2 p-1 text-xs text-main-h dark:bg-dark-gradient dark:text-main-dark">
                  <StarsIcon className="size-3.5 [&_*]:fill-white" />
                </div>
              )}
            </Link>
            {!user && (
              <Link
                href="/login"
                className="box-border inline-flex h-8 w-full min-w-16 select-none appearance-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md bg-light-gradient-v2 px-5 text-sm font-normal text-white subpixel-antialiased tap-highlight-transparent transition-transform-colors-opacity active:scale-[0.97] motion-reduce:transition-none dark:bg-dark-gradient-v2"
              >
                Inicia sesión
              </Link>
            )}
          </SheetHeader>
          <Separator />
          <div role="group" className="flex flex-1 flex-col">
            <div className="group flex">
              <div className="inline-flex h-8 shrink-0 items-center rounded-md text-xs font-medium text-main-m dark:text-main-dark-m">
                Recursos
              </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
              {resourceLinks.map((link) => (
                <SheetClose asChild key={link.name}>
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
                </SheetClose>
              ))}
            </div>
          </div>
          <SheetFooter className="text-sm">
            <Separator className="!my-4" />
            <Collapsible className="group/collapsible">
              <CollapsibleTrigger asChild>
                <button className="inline-flex w-full items-center py-1.5">
                  <span>Información</span>
                  <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="transition-height">
                {menuFooterLinks.extras.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="inline-flex w-full items-center gap-3 py-1.5"
                  >
                    <item.icon strokeWidth={1.5} className="size-3.5" />
                    <span>{item.name}</span>
                  </Link>
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
                {menuFooterLinks.config.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="inline-flex w-full items-center gap-3 py-1.5"
                  >
                    <item.icon strokeWidth={1.5} className="size-3.5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
            <div className="inline-flex items-center justify-between py-1.5">
              <div className="flex flex-row items-center gap-3">
                <SunMoon className="size-3.5" />
                <span>Tema</span>
              </div>
              <ThemeToggle className="!size-8" />
            </div>
            <Separator className="!my-4" />
            {user ? (
              <SheetClose asChild>
                <button
                  className="relative inline-flex w-full items-center gap-2"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage
                      src={profileImage || ""}
                      alt={username || "Invitado"}
                    />
                    <AvatarFallback className="rounded-lg">
                      <AvatarIcon className="size-4 text-main-h dark:text-main-dark-h" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {fullName !== "undefined undefined"
                        ? fullName
                        : "Invitado"}
                    </span>
                    {username && (
                      <span className="truncate text-xs text-main-m dark:text-main-dark-m">
                        @{username}
                      </span>
                    )}
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </button>
              </SheetClose>
            ) : (
              <button
                className="relative inline-flex w-full items-center gap-2"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={""} alt="Invitado" />
                  <AvatarFallback className="rounded-lg">
                    <AvatarIcon className="size-4 text-main-h dark:text-main-dark-h" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Invitado</span>
                </div>
              </button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {user && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              {menuFooterLinks.account.map((item, index) => (
                <DrawerClose asChild key={item.name}>
                  <Button
                    variant="mobile"
                    onClick={() => handleAccountAction(index, item)}
                  >
                    <item.icon strokeWidth={1.5} className="size-3.5" />
                    {item.name}
                  </Button>
                </DrawerClose>
              ))}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default MobileMenu;
