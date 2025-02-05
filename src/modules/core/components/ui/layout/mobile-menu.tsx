"use client";

import {
  ChevronRight,
  ChevronsUpDown,
  LucideProps,
  Menu,
  SunMoon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

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

import ThemeToggle from "../buttons/theme-toggle";
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

  const isMobile = useIsMobile();

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
                Inicia sesión
              </Button>
            )}
          </SheetHeader>
          <Separator />
          <div role="group" className="flex flex-1 flex-col">
            <div className="group flex">
              <div className="text-main-m dark:text-main-dark-m inline-flex h-8 shrink-0 items-center rounded-md text-xs font-medium">
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
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.link}
                      className="inline-flex w-full items-center gap-3 py-1.5"
                    >
                      <item.icon strokeWidth={1.5} className="size-3.5" />
                      <span>{item.name}</span>
                    </Link>
                  </SheetClose>
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
                  <SheetClose asChild key={item.name}>
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
                  </SheetClose>
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
              <SheetClose asChild>
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
              </SheetClose>
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
