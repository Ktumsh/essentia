"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

import { UserProfileData } from "@/types/auth";

import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import NotificationsList from "./notifications-list";
import AppSidebarToggle from "../sidebar/app-sidebar-toggle";

interface MobileHeaderProps {
  user: UserProfileData | null;
  session: Session | null;
}

const MobileHeader = ({ user, session }: MobileHeaderProps) => {
  const pathname = usePathname();

  const isAIPage = pathname.startsWith("/essentia-ai");

  return (
    <>
      <header className="bg-background/80 border-border sticky top-0 z-50 flex h-14 items-center justify-between overflow-hidden border-b px-6 backdrop-blur-lg backdrop-saturate-150 md:hidden">
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
          {user && <NotificationsList userId={user.id} />}
          <MobileMenu user={user} />
        </div>
      </header>
    </>
  );
};

export default MobileHeader;
