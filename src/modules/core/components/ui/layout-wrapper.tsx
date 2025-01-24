"use client";

import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import React, { useEffect, useMemo, useRef } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { useToast } from "@/components/hooks/use-toast";
import { SidebarInset } from "@/components/ui/sidebar";
import { ToastAction } from "@/components/ui/toast";
import { UserNotification } from "@/db/schema";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import BottomNav from "./layout/bottom-navbar";
import DesktopHeader from "./layout/desktop-header";
import MobileHeader from "./layout/mobile-header";
import WelcomeModal from "./welcome-modal";
import { startsWithAny } from "../../lib/utils";
import ButtonUp from "../ui/buttons/button-up";
import { AppSidebar } from "../ui/sidebar/app-sidebar";

const HIDDEN_BUTTON_UP_PATHS = ["/essentia-ai"];

interface LayoutWrapperProps {
  session: Session | null;
  user: UserProfileData | null;
  isPremium: boolean;
  notifications: UserNotification[];
  children: React.ReactNode;
}

const LayoutWrapper = ({
  session,
  user,
  isPremium,
  notifications,
  children,
}: LayoutWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { toast } = useToast();

  const { id, bio, location, height, weight, genre, firstName } = user || {};

  useEffect(() => {
    if (!session || !id || pathname.startsWith("/profile")) return;

    const sessionKey = `usrPflCmplt-${id}`;

    const hasShownToast = sessionStorage.getItem(sessionKey);

    if (!hasShownToast && (!bio || !location || !height || !weight || !genre)) {
      toast({
        duration: 1000000,
        title: "¡Completa tu perfil!",
        description: `Hola ${firstName}! Disfruta de una mejor experiencia completando tu perfil.`,
        action: (
          <ToastAction
            altText="Completar perfil"
            onClick={() => router.push("/profile")}
          >
            Completar perfil
          </ToastAction>
        ),
      });
    }

    sessionStorage.setItem(sessionKey, "true");
  }, [
    session,
    pathname,
    id,
    bio,
    location,
    height,
    weight,
    genre,
    firstName,
    toast,
    router,
  ]);

  const hideButtonUp = startsWithAny(pathname, HIDDEN_BUTTON_UP_PATHS);
  const isProfiles = pathname.startsWith("/profiles");
  const isAccount =
    pathname.startsWith("/account") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/subscription");
  const isPremiumPage = pathname.startsWith("/pricing");
  const isEssentiaAI = pathname.startsWith("/essentia-ai");
  const isShare = pathname.startsWith("/share");
  const isAIorShare = isEssentiaAI || isShare;

  const backgroundClasses = useMemo(() => {
    if (!isPremiumPage && !isProfiles && !isAccount) {
      return cn(
        "z-[-1] before:absolute before:top-0 before:left-1/2 before:h-[800px] before:w-full sm:before:w-[1080px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-tr from-gray-50 to-[#c0c6e6] before:blur-[80px] before:content-[''] before:opacity-0 md:before:opacity-100 before:dark:h-[600px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-0 md:before:dark:opacity-30 after:absolute after:top-[10%] after:left-[20%] after:z-10 after:h-[580px] after:w-full sm:after:w-[540px] after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:blur-[80px] after:content-[''] after:rounded-full after:opacity-0 md:after:opacity-50 after:dark:top-1/4 after:dark:left-2/3 after:dark:h-[120px] sm:after:dark:h-[180px] after:dark:w-[260px] after:dark:bg-gradient-to-br after:dark:from-full-dark after:dark:via-[#ff7373] after:dark:opacity-0 md:after:dark:opacity-60 after:dark:blur-3xl after:dark:rounded-none",
        isAIorShare &&
          "after:!opacity-0 before:!opacity-100 after:dark:!opacity-60 before:dark:!opacity-30",
      );
    } else {
      return cn(
        "z-[-1] before:absolute before:top-0 before:left-1/2 before:h-[800px] before:w-full sm:before:w-[1080px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-t from-gray-50 to-[#c0c6e6] before:blur-[80px] before:content-[''] before:dark:h-[600px] before:dark:w-[980px] before:dark:bg-gradient-to-b before:dark:from-transparent before:dark:to-[#ff7373] before:dark:opacity-50 after:absolute after:top-[10%] after:left-1/2 after:z-10 after:h-[580px] after:w-full sm:after:w-[540px] after:-translate-x-1/2 after:bg-gradient-to-tr after:from-[#f8b6cc] after:to-transparent after:blur-[80px] after:content-[''] after:rounded-full after:opacity-100 after:dark:top-1/4 after:dark:left-1/2 after:dark:h-[180px] after:dark:w-[260px] after:dark:bg-gradient-to-br after:dark:from-full-dark after:dark:via-[#ff7373] after:dark:opacity-80 after:dark:blur-3xl after:dark:rounded-none",
      );
    }
  }, [isPremiumPage, isProfiles, isAIorShare, isAccount]);

  const motionContainerClasses = cn(
    "fixed inset-0 z-0 overflow-hidden pointer-events-none",
    isPremium && "absolute inset-0",
  );

  return (
    <>
      {/* Background */}
      <motion.div
        data-id="background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        aria-hidden="true"
        className={motionContainerClasses}
      >
        <div className={backgroundClasses}></div>
      </motion.div>

      {/* Mobile Header */}
      <MobileHeader user={user} notifications={notifications} />

      {/* Sidebar */}
      <AppSidebar session={session} user={user} isPremium={isPremium} />

      {/* Main content */}
      <SidebarInset>
        {/* Desktop Header */}
        <DesktopHeader user={user} notifications={notifications} />

        {isEssentiaAI ? (
          <div className="flex h-[calc(100dvh-56px)] min-w-0 flex-col">
            {children}
          </div>
        ) : (
          <div ref={scrollRef} className="w-full flex-1 overflow-y-auto">
            {children}
          </div>
        )}
      </SidebarInset>

      {/* Button Up */}
      {!hideButtonUp && !isMobile && <ButtonUp scrollRef={scrollRef} />}

      {/* Bottom Mobile Navbar */}
      <BottomNav user={user} />

      {/* Welcome Modal */}
      {!session && <WelcomeModal />}
    </>
  );
};

export default LayoutWrapper;
