import { Metadata } from "next";

import AccesibilitySettingsWrapper from "@/modules/settings/components/accesiblity-settings-wrapper";

export const metadata: Metadata = {
  title: "Configuración - Preferencias y accesibilidad",
  alternates: {
    canonical: "/settings/accesibility",
  },
};

const AccesibilitySettingsPage = () => {
  return <AccesibilitySettingsWrapper />;
};

export default AccesibilitySettingsPage;
