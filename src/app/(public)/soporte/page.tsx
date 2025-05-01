import { Metadata } from "next";

import SupportContent from "./_components/support-content";

export const metadata: Metadata = {
  title: "Soporte",
  alternates: {
    canonical: "/soporte",
  },
};

export default function SupportPage() {
  return <SupportContent />;
}
