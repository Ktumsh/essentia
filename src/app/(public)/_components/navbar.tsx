"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { LoginButton } from "@/components/button-kit/login-button";
import { Button } from "@/components/kit/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/kit/navigation-menu";
import Logo from "@/components/ui/layout/logo";
import { navConfig } from "@/config/nav.config";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import ListItem from "./list-item";
import MobileNavbar from "./mobile-navbar";

const Navbar = ({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const mainNavItems = navConfig.publicLinks;
  const discoverItems = navConfig.publicListLinks;

  useEffect(() => {
    const scrollElement = isMobile ? window : scrollRef.current;

    const handleScroll = () => {
      const scrollTop = isMobile
        ? window.scrollY
        : (scrollRef.current?.scrollTop ?? 0);
      setIsScrolled(scrollTop > 10);
    };

    scrollElement?.addEventListener("scroll", handleScroll);
    return () => scrollElement?.removeEventListener("scroll", handleScroll);
  }, [scrollRef, isMobile]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex items-center transition-all duration-300",
        isScrolled
          ? "shadow-little-pretty h-12 bg-white/80 backdrop-blur-lg backdrop-saturate-150"
          : "h-14 bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <Link href="/descubre-essentia" className="flex items-center gap-2">
          <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
            <Logo />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Essentia</span>
          </div>
        </Link>

        <div className="hidden items-center md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavItems.map((item) =>
                item.hasDropdown ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent",
                        {
                          "hover:bg-white hover:data-[state=open]:bg-white":
                            !isScrolled,
                        },
                        pathname.startsWith("/recursos") &&
                          "font-medium text-indigo-600",
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {discoverItems.map((resource) => (
                          <ListItem
                            key={resource.title}
                            title={resource.title}
                            href={resource.href}
                            className={
                              pathname === resource.href
                                ? "font-medium text-indigo-600"
                                : ""
                            }
                          >
                            {resource.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent",
                          { "hover:bg-white": !isScrolled },
                          pathname === item.href &&
                            "font-medium text-indigo-600",
                        )}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LoginButton
            variant="outline"
            size="sm"
            className="border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Iniciar sesión
          </LoginButton>
          <Link href="/planes">
            <Button size="sm" variant="gradient" className="hidden md:flex">
              Hazte premium
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <MobileNavbar />
      </div>
    </header>
  );
};

export default Navbar;
