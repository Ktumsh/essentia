"use server";

import { type CoreUserMessage, generateText } from "ai";
import { cookies } from "next/headers";

import { gptFlashModel } from "@/modules/chatbot/ai";

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
    - el título debe ser un resumen del mensaje del usuario
    - no utilices comillas ni dos puntos`,
    prompt: JSON.stringify(message),
  });

  return title;
}
