import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";

import NotificationsStgWrp from "../_components/notifications-stg-wrp";

export const metadata: Metadata = {
  title: "Configuración / Notificaciones y recordatorios",
  alternates: {
    canonical: "/settings/notifications",
  },
};

const NotificationsStgPage = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return <NotificationsStgWrp />;
};

export default NotificationsStgPage;
