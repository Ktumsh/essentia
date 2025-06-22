import { LEGAL_DATA } from "@/db/data/legal-data";

import LegalWrapper from "../_components/legal-wrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  const cookies = LEGAL_DATA.cookiesPolicy;
  return (
    <LegalWrapper
      title={cookies.title}
      description={cookies.description}
      lastUpdated={cookies.lastUpdated}
      content={cookies.content}
    />
  );
}
