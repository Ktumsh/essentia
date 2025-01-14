import { Metadata } from "next";

import AccesibilitySettingsWrapper from "@/modules/settings/components/accesiblity-settings-wrapper";

export const metadata: Metadata = {
  title: "Configuración / Accesibilidad y pantalla",
  alternates: {
    canonical: "/settings/accesibility",
  },
};

const AccesibilitySettingsPage = () => {
  return <AccesibilitySettingsWrapper />;
};

export default AccesibilitySettingsPage;
