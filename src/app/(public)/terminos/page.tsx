import { LEGAL_DATA } from "@/db/data/legal-data";

import LegalWrapper from "../_components/legal-wrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  alternates: {
    canonical: "/terminos",
  },
};

export default function TermsPage() {
  const terms = LEGAL_DATA.termsOfService;
  return (
    <LegalWrapper
      title={terms.title}
      description={terms.description}
      lastUpdated={terms.lastUpdated}
      content={terms.content}
    />
  );
}
