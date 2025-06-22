import Centers from "./_components/centers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centros de salud",
  alternates: {
    canonical: "/centros-de-salud",
  },
};

export default function HealthCentersPage() {
  return <Centers />;
}
