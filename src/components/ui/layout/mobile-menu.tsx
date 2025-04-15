"use client";

import { ChevronRight, ChevronsUpDown, Menu, SunMoon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import React, { Fragment, useState } from "react";

import { AddUserButton } from "@/components/button-kit/add-user-button";
import { LoginButton } from "@/components/button-kit/login-button";
import { Avatar, AvatarFallback } from "@/components/kit/avatar";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/kit/collapsible";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/kit/drawer";
import { Separator } from "@/components/kit/separator";
import { navConfig } from "@/config/nav.config";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTrial } from "@/hooks/use-trial";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import Greeting from "./greeting";
import Logo from "./logo";
import ThemeToggle from "./theme-toggle";
import { AvatarIcon } from "../icons/miscellaneus";
import PaymentModal from "../payment/payment-modal";

interface MobileMenuProps {
  user: UserProfileData | null;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { subscription } = useUserSubscription();

  const subscriptionPlan = subscription?.plan;

  const isMobile = useIsMobile();

  const { isTrialActive, isTrialUsed } = useTrial();

  const { firstName, lastName, username, profileImage, isPremium } = user || {};

  const fullName = `${firstName} ${lastName}`;

  const mainLinks = navConfig.navLinks;
  const resourceLinks = navConfig.asideMenuLinks;
  const menuFooterLinks = navConfig.menuFooterLinks;

  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger className="flex size-8 items-center justify-center">
          <Menu className="size-6" />
        </DrawerTrigger>
        <DrawerContent className="gap-0 space-y-4 p-0!">
          <DrawerHeader className="mx-0 flex flex-col space-y-4 border-0 p-6 pb-0 text-center sm:text-left">
            <DrawerTitle className="sr-only">Menú</DrawerTitle>
            <DrawerDescription className="sr-only">
              Este es el menú móvil donde puedes navegar por las opciones.
            </DrawerDescription>
            <Link
              href="/"
              className="relative mt-0! inline-flex items-center gap-2"
            >
              <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
                <Logo width={16} height={16} className="h-4" />
              </div>
              <div className="grid flex-1 text-left text-sm">
                <span className="truncate font-semibold">Essentia</span>
                <span className="text-muted-foreground truncate text-xs">
                  <Greeting />
                </span>
              </div>
              {isPremium && (
                <div className="absolute top-1/2 right-0 mr-2 -translate-y-1/2 p-1">
                  <Badge
                    variant={
                      isTrialActive
                        ? "premium"
                        : subscriptionPlan?.name === "Premium"
                          ? "premium"
                          : "premiumPlus"
                    }
                    className="text-xxs px-1.5 py-0.5"
                  >
                    {isTrialActive ? "Premium" : subscriptionPlan?.name}
                  </Badge>
                </div>
              )}
            </Link>
            {!user && (
              <>
                <AddUserButton
                  onClick={() => router.push("/register")}
                  className="mb-0! w-full rounded-full"
                >
                  Regístrate
                </AddUserButton>
                <LoginButton
                  variant="secondary"
                  onClick={() => {
                    if (pathname === "/") {
                      router.push("/login");
                    } else {
                      router.push(`/login?next=${pathname}`);
                    }
                  }}
                  className="w-full rounded-full"
                >
                  Inicia sesión
                </LoginButton>
              </>
            )}
            {!isPremium && user && (
              <DrawerClose asChild>
                <Button
                  variant="gradient"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full rounded-full"
                >
                  {!isTrialUsed
                    ? "Activa tu prueba gratuita"
                    : "Actualiza a Premium"}
                </Button>
              </DrawerClose>
            )}
          </DrawerHeader>
          <div className="mb-0! px-6">
            <Separator />
          </div>
          <div
            role="group"
            className="mb-0! flex flex-1 flex-col space-y-4 overflow-y-auto px-6 py-4"
          >
            <div className="flex w-full flex-col space-y-1.5">
              {mainLinks.map((item) => {
                const isActive =
                  pathname === item.path ||
                  pathname.startsWith(item.path + "/");
                return (
                  <DrawerClose asChild key={item.name}>
                    <Link
                      href={item.path}
                      className={cn(
                        "after:bg-primary relative inline-flex items-center gap-3 px-0 py-1.5 text-sm after:absolute after:right-0 after:h-4 after:w-0.5 after:rounded-full after:opacity-0 after:content-['']",
                        { "text-primary after:opacity-100": isActive },
                      )}
                    >
                      <item.activeIcon className="size-4" />
                      <span>{item.name}</span>
                    </Link>
                  </DrawerClose>
                );
              })}
            </div>
            <div className="flex w-full flex-col space-y-1.5">
              <div className="group flex">
                <div className="text-muted-foreground inline-flex h-8 shrink-0 items-center rounded-md text-xs font-medium">
                  Recursos educativos
                </div>
              </div>
              <div className="flex w-full flex-col space-y-1.5">
                {resourceLinks.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <DrawerClose asChild key={item.name}>
                      <Link
                        href={item.path}
                        className={cn(
                          "after:bg-primary relative inline-flex items-center gap-3 px-0 py-1.5 text-sm after:absolute after:right-0 after:h-4 after:w-0.5 after:rounded-full after:opacity-0 after:content-['']",
                          { "text-primary after:opacity-100": isActive },
                        )}
                      >
                        <span className="-m-px">{item.emoji}</span>
                        <span>{item.name}</span>
                      </Link>
                    </DrawerClose>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="px-6">
            <Separator />
          </div>
          <DrawerFooter className="gap-0 space-y-2 p-6 pt-0 text-sm">
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
                      href={item.path}
                      className="inline-flex w-full items-center gap-3 py-1.5"
                    >
                      {React.createElement(item.icon as React.ElementType, {
                        strokeWidth: 1.5,
                        className: "size-3.5",
                      })}
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
                            : item.path
                          : item.path
                      }
                      className="inline-flex w-full items-center gap-3 py-1.5"
                    >
                      {React.createElement(item.icon as React.ElementType, {
                        strokeWidth: 1.5,
                        className: "size-3.5",
                      })}
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
                        <AvatarIcon className="text-foreground size-4" />
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
                      <span className="text-muted-foreground truncate text-xs">
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
                    <AvatarIcon className="text-foreground size-4" />
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
              <DrawerTitle>Opciones de cuenta</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                {menuFooterLinks.account.slice(0, 2).map((item, index) => (
                  <Fragment key={item.name}>
                    <DrawerClose asChild>
                      <Button
                        variant="mobile"
                        onClick={() => router.push(item.path || "#")}
                      >
                        <item.icon />
                        {item.name}
                      </Button>
                    </DrawerClose>
                    <Separator
                      className={cn("dark:bg-alternative/50 z-10 ml-3", {
                        hidden: index === 1,
                      })}
                    />
                  </Fragment>
                ))}
              </div>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                {menuFooterLinks.account.slice(2, 3).map((item) => (
                  <Fragment key={item.name}>
                    <DrawerClose asChild>
                      <Button
                        variant="mobile"
                        onClick={() => router.push(item.path || "#")}
                      >
                        <item.icon />
                        {item.name}
                      </Button>
                    </DrawerClose>
                  </Fragment>
                ))}
              </div>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
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

      {!isPremium && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          setIsOpen={setIsPaymentModalOpen}
          mode={!isTrialUsed ? "trial" : "upgrade"}
        />
      )}
    </>
  );
};

export default MobileMenu;
