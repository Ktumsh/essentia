"use client";

import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import React, { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import { useScrollLock } from "usehooks-ts";

import { ScrollArea } from "@/components/kit/scroll-area";
import { SidebarInset } from "@/components/kit/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, startsWithAny } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import BottomNav from "./bottom-navbar";
import ButtonUp from "./button-up";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import WelcomeModal from "./welcome-modal";
import { AppSidebar } from "../sidebar/app-sidebar";

const HIDDEN_BUTTON_UP_PATHS = ["/essentia-ai"];

interface LayoutWrapperProps {
  session: Session | null;
  user: UserProfileData | null;
  isPremium: boolean;
  selectedChatModel: string;
  children: React.ReactNode;
}

const LayoutWrapper = ({
  session,
  user,
  isPremium,
  selectedChatModel,
  children,
}: LayoutWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { id, bio, location, height, weight, genre, firstName } = user || {};

  useEffect(() => {
    if (!session || !id || pathname.startsWith("/profile")) return;

    const sessionKey = `usrPflCmplt-${id}`;

    const hasShownToast = sessionStorage.getItem(sessionKey);

    if (!hasShownToast && (!bio || !location || !height || !weight || !genre)) {
      toast("¡Completa tu perfil!", {
        duration: Infinity,
        closeButton: true,
        description: `Hola ${firstName}! Disfruta de una mejor experiencia completando tu perfil.`,
        action: {
          label: "Completar",
          onClick: () => router.push("/profile"),
        },
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
    router,
  ]);

  const hideButtonUp = startsWithAny(pathname, HIDDEN_BUTTON_UP_PATHS);
  const isEssentiaAI = pathname.startsWith("/essentia-ai");

  const { lock, unlock } = useScrollLock({
    autoLock: isEssentiaAI,
    lockTarget: "body",
  });

  useEffect(() => {
    if (isEssentiaAI) {
      lock();
    } else {
      unlock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backgroundClasses = useMemo(() => {
    return cn(
      "dark:after:from-full-dark before:absolute before:top-0 before:left-1/6 before:h-[900px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-linear-to-tr before:from-slate-50 before:to-[#c0c6e6] before:opacity-0 before:blur-3xl before:content-[''] after:absolute after:top-1/2 after:-left-[2%] after:z-10 after:h-[280px] after:w-full after:rounded-full after:bg-linear-to-tr after:from-[#f8b6cc] after:to-transparent after:opacity-0 after:blur-lg after:content-[''] sm:before:w-[1080px] sm:after:w-[240px] md:before:opacity-30 md:after:opacity-50 dark:before:bg-linear-to-br dark:before:from-transparent dark:before:to-[#ff7373] dark:before:opacity-0 dark:after:top-1/2 dark:after:h-[120px] dark:after:w-[160px] dark:after:bg-linear-to-br dark:after:via-[#ff7373] dark:after:opacity-0 dark:after:blur-2xl sm:dark:after:h-[180px] md:dark:before:opacity-15 md:dark:after:opacity-15",
    );
  }, []);

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
      <MobileHeader user={user} session={session} />

      {/* Sidebar */}
      <AppSidebar
        session={session}
        user={user}
        isPremium={isPremium}
        selectedChatModel={selectedChatModel}
      />

      {/* Main content */}
      {isMobile ? (
        <SidebarInset>
          {/* Desktop Header */}
          <DesktopHeader
            user={user}
            selectedChatModel={selectedChatModel}
            session={session}
          />

          {isEssentiaAI ? (
            <div className="flex h-[calc(100dvh-74px)] min-w-0 flex-col">
              {children}
            </div>
          ) : (
            <div ref={scrollRef}>{children}</div>
          )}
        </SidebarInset>
      ) : (
        <SidebarInset>
          {isEssentiaAI ? (
            <>
              <DesktopHeader
                user={user}
                selectedChatModel={selectedChatModel}
                session={session}
              />
              {children}
            </>
          ) : (
            <ScrollArea scrollRef={scrollRef} className="h-[calc(100dvh-32px)]">
              {/* Desktop Header */}
              <DesktopHeader
                user={user}
                selectedChatModel={selectedChatModel}
                session={session}
              />

              {children}
            </ScrollArea>
          )}
        </SidebarInset>
      )}

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
