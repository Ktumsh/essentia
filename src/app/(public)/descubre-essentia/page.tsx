import { Metadata } from "next";

import AiSection from "./_components/ai-section";
import CtaSection from "./_components/cta-section";
import FeatureSection from "./_components/feature-section";
import HeroSection from "./_components/hero-section";
import MedicalHistorySection from "./_components/medical-history-section";
import ProgressSection from "./_components/progress-section";
import ResourcesSection from "./_components/resources-section";
import VisionSection from "./_components/vision-section";

export const metadata: Metadata = {
  title: "Descubre",
  alternates: {
    canonical: "/descubre-essentia",
  },
};

export default async function DiscoverPage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <ResourcesSection />
      <MedicalHistorySection />
      <AiSection />
      <ProgressSection />
      <VisionSection />
      <CtaSection />
    </>
  );
}
