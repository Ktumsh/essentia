"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useRef } from "react";

import { HomeFillIcon } from "@/components/icons/interface";
import { Button } from "@/components/kit/button";
import { ScrollArea } from "@/components/kit/scroll-area";
import { SidebarInset } from "@/components/kit/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProfileMessage } from "@/hooks/use-profile-message";
import { ScrollContext } from "@/hooks/use-scroll-ref";
import { cn } from "@/lib/utils";

import BottomNav from "./bottom-navbar";
import ButtonUp from "./button-up";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import { AppSidebar } from "../sidebar/app-sidebar";

import type { UserProfileData } from "@/lib/types";

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
  children,
}: LayoutWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const { isDismissed } = useProfileMessage();

  const scrollRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const hideButtonUp =
    HIDDEN_BUTTON_UP_PATHS.some((path) => pathname === path) ||
    pathname.startsWith("/essentia-ai/chat/");

  const isEssentiaAI =
    pathname === "/essentia-ai" || pathname.startsWith("/essentia-ai/chat/");

  return (
    <div
      className={cn(
        "relative flex size-full flex-col md:max-h-dvh md:min-h-dvh md:flex-row",
        {
          "md:bg-sidebar md:rounded-xl": !isDismissed,
        },
      )}
    >
      <ScrollContext.Provider value={scrollRef}>
        <Background isPremium={isPremium} />

        <MobileHeader user={user} session={session} />

        <AppSidebar session={session} user={user} isPremium={isPremium} />
        {isMobile ? (
          <SidebarInset>
            {isEssentiaAI ? (
              <div
                className={cn("flex h-[calc(100dvh-56px)] min-w-0 flex-col", {
                  "relative h-[calc(100dvh-154px)]": !isDismissed,
                })}
              >
                {isPremium && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/")}
                    className="bg-background/80 shadow-little-pretty absolute top-2 left-0 z-10 h-9 w-14 justify-end gap-0.5 rounded-l-none border px-2 backdrop-blur-sm backdrop-saturate-150"
                  >
                    <HomeFillIcon className="text-primary size-5!" />
                    <ArrowLeft className="size-3!" />
                    <span className="sr-only">
                      Volver a la página principal
                    </span>
                  </Button>
                )}
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
                  session={session}
                  scrollRef={scrollRef}
                />
                {children}
              </>
            ) : (
              <ScrollArea
                scrollRef={scrollRef}
                className={cn("h-[calc(100dvh-16px)]", {
                  "h-[calc(100dvh-48px)]": !isDismissed,
                })}
              >
                <DesktopHeader
                  user={user}
                  session={session}
                  scrollRef={scrollRef}
                />

                {children}
              </ScrollArea>
            )}
          </SidebarInset>
        )}

        {!hideButtonUp && !isMobile && <ButtonUp scrollRef={scrollRef} />}

        <BottomNav />
      </ScrollContext.Provider>
    </div>
  );
};

export default LayoutWrapper;

function Background({ isPremium }: { isPremium: boolean }) {
  return (
    <motion.div
      data-id="background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        isPremium && "absolute inset-0",
      )}
    >
      <div className="before:absolute before:top-0 before:left-1/6 before:block before:size-96 before:-translate-x-1/2 before:rounded-full before:bg-linear-to-tr/shorter before:from-transparent before:to-indigo-300 before:opacity-30 before:blur-2xl after:absolute after:top-1/2 after:-left-[2%] after:z-10 after:block after:size-72 after:rounded-full after:bg-linear-to-tr/shorter after:from-fuchsia-300 after:to-transparent after:opacity-50 after:blur-2xl dark:before:bg-linear-to-br/shorter dark:before:from-transparent dark:before:to-indigo-900 dark:before:opacity-80 dark:after:top-1/2 dark:after:bg-linear-to-br/shorter dark:after:from-fuchsia-950 dark:after:opacity-80" />
    </motion.div>
  );
}
