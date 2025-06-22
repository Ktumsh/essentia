import AccesibilityStgWrp from "./_components/accesiblity-stg-wrp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración / Preferencias y accesibilidad",
  alternates: {
    canonical: "/settings/accesibility",
  },
};

export default function AccesibilityStgPage() {
  return <AccesibilityStgWrp />;
}
