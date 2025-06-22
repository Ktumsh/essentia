import { auth } from "@/app/(auth)/auth";

import SettingsWrapper from "./_components/settings-wrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración",
  alternates: {
    canonical: "/settings",
  },
};

export default async function SettingsPage() {
  const session = await auth();

  return <SettingsWrapper session={session} />;
}
