"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";

import {
  deleteAllNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/db/querys/notification-querys";
import { UserNotification } from "@/db/schema";
import { fetcher } from "@/utils";

export const useActionNotifications = (userId: string) => {
  const { data: notifications = [], mutate } = useSWR<UserNotification[]>(
    `/api/notifications?userId=${userId}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  const handleMarkAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await markNotificationAsRead(notificationId);
        await mutate();
      } catch (error) {
        console.error("Error al marcar como leída:", error);
        throw error;
      }
    },
    [mutate],
  );

  const handleDeleteAll = useCallback(async () => {
    try {
      await deleteAllNotifications(userId);
      await mutate();
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
      throw error;
    }
  }, [userId, mutate]);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await markAllNotificationsAsRead(userId);
      await mutate();
    } catch (error) {
      console.error("Error al marcar como leídas:", error);
      throw error;
    }
  }, [userId, mutate]);

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
    notifications,
    hasUnreadNotifications,
    unreadNotifications,
    readNotifications,
    handleMarkAsRead,
    handleDeleteAll,
    handleMarkAllAsRead,
  };
};
