import { LEGAL_DATA } from "@/db/data/legal-data";

import LegalWrapper from "../_components/legal-wrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacityPage() {
  const privacy = LEGAL_DATA.privacyPolicy;
  return (
    <LegalWrapper
      title={privacy.title}
      description={privacy.description}
      lastUpdated={privacy.lastUpdated}
      content={privacy.content}
    />
  );
}
