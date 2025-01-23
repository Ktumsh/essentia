"use server";

import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import webpush from "web-push";

import { notificationSubscription, userNotification } from "../schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

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
