import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";

import SettingsWrapper from "./_components/settings-wrapper";

export const metadata: Metadata = {
  title: "Configuración",
  alternates: {
    canonical: "/settings",
  },
};

const SettingsPage = async () => {
  const session = await auth();
  return <SettingsWrapper session={session} />;
};

export default SettingsPage;
