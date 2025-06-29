import AiSection from "./_components/ai-section";
import CtaSection from "./_components/cta-section";
import FeatureSection from "./_components/feature-section";
import HeroSection from "./_components/hero-section";
import MedicalHistorySection from "./_components/medical-history-section";
import ProgressSection from "./_components/progress-section";
import ResourcesSection from "./_components/resources-section";
import VisionSection from "./_components/vision-section";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descubre",
  alternates: {
    canonical: "/essentia",
  },
};

export default async function DiscoverPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeatureSection />
      <ResourcesSection />
      <MedicalHistorySection />
      <AiSection />
      <ProgressSection />
      <VisionSection />
      <CtaSection />
    </div>
  );
}
