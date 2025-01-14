import { Metadata } from "next";

import NotificationsSettingsWrapper from "@/modules/settings/components/notifications-settings-wrapper";

export const metadata: Metadata = {
  title: "Configuración / Notificaciones",
  alternates: {
    canonical: "/settings/notifications",
  },
};

const NotificationsSettingsPage = () => {
  return <NotificationsSettingsWrapper />;
};

export default NotificationsSettingsPage;
