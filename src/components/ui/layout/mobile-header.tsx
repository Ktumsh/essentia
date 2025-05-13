"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

import { Button } from "@/components/kit/button";
import useIsScrolled from "@/hooks/use-is-scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";


import Logo from "./logo";
import MainSearch from "./main-search";
import MobileMenu from "./mobile-menu";
import NotificationsList from "./notifications-list";
import AppSidebarToggle from "../sidebar/app-sidebar-toggle";

import type { UserProfileData } from "@/lib/types";

interface MobileHeaderProps {
  user: UserProfileData | null;
  session: Session | null;
}

const MobileHeader = ({ user, session }: MobileHeaderProps) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isScrolled = useIsScrolled();

  const isAIPage = pathname.startsWith("/essentia-ai");

  if (!isMobile) return null;

  return (
    <>
      <header
        className={cn(
          "bg-background sticky top-0 z-50 flex h-14 items-center justify-between overflow-hidden px-6 transition-all duration-300 md:hidden",
          {
            "shadow-little-pretty bg-background/80 backdrop-blur-lg backdrop-saturate-150":
              isScrolled,
          },
        )}
      >
        <div className="inline-flex items-center gap-4">
          {isAIPage && session && <AppSidebarToggle />}
          <Link
            href="/"
            className="flex h-14 items-center justify-center gap-2"
          >
            <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
              <Logo className="h-4" />
            </div>
            {!isAIPage && (
              <div className="grid flex-1 text-left text-sm md:text-base">
                <span className="truncate font-semibold">Essentia</span>
              </div>
            )}
          </Link>
        </div>
        <div className="inline-flex items-center gap-4">
          <MainSearch isPremium={user?.isPremium || false}>
            <Button variant="ghost" size="icon" className="size-8">
              <Search />
            </Button>
          </MainSearch>
          {user && <NotificationsList userId={user.id} />}
          <MobileMenu user={user} />
        </div>
      </header>
    </>
  );
};

export default MobileHeader;
