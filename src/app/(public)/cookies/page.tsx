import { LEGAL_DATA } from "@/db/data/legal-data";

import LegalWrapper from "../_components/legal-wrapper";

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
