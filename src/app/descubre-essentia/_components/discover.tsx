"use client";

import { useRef } from "react";

import AiSection from "./ai-section";
import CtaSection from "./cta-section";
import FeatureSection from "./feature-section";
import Footer from "./footer";
import HeroSection from "./hero-section";
import MedicalHistorySection from "./medical-history-section";
import Navbar from "./navbar";
import ProgressSection from "./progress-section";
import ResourcesSection from "./resources-section";
import ScrollToTopButton from "./scroll-to-top-button";
import VisionSection from "./vision-section";

const Discover = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={scrollRef}
      className="min-h-screen min-w-screen overflow-y-auto bg-gradient-to-br from-rose-50 via-purple-50 to-sky-50"
    >
      <Navbar scrollRef={scrollRef} />
      <main>
        <HeroSection />
        <FeatureSection />
        <ResourcesSection />
        <MedicalHistorySection />
        <AiSection />
        <ProgressSection />
        <VisionSection />
        <CtaSection />
      </main>
      <Footer />
      <ScrollToTopButton scrollRef={scrollRef} />
    </div>
  );
};

export default Discover;
