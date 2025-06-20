"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { LoginButton } from "@/components/button-kit/login-button";
import FullLogo from "@/components/layout/full-logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navConfig } from "@/config/nav.config";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/utils";

import ListItem from "./list-item";
import MobileNavbar from "./mobile-navbar";

import type { Session } from "next-auth";

const Navbar = ({
  scrollRef,
  session,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
  session: Session | null;
}) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { user } = useUserProfile();
  const isPremium = user?.isPremium || false;

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

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  const btnVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const navMenuVariants = {
    visible: {
      opacity: 1,
      display: isMobile ? "none" : "flex",
    },
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };

  const actions = session?.user ? (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push("/")}
        className="bg-background"
      >
        Panel Essentia
      </Button>
      {!isPremium && (
        <Button
          size="sm"
          variant="gradient"
          onClick={() => router.push("/planes")}
        >
          Hazte premium
        </Button>
      )}
    </>
  ) : (
    <>
      <LoginButton
        variant="outline"
        size="sm"
        onClick={() => router.push("/login")}
        className="bg-background border-0"
      >
        Iniciar sesión
      </LoginButton>
      <Link href="/planes">
        <Button size="sm" variant="gradient">
          Hazte premium
        </Button>
      </Link>
    </>
  );

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex h-14 items-center transition-all",
        {
          "bg-background/80 pointer-events-none backdrop-blur-md backdrop-saturate-150 md:bg-transparent md:backdrop-blur-none md:backdrop-saturate-100":
            isScrolled,
        },
      )}
    >
      <div className="pointer-events-auto relative m-auto flex w-full max-w-7xl items-center justify-between px-6">
        {!isMobile && (
          <AnimatePresence>
            {!isScrolled ? (
              <motion.div
                key="staticLogo"
                className="flex items-center gap-2"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={logoVariants}
                transition={{ duration: 0.25 }}
              >
                <FullLogo withLabel href="/essentia" />
              </motion.div>
            ) : (
              <motion.div
                key="fixedLogo"
                className="fixed inset-y-0 left-6 z-50 flex h-14 items-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={logoVariants}
                transition={{ duration: 0.25 }}
              >
                <FullLogo withLabel href="/essentia" />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {isMobile && <FullLogo withLabel href="/essentia" />}

        <motion.div
          initial="visible"
          animate={isScrolled ? "hidden" : "visible"}
          variants={navMenuVariants}
          transition={{ duration: 0.25 }}
          className="hidden items-center md:flex"
        >
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavItems.map((item) =>
                item.hasDropdown ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent",
                        {
                          "hover:bg-background hover:data-[state=open]:bg-background":
                            !isScrolled,
                        },
                        pathname.startsWith("/recursos") &&
                          "text-primary font-medium",
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
                            className={cn(
                              pathname === resource.href &&
                                "text-primary font-medium",
                            )}
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
                          { "hover:bg-background": !isScrolled },
                          pathname === item.href && "text-primary font-medium",
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
        </motion.div>

        <AnimatePresence>
          {!isScrolled ? (
            <motion.div
              key="staticBtns"
              className="hidden items-center gap-3 md:flex"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={btnVariants}
              transition={{ duration: 0.25 }}
            >
              {actions}
            </motion.div>
          ) : (
            <motion.div
              key="fixedBtns"
              className="pointer-events-auto fixed inset-y-0 right-6 z-50 hidden h-14 items-center gap-3 md:flex"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={btnVariants}
              transition={{ duration: 0.25 }}
            >
              {actions}
            </motion.div>
          )}
        </AnimatePresence>
        <MobileNavbar session={session} />
      </div>
    </header>
  );
};

export default Navbar;
