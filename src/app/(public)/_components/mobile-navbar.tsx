"use client";

import { ChevronRight, Menu, SunMoon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { LoginButton } from "@/components/button-kit/login-button";
import { Button } from "@/components/kit/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/kit/drawer";
import { Separator } from "@/components/kit/separator";
import FullLogo from "@/components/ui/layout/full-logo";
import ThemeToggle from "@/components/ui/layout/theme-toggle";
import { navConfig } from "@/config/nav.config";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";

import type { Session } from "next-auth";

interface MobileNavbarProps {
  session: Session | null;
}

const MobileNavbar = ({ session }: MobileNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const mainNavItems = navConfig.publicLinks;
  const discoverItems = navConfig.publicListLinks;

  const { user } = useUserProfile();
  const isPremium = user?.isPremium || false;

  const actions = session?.user ? (
    <>
      <Button variant="accent" onClick={() => router.push("/")}>
        Panel Essentia
      </Button>
      {!isPremium && (
        <Button
          variant="gradient"
          onClick={() => router.push("/planes")}
          className="w-full"
        >
          Hazte premium
        </Button>
      )}
    </>
  ) : (
    <>
      <LoginButton variant="accent" onClick={() => router.push("/login")}>
        Iniciar sesión
      </LoginButton>
      <Link href="/planes">
        <Button
          variant="gradient"
          onClick={() => router.push("/planes")}
          className="w-full"
        >
          Hazte premium
        </Button>
      </Link>
    </>
  );

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger className="text-foreground/80 flex size-8 items-center justify-center md:hidden">
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="space-y-4 p-0!">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Navegación</DrawerTitle>
          <DrawerDescription>Navega por las secciones.</DrawerDescription>
        </DrawerHeader>
        <div className="mb-4 flex flex-col gap-4 p-6 pb-0">
          <FullLogo withLabel />
          <ArrowLeftButton
            variant="accent"
            onClick={() => router.push("/")}
            className="flex-row-reverse rounded-sm text-xs [&_svg]:rotate-180"
          >
            Panel Essentia
          </ArrowLeftButton>
        </div>
        <nav className="divide-border flex flex-1 flex-col divide-y overflow-y-auto px-6 text-base">
          {mainNavItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.title} className="border-t py-4">
                <div className="mb-2 text-sm font-semibold">{item.title}</div>
                <div className="space-y-2 pl-2">
                  {discoverItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-2 rounded py-2 text-sm transition",
                        pathname === subItem.href
                          ? "text-primary font-medium"
                          : "text-foreground/80 hover:text-primary",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <ChevronRight className="text-muted-foreground size-3" />
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "block py-4 text-sm font-semibold transition",
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary",
                )}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>
        <div className="px-6">
          <Separator />
        </div>
        <DrawerFooter className="gap-0 space-y-4 p-6 pt-0 text-sm">
          <div className="mb-0! inline-flex items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <SunMoon className="size-3.5" />
              <span>Tema</span>
            </div>
            <ThemeToggle className="size-8!" />
          </div>
          <div className="my-4">
            <Separator />
          </div>
          {actions}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavbar;
