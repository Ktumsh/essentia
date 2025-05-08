"use server";

import { generateText, Message } from "ai";
import { cookies } from "next/headers";

import { VisibilityType } from "@/components/ui/layout/visibility-selector";
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisibilityById,
} from "@/db/querys/chat-querys";
import { deleteTasksByChatIdAfterTimestamp } from "@/db/querys/task-querys";

import { modelProvider } from "./_lib/models";

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("chat-model", model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: Message;
}) {
  const { text: title } = await generateText({
    model: modelProvider.languageModel("title-model"),
    system: `\n
    - Generarás un título breve basado en el primer mensaje con el que un usuario inicia una conversación
    - asegúrate de que no tenga más de 80 caracteres
    - asegúrate de que no tenga más de 4 palabras
    - el título debe ser un resumen del mensaje del usuario
    - no utilices comillas ni dos puntos`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });

  await deleteTasksByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisibilityById({ chatId, visibility });
}
