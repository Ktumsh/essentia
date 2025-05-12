"use server";

import { format, toZonedTime } from "date-fns-tz";
import {
  eq,
  desc,
  asc,
  and,
  gte,
  inArray,
  count,
  SQL,
  gt,
  lt,
  not,
} from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { VisibilityType } from "@/components/ui/layout/visibility-selector";
import {
  chat,
  chatVote,
  chatMessage,
  chatStream,
  type Chat,
  type ChatMessage,
  subscription,
  plan,
  userChatUsage,
  chatTool,
  ChatTool,
} from "@/db/schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function saveChat({
  id,
  userId,
  title,
  visibility,
}: {
  id: string;
  userId: string;
  title: string;
  visibility: VisibilityType;
}) {
  try {
    return await db
      .insert(chat)
      .values({ id, userId, title, createdAt: new Date(), visibility });
  } catch (error) {
    console.error("Error al guardar el chat:", error);
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(chatVote).where(eq(chatVote.chatId, id));
    await db.delete(chatMessage).where(eq(chatMessage.chatId, id));
    await db.delete(chatStream).where(eq(chatStream.chatId, id));

    return await db.delete(chat).where(eq(chat.id, id));
  } catch (error) {
    console.error("Error al eliminar el chat:", error);
    throw error;
  }
}

export async function deleteAllChatsByUserId({ id }: { id: string }) {
  try {
    await db.delete(chat).where(eq(chat.userId, id));
  } catch (error) {
    console.error("Error al eliminar los chats:", error);
    throw error;
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

    const query = (whereCondition?: SQL<any>) =>
      db
        .select()
        .from(chat)
        .where(
          whereCondition
            ? and(whereCondition, eq(chat.userId, id))
            : eq(chat.userId, id),
        )
        .orderBy(desc(chat.createdAt))
        .limit(extendedLimit);

    let filteredChats: Array<Chat> = [];

    if (startingAfter) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, startingAfter))
        .limit(1);

      if (!selectedChat) {
        throw new Error(`Chat with id ${startingAfter} not found`);
      }

      filteredChats = await query(gt(chat.createdAt, selectedChat.createdAt));
    } else if (endingBefore) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, endingBefore))
        .limit(1);

      if (!selectedChat) {
        throw new Error(`Chat with id ${endingBefore} not found`);
      }

      filteredChats = await query(lt(chat.createdAt, selectedChat.createdAt));
    } else {
      filteredChats = await query();
    }

    const hasMore = filteredChats.length > limit;

    return {
      chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
      hasMore,
    };
  } catch (error) {
    console.error("Error al obtener los chats:", error);
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db
      .select()
      .from(chat)
      .where(eq(chat.id, id))
      .limit(1);

    return selectedChat;
  } catch (error) {
    console.error("Error al obtener el chat:", error);
    throw error;
  }
}

export async function getChatTitle({ id }: { id: string }) {
  try {
    const [selectedChat] = await db
      .select({ title: chat.title })
      .from(chat)
      .where(eq(chat.id, id))
      .limit(1);

    return selectedChat?.title;
  } catch (error) {
    console.error("Error al obtener el título del chat:", error);
    throw error;
  }
}

export async function saveMessages({
  messages,
}: {
  messages: Array<ChatMessage>;
}) {
  try {
    return await db.insert(chatMessage).values(messages).onConflictDoNothing();
  } catch (error) {
    console.error("Error al guardar los mensajes:", error);
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    return await db.select().from(chatMessage).where(eq(chatMessage.id, id));
  } catch (error) {
    console.error("Error al obtener el mensaje:", error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(chatMessage)
      .where(eq(chatMessage.chatId, id))
      .orderBy(asc(chatMessage.createdAt));
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await db
      .select({ id: chatMessage.id })
      .from(chatMessage)
      .where(
        and(
          eq(chatMessage.chatId, chatId),
          gte(chatMessage.createdAt, timestamp),
        ),
      );

    const messageIds = messagesToDelete.map((message) => message.id);

    if (messageIds.length > 0) {
      await db
        .delete(chatVote)
        .where(
          and(
            eq(chatVote.chatId, chatId),
            inArray(chatVote.messageId, messageIds),
          ),
        );

      return await db
        .delete(chatMessage)
        .where(
          and(
            eq(chatMessage.chatId, chatId),
            inArray(chatMessage.id, messageIds),
          ),
        );
    }
  } catch (error) {
    console.error(
      "Error al eliminar los mensajes después de la marca de tiempo:",
      error,
    );
    throw error;
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: "up" | "down";
}) {
  try {
    const [existingVote] = await db
      .select()
      .from(chatVote)
      .where(and(eq(chatVote.messageId, messageId)));

    if (existingVote) {
      return await db
        .update(chatVote)
        .set({ isUpvoted: type === "up" })
        .where(
          and(eq(chatVote.messageId, messageId), eq(chatVote.chatId, chatId)),
        );
    }
    return await db.insert(chatVote).values({
      chatId,
      messageId,
      isUpvoted: type === "up",
    });
  } catch (error) {
    console.error("Error al votar el mensaje:", error);
    throw error;
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await db.select().from(chatVote).where(eq(chatVote.chatId, id));
  } catch (error) {
    console.error("Error al obtener los votos:", error);
    throw error;
  }
}

export async function updateChatVisibilityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  try {
    return await db.update(chat).set({ visibility }).where(eq(chat.id, chatId));
  } catch (error) {
    console.error("Error al actualizar la visibilidad del chat:", error);
    throw error;
  }
}

