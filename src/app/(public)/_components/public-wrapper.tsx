"use client";

import { useRef } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import Footer from "./footer";
import Navbar from "./navbar";
import ScrollToTopButton from "../essentia/_components/scroll-to-top-button";

const PublicWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={scrollRef}
      className="min-h-screen min-w-screen overflow-y-auto bg-gradient-to-br from-rose-50 via-purple-50 to-sky-50"
    >
      <Navbar scrollRef={scrollRef} />
      <main className="overflow-hidden">{children}</main>
      <Footer />
      {isMobile ? (
        <ScrollToTopButton />
      ) : (
        <ScrollToTopButton scrollRef={scrollRef} />
      )}
    </div>
  );
};

export default PublicWrapper;
