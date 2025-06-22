import SupportContent from "./_components/support-content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soporte",
  alternates: {
    canonical: "/soporte",
  },
};

export default function SupportPage() {
  return <SupportContent />;
}
