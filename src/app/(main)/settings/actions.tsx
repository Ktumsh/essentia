/* eslint-disable import/no-named-as-default-member */
"use server";

import webpush from "web-push";

import { siteConfig } from "@/config/site";
import {
  createNotification,
  getAllSubscriptions,
  subscribeNotifications,
  unsubscribeNotifications,
} from "@/db/querys/notification-querys";

webpush.setVapidDetails(
  "mailto:essentia.app.cl@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function subscribeUser(
  userId: string,
  subscription: webpush.PushSubscription,
  timeZone: string,
) {
  try {
    await subscribeNotifications(userId, subscription, timeZone);
    return { success: true };
  } catch (error) {
    console.error("Error subscribing user:", error);
    return { success: false, error: "Failed to subscribe user" };
  }
}

export async function unsubscribeUser(endpoint: string) {
  try {
    await unsubscribeNotifications(endpoint);
    return { success: true };
  } catch (error) {
    console.error("Error unsubscribing user:", error);
    return { success: false, error: "Failed to unsubscribe user" };
  }
}

export async function sendAndSaveNotification({
  userId,
  title = "Notificación",
  message,
  url = siteConfig.url,
}: {
  userId: string;
  title?: string;
  message: string;
  url?: string;
}) {
  try {
    const subscriptions = await getAllSubscriptions();

    for (const sub of subscriptions) {
      if (sub.userId === userId) {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.p256dh,
                auth: sub.auth,
              },
            },
            JSON.stringify({
              title,
              body: message,
              icon: "/icon.png",
              badge: "/icon.png",
              url,
            }),
          );
        } catch (error: any) {
          if (error.statusCode === 410) {
            await unsubscribeNotifications(sub.endpoint);
          } else {
            console.error("Error enviando notificación:", error);
          }
        }
      }
    }

    await createNotification({ userId, title, message, url });

    return { success: true };
  } catch (error) {
    console.error("Error sending or saving notification:", error);
    return { success: false, error: "Failed to send or save notification" };
  }
}
