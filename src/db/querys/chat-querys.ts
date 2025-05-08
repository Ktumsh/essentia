"use server";

import { eq, desc, asc, and, gte, inArray, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { VisibilityType } from "@/components/ui/layout/visibility-selector";
import {
  chat,
  chatVote,
  chatMessage,
  type ChatMessage,
  chatStream,
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

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(chat)
      .where(eq(chat.userId, id))
      .orderBy(desc(chat.createdAt));
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
