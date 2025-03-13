"use server";

import { eq, desc, asc, and, gte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { chat, chatVote, chatMessage, type ChatMessage } from "@/db/schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    return await db
      .insert(chat)
      .values({ id, userId, title, createdAt: new Date() });
  } catch (error) {
    console.error("Error al guardar el chat:", error);
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(chatVote).where(eq(chatVote.chatId, id));
    await db.delete(chatMessage).where(eq(chatMessage.chatId, id));

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
    return await db.insert(chatMessage).values(messages);
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
    return await db
      .delete(chatMessage)
      .where(
        and(
          eq(chatMessage.chatId, chatId),
          gte(chatMessage.createdAt, timestamp)
        )
      );
  } catch (error) {
    console.error("Error al eliminar los mensajes después del timestamp:");
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
          and(eq(chatVote.messageId, messageId), eq(chatVote.chatId, chatId))
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
