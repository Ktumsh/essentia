"use client";

import { Session } from "next-auth";
import { useRef } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import Footer from "./footer";
import Navbar from "./navbar";
import ScrollToTopButton from "../essentia/_components/scroll-to-top-button";

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
        className="min-h-screen min-w-screen overflow-y-auto bg-gradient-to-br from-rose-50 via-purple-50 to-sky-50"
      >
        <Navbar scrollRef={scrollRef} session={session} />
        <main>{children}</main>
        <Footer />
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
