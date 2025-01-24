"use client";

import { useCallback, useMemo } from "react";

import {
  deleteAllNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/db/querys/notification-querys";
import { UserNotification } from "@/db/schema";

export const useActionNotifications = (
  userId: string,
  notifications: UserNotification[],
) => {
  const handleMarkAsRead = useCallback(async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error("Error al marcar como leída:", error);
      throw error;
    }
  }, []);

  const handleDeleteAll = useCallback(async () => {
    try {
      await deleteAllNotifications(userId);
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
      throw error;
    }
  }, [userId]);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await markAllNotificationsAsRead(userId);
    } catch (error) {
      console.error("Error al marcar como leídas:", error);
      throw error;
    }
  }, [userId]);

  const hasUnreadNotifications = useMemo(
    () => notifications.some((n) => !n.isRead),
    [notifications],
  );

  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.isRead),
    [notifications],
  );

  const readNotifications = useMemo(
    () => notifications.filter((n) => n.isRead),
    [notifications],
  );

  return {
    hasUnreadNotifications,
    unreadNotifications,
    readNotifications,
    handleMarkAsRead,
    handleDeleteAll,
    handleMarkAllAsRead,
  };
};
