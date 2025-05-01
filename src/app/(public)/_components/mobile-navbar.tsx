"use client";

import { ChevronRight, Menu } from "lucide-react";
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
import Logo from "@/components/ui/layout/logo";
import { navConfig } from "@/config/nav.config";
import { cn } from "@/lib/utils";

const MobileNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const mainNavItems = navConfig.publicLinks;
  const discoverItems = navConfig.publicListLinks;

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger className="flex size-8 items-center justify-center text-gray-700 md:hidden">
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="p-0!">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Navegación</DrawerTitle>
          <DrawerDescription>Navega por las secciones.</DrawerDescription>
        </DrawerHeader>
        <div className="mb-4 flex flex-col gap-4 p-6 pb-0">
          <Link href="/" className="relative inline-flex items-center gap-2">
            <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
              <Logo width={16} height={16} className="h-4" />
            </div>
            <div className="grid flex-1 text-left text-sm">
              <span className="truncate font-semibold">Essentia</span>
            </div>
          </Link>
          <ArrowLeftButton
            size="sm"
            variant="secondary"
            className="h-7 flex-row-reverse rounded-sm text-xs [&_svg]:size-3.5! [&_svg]:rotate-180"
          >
            Panel Essentia
          </ArrowLeftButton>
        </div>
        <nav className="flex flex-col divide-y divide-slate-200 overflow-y-auto px-6 text-base">
          {mainNavItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.title} className="border-t py-4">
                <div className="mb-2 text-sm font-semibold text-gray-900">
                  {item.title}
                </div>
                <div className="space-y-2 pl-2">
                  {discoverItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-2 rounded py-2 text-sm transition",
                        pathname === subItem.href
                          ? "font-medium text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <ChevronRight className="size-3 text-gray-400" />
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
                  "block py-4 text-sm font-semibold text-gray-900 transition",
                  pathname === item.href
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600",
                )}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>
        <DrawerFooter className="flex flex-col gap-2">
          <LoginButton
            variant="outline"
            className="w-full border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Iniciar sesión
          </LoginButton>
          <Button
            variant="gradient"
            onClick={() => router.push("/signup")}
            className="w-full"
          >
            Comenzar gratis
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavbar;
