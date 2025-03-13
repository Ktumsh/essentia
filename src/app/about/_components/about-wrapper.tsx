"use client";

import { Session } from "next-auth";
import { useRef } from "react";

import ButtonUp from "@/components/ui/layout/button-up";

import About from "./about";
import AboutHeader from "./about-header";

interface AboutWrapperProps {
  session: Session | null;
  isPremium: boolean | null;
}

const AboutWrapper = ({ session, isPremium }: AboutWrapperProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="flex flex-1 flex-col overflow-y-auto"
    >
      <AboutHeader
        scrollContainerRef={scrollContainerRef}
        session={session}
        isPremium={isPremium}
      />
      <About session={session} isPremium={isPremium} />
      <ButtonUp scrollRef={scrollContainerRef} />
    </div>
  );
};

export default AboutWrapper;