export async function getMissingKeys() {
  const keysRequired = ["OPENAI_API_KEY"];
  return keysRequired
    .map((key) => (process.env[key] ? "" : key))
    .filter((key) => key !== "");
}

export async function updateChatTitle({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) {
  try {
    return await db.update(chat).set({ title }).where(eq(chat.id, chatId));
  } catch (error) {
    console.error("Error al actualizar el título del chat:", error);
    throw error;
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  try {
    const twentyFourHoursAgo = new Date(
      Date.now() - differenceInHours * 60 * 60 * 1000,
    );

    const [stats] = await db
      .select({ count: count(chatMessage.id) })
      .from(chatMessage)
      .innerJoin(chat, eq(chatMessage.chatId, chat.id))
      .where(
        and(
          eq(chat.userId, id),
          gte(chatMessage.createdAt, twentyFourHoursAgo),
          eq(chatMessage.role, "user"),
        ),
      )
      .execute();

    return stats?.count ?? 0;
  } catch (error) {
    console.error(
      "Error al obtener el conteo de mensajes por ID de usuario en las últimas 24 horas de la base de datos",
    );
    throw error;
  }
}

export async function createStreamId({
  streamId,
  chatId,
}: {
  streamId: string;
  chatId: string;
}) {
  try {
    await db
      .insert(chatStream)
      .values({ id: streamId, chatId, createdAt: new Date() });
  } catch (error) {
    console.error("Failed to create stream id in database");
    throw error;
  }
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }) {
  try {
    const streamIds = await db
      .select({ id: chatStream.id })
      .from(chatStream)
      .where(eq(chatStream.chatId, chatId))
      .orderBy(asc(chatStream.createdAt))
      .execute();

    return streamIds.map(({ id }) => id);
  } catch (error) {
    console.error("Failed to get stream ids by chat id from database");
    throw error;
  }
}

export async function getRemainingMessages(
  userId: string,
): Promise<number | null> {
  const todayDate = format(
    toZonedTime(new Date(), "America/Santiago"),
    "yyyy-MM-dd",
    { timeZone: "America/Santiago" },
  );

  const [sub] = await db
    .select({ type: subscription.type })
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .limit(1);
  if (!sub?.type) return null;

  const [planData] = await db
    .select({ max: plan.maxChatMessagesPerDay })
    .from(plan)
    .where(eq(plan.id, sub.type))
    .limit(1);
  if (!planData?.max) return null;

  const [usage] = await db
    .select({ used: userChatUsage.messagesUsed })
    .from(userChatUsage)
    .where(
      and(eq(userChatUsage.userId, userId), eq(userChatUsage.date, todayDate)),
    );

  const used = usage?.used ?? 0;
  return Math.max(planData.max - used, 0);
}

export async function canSendMessage(userId: string): Promise<boolean> {
  const todayDate = format(
    toZonedTime(new Date(), "America/Santiago"),
    "yyyy-MM-dd",
    { timeZone: "America/Santiago" },
  );

  const [sub] = await db
    .select({ type: subscription.type })
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .limit(1);
  if (!sub?.type)
    throw new Error("Usuario sin plan activo o con tipo inválido");

  const [planData] = await db
    .select({ max: plan.maxChatMessagesPerDay })
    .from(plan)
    .where(eq(plan.id, sub.type))
    .limit(1);
  if (!planData?.max) return true;

  const [usage] = await db
    .select({ messagesUsed: userChatUsage.messagesUsed })
    .from(userChatUsage)
    .where(
      and(eq(userChatUsage.userId, userId), eq(userChatUsage.date, todayDate)),
    );

  return !usage || usage.messagesUsed < planData.max;
}

export async function incrementUserChatUsage(userId: string) {
  const todayDate = format(
    toZonedTime(new Date(), "America/Santiago"),
    "yyyy-MM-dd",
    { timeZone: "America/Santiago" },
  );

  const [sub] = await db
    .select({ type: subscription.type })
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .limit(1);
  if (!sub?.type) return;

  const [planData] = await db
    .select({ maxChatMessagesPerDay: plan.maxChatMessagesPerDay })
    .from(plan)
    .where(eq(plan.id, sub.type))
    .limit(1);
  if (!planData?.maxChatMessagesPerDay) return;

  const [usage] = await db
    .select()
    .from(userChatUsage)
    .where(
      and(eq(userChatUsage.userId, userId), eq(userChatUsage.date, todayDate)),
    );

  if (usage) {
    await db
      .update(userChatUsage)
      .set({ messagesUsed: usage.messagesUsed + 1 })
      .where(eq(userChatUsage.id, usage.id));
  } else {
    await db.insert(userChatUsage).values({
      userId,
      date: todayDate,
      messagesUsed: 1,
    });
  }
}

export async function decrementUserChatUsage(userId: string): Promise<boolean> {
  const todayDate = format(
    toZonedTime(new Date(), "America/Santiago"),
    "yyyy-MM-dd",
    { timeZone: "America/Santiago" },
  );

  const [usage] = await db
    .select()
    .from(userChatUsage)
    .where(
      and(eq(userChatUsage.userId, userId), eq(userChatUsage.date, todayDate)),
    );

  if (!usage || usage.messagesUsed <= 0) return false;

  await db
    .update(userChatUsage)
    .set({ messagesUsed: usage.messagesUsed - 1 })
    .where(eq(userChatUsage.id, usage.id));

  return true;
}

export type ToolGroup = {
  toolName: string;
  invocations: Array<{
    toolCallId: string;
    args: any;
    result?: any;
  }>;
};

export async function saveChatToolsFromMessageParts({
  message,
}: {
  message: ChatMessage;
}) {
  try {
    const parts = message.parts as any[];

    const invocations = parts
      .filter((p) => p.type === "tool-invocation")
      .map((p) => {
        const tool = p.toolInvocation;
        return {
          chatMessageId: message.id,
          toolName: tool.toolName,
          toolCallId: tool.toolCallId,
          args: tool.args,
          result: tool.result,
          createdAt: message.createdAt,
        };
      });

    if (invocations.length > 0) {
      await db.insert(chatTool).values(invocations).onConflictDoNothing();
    }
  } catch (error) {
    console.error("Error al guardar herramientas del mensaje:", error);
    throw error;
  }
}

const BANNED_TOOLS = ["getWeather", "createTrackTask"] as const;

export async function getGroupedChatToolsByUser(userId: string): Promise<
  Array<{
    toolName: string;
    count: number;
    latest: Date | null;
    recentDates: Date[];
  }>
> {
  try {
    const rows = await db
      .select({
        toolName: chatTool.toolName,
        createdAt: chatTool.createdAt,
      })
      .from(chatTool)
      .innerJoin(chatMessage, eq(chatTool.chatMessageId, chatMessage.id))
      .innerJoin(chat, eq(chatMessage.chatId, chat.id))
      .where(
        and(
          eq(chat.userId, userId),
          not(inArray(chatTool.toolName, BANNED_TOOLS)),
        ),
      )
      .orderBy(desc(chatTool.createdAt));

    const groups = new Map<
      string,
      {
        toolName: string;
        count: number;
        latest: Date | null;
        recentDates: Date[];
      }
    >();

    for (const { toolName, createdAt } of rows) {
      const existing = groups.get(toolName) ?? {
        toolName,
        count: 0,
        latest: null,
        recentDates: [],
      };

      existing.count++;
      if (!existing.latest || createdAt > existing.latest) {
        existing.latest = createdAt;
      }
      if (existing.recentDates.length < 6) {
        existing.recentDates.push(createdAt);
      }

      groups.set(toolName, existing);
    }

    return Array.from(groups.values());
  } catch (error) {
    console.error("Error al agrupar herramientas por usuario:", error);
    throw error;
  }
}

export async function getToolsByUserAndToolName({
  userId,
  toolName,
}: {
  userId: string;
  toolName: string;
}): Promise<ChatTool[]> {
  try {
    return await db
      .select({
        id: chatTool.id,
        toolCallId: chatTool.toolCallId,
        chatMessageId: chatTool.chatMessageId,
        toolName: chatTool.toolName,
        args: chatTool.args,
        result: chatTool.result,
        createdAt: chatTool.createdAt,
      })
      .from(chatTool)
      .innerJoin(chatMessage, eq(chatTool.chatMessageId, chatMessage.id))
      .innerJoin(chat, eq(chatMessage.chatId, chat.id))
      .where(and(eq(chat.userId, userId), eq(chatTool.toolName, toolName)))
      .orderBy(desc(chatTool.createdAt));
  } catch (error) {
    console.error("Error al obtener herramientas para el usuario:", error);
    throw error;
  }
}
