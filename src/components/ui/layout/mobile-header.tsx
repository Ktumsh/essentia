"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

import { Button } from "@/components/kit/button";
import useIsScrolled from "@/hooks/use-is-scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import FullLogo from "./full-logo";
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

  const isAIPage = pathname.startsWith("/aeris");

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
          <FullLogo withLabel />
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
