"use client";

import { Session } from "next-auth";
import { useRef } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import Navbar from "./navbar";
import PublicFooter from "./public-footer";
import ScrollToTopButton from "./scroll-to-top-button";

interface PublicWrapperProps {
  children: React.ReactNode;
  session: Session | null;
}

const PublicWrapper = ({ children, session }: PublicWrapperProps) => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="relative flex size-full flex-col md:max-h-dvh md:min-h-dvh md:flex-row">
      <div
        ref={scrollRef}
        className="min-h-screen min-w-screen overflow-y-auto bg-linear-to-br/shorter from-rose-50 via-purple-50 to-sky-50 dark:from-rose-950/50 dark:via-purple-950/50 dark:to-sky-950/50"
      >
        <Navbar scrollRef={scrollRef} session={session} />
        <main>{children}</main>
        <PublicFooter />
        {isMobile ? (
          <ScrollToTopButton />
        ) : (
          <ScrollToTopButton scrollRef={scrollRef} />
        )}
      </div>
    </div>
  );
};

export default PublicWrapper;
