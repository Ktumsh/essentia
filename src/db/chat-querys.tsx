"use server";

import { Chat } from "@/types/chat";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/(auth)/auth";
import { sql } from "@vercel/postgres";

export async function saveChat(chat: Chat) {
  const { id, title, createdAt, userId, path, messages, sharePath } = chat;

  const query = `
    INSERT INTO chats (id, title, created_at, user_id, path, messages, share_path)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO UPDATE 
    SET title = EXCLUDED.title, created_at = EXCLUDED.created_at, user_id = EXCLUDED.user_id, path = EXCLUDED.path, messages = EXCLUDED.messages, share_path = EXCLUDED.share_path;
  `;

  const values = [
    id,
    title,
    createdAt,
    userId,
    path,
    JSON.stringify(messages),
    sharePath || null,
  ];

  revalidatePath(path);
  revalidatePath("/essentia-ai");

  await sql.query(query, values);
}

export async function getChat(id: string, userId: string) {
  const query = `
    SELECT * FROM chats WHERE id = $1;
  `;
  const values = [id];
  await sql.query(query, values);
  const res = await sql.query(query, values);

  const chat = res.rows[0];

  if (!chat || (userId && chat.user_id !== userId)) {
    return null;
  }

  chat.messages = JSON.parse(chat.messages);

  return chat;
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return [];
  }

  try {
    const query = `
      SELECT * FROM chats WHERE user_id = $1 ORDER BY created_at DESC;
    `;
    const values = [userId];
    const res = await sql.query(query, values);

    return res.rows.map((chat) => {
      chat.messages = JSON.parse(chat.messages);
      return chat;
    });
  } catch (error) {
    return [];
  }
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: "No autorizado",
    };
  }

  const uidQuery = `
    SELECT user_id FROM chats WHERE id = $1;
  `;
  const uidValues = [id];
  const uidRes = await sql.query(uidQuery, uidValues);

  const uid = uidRes.rows[0]?.user_id;

  if (uid !== session?.user?.id) {
    return {
      error: "No autorizado",
    };
  }

  const deleteQuery = `
    DELETE FROM chats WHERE id = $1;
  `;
  const deleteValues = [id];
  await sql.query(deleteQuery, deleteValues);

  revalidatePath("/");
  return revalidatePath(path);
}

export async function clearChats() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "No autorizado",
    };
  }

  const deleteQuery = `
    DELETE FROM chats WHERE user_id = $1;
  `;
  const deleteValues = [session.user.id];
  await sql.query(deleteQuery, deleteValues);

  revalidatePath("/essentia-ai");
  return redirect("/essentia-ai");
}

export async function shareChat(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "No autorizado",
    };
  }

  const query = `
    UPDATE chats 
    SET share_path = $1 
    WHERE id = $2 AND user_id = $3
    RETURNING *;
  `;
  const values = [`/share/${id}`, id, session.user.id];
  const res = await sql.query(query, values);

  if (res.rowCount === 0) {
    return {
      error: "Algo salió mal",
    };
  }

  return res.rows[0];
}

export async function getSharedChat(id: string) {
  const query = `
    SELECT * FROM chats WHERE id = $1 AND share_path IS NOT NULL;
  `;
  const values = [id];
  const res = await sql.query(query, values);

  if (res.rowCount === 0) {
    return null;
  }

  const chat = res.rows[0];

  chat.messages = JSON.parse(chat.messages);

  return chat;
}

export async function getMissingKeys() {
  const keysRequired = ["OPENAI_API_KEY"];
  return keysRequired
    .map((key) => (process.env[key] ? "" : key))
    .filter((key) => key !== "");
}
