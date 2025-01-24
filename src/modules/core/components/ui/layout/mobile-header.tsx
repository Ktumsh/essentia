"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserNotification } from "@/db/schema";
import AppSidebarToggle from "@/modules/core/components/ui/sidebar/app-sidebar-toggle";
import { UserProfileData } from "@/types/session";

import MobileMenu from "./mobile-menu";
import NotificationsList from "./notifications-list";
import Logo from "../utils/logo";

interface MobileHeaderProps {
  user: UserProfileData | null;
  notifications: UserNotification[];
}

const MobileHeader = ({ user, notifications }: MobileHeaderProps) => {
  const pathname = usePathname();

  const isAIPage = pathname.startsWith("/essentia-ai");

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between overflow-hidden border-b border-gray-200 bg-white/80 px-6 backdrop-blur-lg backdrop-saturate-150 dark:border-dark dark:bg-full-dark/80 md:hidden">
        {isAIPage && <AppSidebarToggle />}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-logo">
            <Logo className="h-4" />
          </div>
          {!isAIPage && (
            <div className="grid flex-1 text-left text-sm leading-tight md:text-base">
              <span className="truncate font-semibold">Essentia</span>
            </div>
          )}
        </Link>
        <div className="inline-flex items-center gap-4">
          {user && (
            <NotificationsList userId={user.id} notifications={notifications} />
          )}
          <MobileMenu user={user} />
        </div>
      </header>
    </>
  );
};

export default MobileHeader;
