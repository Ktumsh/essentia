"use client";

import { useIsMobile } from "@/components/hooks/use-mobile";

import PushNotificationManager from "./notifications-settings";

const NotificationsSettingsWrapper = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return <PushNotificationManager />;
};

export default NotificationsSettingsWrapper;
