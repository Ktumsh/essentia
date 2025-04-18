"use client";

import { useIsMobile } from "@/hooks/use-mobile";

import NotificationsStg from "./notifications-stg";

const NotificationsStgWrp = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return <NotificationsStg isMobile={isMobile} />;
};

export default NotificationsStgWrp;
