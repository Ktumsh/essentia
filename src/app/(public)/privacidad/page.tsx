import { LEGAL_DATA } from "@/consts/legal-data";

import LegalWrapper from "../_components/legal-wrapper";

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
