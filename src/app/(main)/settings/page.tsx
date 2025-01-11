import { Metadata } from "next";

import SettingsWrapper from "@/modules/settings/components/settings-wrapper";

export const metadata: Metadata = {
  title: "Configuración",
  alternates: {
    canonical: "/settings",
  },
};

const SettingsPage = async () => {
  return <SettingsWrapper />;
};

export default SettingsPage;
