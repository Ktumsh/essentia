"use server";

import { and, desc, eq, isNull } from "drizzle-orm";
import webpush from "web-push";

import { db } from "../db";
import {
  notificationSubscription,
  user,
  userRouteProgress,
  userNotification,
} from "../schema";

export async function subscribeNotifications(
  userId: string,
  subscription: webpush.PushSubscription,
  timezone: string,
) {
  const existingSubscription = await db
    .select()
    .from(notificationSubscription)
    .where(eq(notificationSubscription.endpoint, subscription.endpoint));

  if (existingSubscription.length > 0) {
    await db
      .update(notificationSubscription)
      .set({
        userId,
        p256dh: subscription.keys.p256dh!,
        auth: subscription.keys.auth!,
        timezone,
      })
      .where(eq(notificationSubscription.endpoint, subscription.endpoint));
  } else {
    await db.insert(notificationSubscription).values({
      userId,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh!,
      auth: subscription.keys.auth!,
      timezone,
    });
  }
}

export async function unsubscribeNotifications(endpoint: string) {
  await db
    .delete(notificationSubscription)
    .where(eq(notificationSubscription.endpoint, endpoint));
}

export async function getAllSubscriptions() {
  return await db.select().from(notificationSubscription);
}

export async function createNotification({
  userId,
  title,
  message,
  url,
}: {
  userId: string;
  title: string;
  message: string;
  url?: string;
}) {
  await db.insert(userNotification).values({
    userId,
    title,
    message,
    url,
  });
}

export async function notifyUsersWithoutCourse() {
  try {
    const usersWithoutCourse = await db
      .select({ id: user.id, email: user.email })
      .from(user)
      .leftJoin(userRouteProgress, eq(user.id, userRouteProgress.userId))
      .where(isNull(userRouteProgress.userId));

    for (const u of usersWithoutCourse) {
      const existingNotification = await db
        .select({ id: userNotification.id })
        .from(userNotification)
        .where(
          and(
            eq(userNotification.userId, u.id),
            eq(
              userNotification.title,
              "¡Comienza a explorar nuestras rutas de aprendizaje!",
            ),
            eq(
              userNotification.message,
              "Observamos que todavía no has iniciado ninguna de nuestras rutas de aprendizaje. ¡No esperes más y comienza ahora!",
            ),
          ),
        )
        .limit(1);

      if (existingNotification.length === 0) {
        await createNotification({
          userId: u.id,
          title: "¡Comienza a explorar nuestras rutas de aprendizaje!",
          message:
            "Observamos que todavía no has iniciado ninguna de nuestras rutas de aprendizaje. ¡No esperes más y comienza ahora!",
          url: "/salud-y-bienestar",
        });
      }
    }
  } catch (error) {
    console.error("Error al notificar usuarios sin ruta:", error);
  }
}

export async function getUserNotifications(userId: string) {
  return await db
    .select()
    .from(userNotification)
    .where(eq(userNotification.userId, userId))
    .orderBy(desc(userNotification.createdAt));
}

export async function markNotificationAsRead(notificationId: string) {
  await db
    .update(userNotification)
    .set({ isRead: true })
    .where(eq(userNotification.id, notificationId));
}

export async function deleteNotification(notificationId: string) {
  await db
    .delete(userNotification)
    .where(eq(userNotification.id, notificationId));
}

export async function deleteAllNotifications(userId: string) {
  await db.delete(userNotification).where(eq(userNotification.userId, userId));
}

export async function markAllNotificationsAsRead(userId: string) {
  await db
    .update(userNotification)
    .set({ isRead: true })
    .where(eq(userNotification.userId, userId));
}
