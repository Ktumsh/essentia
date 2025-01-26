"use server";

import { type CoreUserMessage, generateText } from "ai";
import { cookies } from "next/headers";

import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisibilityById,
} from "@/db/querys/chat-querys";
import { deleteTasksByChatIdAfterTimestamp } from "@/db/querys/task-querys";
import { gptFlashModel } from "@/modules/chatbot/ai";
import { VisibilityType } from "@/modules/chatbot/components/visibility-selector";

export async function saveModelId(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("model-id", model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: CoreUserMessage;
}) {
  const { text: title } = await generateText({
    model: gptFlashModel,
    system: `\n
    - Generarás un título breve basado en el primer mensaje con el que un usuario inicia una conversación
    - asegúrate de que no tenga más de 80 caracteres
    - asegúrate de que no tenga más de 3 palabras
    - el título debe ser un resumen del mensaje del usuario
    - no utilices comillas ni dos puntos`,
    prompt: JSON.stringify(message),
  });

  return title;
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
