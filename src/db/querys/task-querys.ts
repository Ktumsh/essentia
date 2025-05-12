"use server";

import { eq, and, gte, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { userTask } from "../schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function createUserTask(args: {
  userId: string;
  chatId: string;
  name: string;
  instructions: string;
  frequency:
    | "No se repite"
    | "Diariamente"
    | "Semanalmente"
    | "Mensualmente"
    | "Anualmente";
  time: string;
  exactDate?: Date | null;
  weekDay?: string | null;
  monthDay?: number | null;
  month?: string | null;
}) {
  const existingTask = await db
    .select()
    .from(userTask)
    .where(
      and(
        eq(userTask.userId, args.userId),
        eq(userTask.name, args.name),
        eq(userTask.frequency, args.frequency),
        eq(userTask.time, args.time),
        args.exactDate
          ? eq(userTask.exactDate, args.exactDate)
          : isNull(userTask.exactDate),
        args.weekDay
          ? eq(userTask.weekDay, args.weekDay)
          : isNull(userTask.weekDay),
        args.monthDay
          ? eq(userTask.monthDay, args.monthDay)
          : isNull(userTask.monthDay),
        args.month ? eq(userTask.month, args.month) : isNull(userTask.month),
      ),
    );

  if (existingTask.length > 0) {
    return existingTask[0];
  }

  const [task] = await db
    .insert(userTask)
    .values({
      userId: args.userId,
      chatId: args.chatId,
      name: args.name,
      instructions: args.instructions,
      frequency: args.frequency,
      time: args.time,
      exactDate: args.exactDate ?? null,
      weekDay: args.weekDay ?? null,
      monthDay: args.monthDay ?? null,
      month: args.month ?? null,
    })
    .returning();

  return {
    task: {
      id: task.id,
      userId: task.userId,
      chatId: task.chatId,
      name: task.name,
      instructions: task.instructions,
      frequency: task.frequency,
      time: task.time,
      exactDate: task.exactDate,
      weekDay: task.weekDay,
      monthDay: task.monthDay,
      month: task.month,
    },
  };
}

export async function getUserTask(userId: string, chatId: string) {
  const [task] = await db
    .select()
    .from(userTask)
    .where(and(eq(userTask.userId, userId), eq(userTask.chatId, chatId)));

  return task;
}

export async function getUserTasks(userId: string) {
  const tasks = await db
    .select()
    .from(userTask)
    .where(eq(userTask.userId, userId));
  return tasks;
}

export async function updateUserTask(
  taskId: string,
  userId: string,
  data: {
    name?: string;
    instructions?: string;
    frequency?:
      | "No se repite"
      | "Diariamente"
      | "Semanalmente"
      | "Mensualmente"
      | "Anualmente";
    time?: string;
    exactDate?: Date | null;
    weekDay?: string | null;
    monthDay?: number | null;
    month?: string | null;
    status?: "completed" | "active" | "paused";
  },
) {
  const newData = {
    ...data,
    exactDate: data.exactDate ?? null,
    weekDay: data.weekDay ?? null,
    monthDay: data.monthDay ?? null,
    month: data.month ?? null,
    updatedAt: new Date(),
  };
  try {
    const [updated] = await db
      .update(userTask)
      .set(newData)
      .where(and(eq(userTask.id, taskId), eq(userTask.userId, userId)))
      .returning();

    return updated;
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    throw new Error("No se pudo actualizar la tarea.");
  }
}

export async function updateUserTaskStatus(
  taskId: string,
  status: "completed" | "active" | "paused",
) {
  const updated = await db
    .update(userTask)
    .set({ status, updatedAt: new Date() })
    .where(eq(userTask.id, taskId))
    .returning();

  return updated;
}

export async function deleteUserTask(taskId: string) {
  console.log("Deleting task with id:", taskId);
  const deleted = await db
    .delete(userTask)
    .where(eq(userTask.id, taskId))
    .returning();

  console.log("Task deleted:", deleted);
  return deleted;
}

export async function deleteTasksByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    await db
      .delete(userTask)
      .where(
        and(eq(userTask.chatId, chatId), gte(userTask.createdAt, timestamp)),
      );
  } catch (error) {
    console.error("Error al eliminar las tareas asociadas al chat:", error);
    throw error;
  }
}
