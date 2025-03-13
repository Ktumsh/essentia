import { toZonedTime } from "date-fns-tz";
import { eq, and, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { NextResponse } from "next/server";
import postgres from "postgres";
import webpush from "web-push";

import {
  notificationSubscription,
  userNotification,
  userTask,
} from "@/db/schema";
import { isSameDate } from "@/lib/utils";

webpush.setVapidDetails(
  "mailto:essentia.app.cl@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

const CRON_SECRET = process.env.CRON_SECRET!;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const nowUTC = new Date();

    const tasks = await db
      .select()
      .from(userTask)
      .where(
        and(
          eq(userTask.status, "active"),
          eq(userTask.time, nowUTC.toISOString().slice(11, 16)),
          or(
            eq(userTask.frequency, "Diariamente"),
            eq(userTask.frequency, "Semanalmente"),
            eq(userTask.frequency, "Mensualmente"),
            eq(userTask.frequency, "Anualmente"),
            eq(userTask.frequency, "No se repite"),
          ),
        ),
      );

    for (const task of tasks) {
      const subscriptions = await db
        .select()
        .from(notificationSubscription)
        .where(eq(notificationSubscription.userId, task.userId));

      if (subscriptions.length === 0) {
        console.log(`No hay suscripciones para el usuario ${task.userId}`);
        continue;
      }

      for (const sub of subscriptions) {
        const userTimezone = sub.timezone || "UTC";

        const userLocalTime = toZonedTime(nowUTC, userTimezone);
        const userCurrentTime = userLocalTime.toTimeString().slice(0, 5);

        if (userCurrentTime !== task.time) {
          continue;
        }

        let shouldSend = false;

        switch (task.frequency) {
          case "Diariamente":
            shouldSend = true;
            break;
          case "Semanalmente":
            const todayWeekDay = userLocalTime.toLocaleDateString("es-ES", {
              weekday: "long",
            });
            if (task.weekDay === todayWeekDay) {
              shouldSend = true;
            }
            break;
          case "Mensualmente":
            if (task.monthDay === userLocalTime.getDate()) {
              shouldSend = true;
            }
            break;
          case "Anualmente":
            const userMonth = userLocalTime.toLocaleString("es-ES", {
              month: "long",
            });
            if (
              task.month === userMonth &&
              task.monthDay === userLocalTime.getDate()
            ) {
              shouldSend = true;
            }
            break;
          case "No se repite":
            if (task.exactDate && isSameDate(task.exactDate, userLocalTime)) {
              shouldSend = true;
            }
            break;
        }

        if (!shouldSend) continue;

        const notificationPayload = {
          title: `Recordatorio: ${task.name}`,
          body: task.instructions,
          url: `/tasks/${task.id}`,
        };

        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        };

        try {
          await webpush.sendNotification(
            pushSubscription,
            JSON.stringify(notificationPayload),
          );
          console.log(`Notificación enviada a ${sub.endpoint}`);

          await db.insert(userNotification).values({
            userId: task.userId,
            title: notificationPayload.title,
            message: notificationPayload.body,
            url: notificationPayload.url,
          });
        } catch (error: any) {
          console.error(
            `Error al enviar notificación a ${sub.endpoint}:`,
            error,
          );

          if (error.statusCode === 410 || error.statusCode === 404) {
            await db
              .delete(notificationSubscription)
              .where(eq(notificationSubscription.endpoint, sub.endpoint));
            console.log(`Suscripción eliminada: ${sub.endpoint}`);
          }
        }

        if (task.frequency === "No se repite") {
          await db
            .update(userTask)
            .set({ status: "completed", updatedAt: new Date() })
            .where(eq(userTask.id, task.id));
        }
      }
    }

    return NextResponse.json(
      { message: "Recordatorios enviados" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en send-task-notifications:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
