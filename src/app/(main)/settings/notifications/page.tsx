import { auth } from "@/app/(auth)/auth";

import NotificationsStgWrp from "./_components/notifications-stg-wrp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración / Notificaciones y recordatorios",
  alternates: {
    canonical: "/settings/notifications",
  },
};

export default async function NotificationsStgPage() {
  const session = await auth();

  if (!session?.user) return null;

  return <NotificationsStgWrp />;
}
