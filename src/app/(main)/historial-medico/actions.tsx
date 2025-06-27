"use server";

import { generateObject } from "ai";

import { getCurrentUser } from "@/lib/current-user";

import { AI_RECOMMENDATION_PROMPT, GeneratePayload } from "./_lib/prompt";
import { AIRecommendationSchema } from "./schema";
import { modelProvider } from "../(chat)/_lib/models";

import type { AIRecommendation } from "@/lib/types";

const SUPPORTED_FILE_TYPES = ["application/pdf"];
const SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg"];

export async function generateAiMedicalRecommendations(
  payload: GeneratePayload,
): Promise<AIRecommendation[] | { error: string }> {
  const currentUser = await getCurrentUser();
  const isPremium = currentUser?.isPremium || false;
  if (!isPremium) {
    return {
      error:
        "Debes ser usuario premium para generar recomendaciones médicas con IA.",
    };
  }
  const prompt = AI_RECOMMENDATION_PROMPT(payload);
  const model = modelProvider.languageModel("chat-model-reasoning");

  // 1. Construimos el array de promesas para cada documento
  const docPromises = payload.documents
    .filter((doc) => doc.file?.url && doc.file.contentType)
    .map(async (doc) => {
      const { file, condition, id } = doc;
      const { url, contentType } = file!;

      // Solo bajamos el buffer si es PDF, las imágenes van como URL
      if (SUPPORTED_FILE_TYPES.includes(contentType)) {
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();
        return {
          type: "file" as const,
          data: buffer,
          mimeType: contentType,
          filename: `${condition}-${id}.pdf`,
        };
      }

      if (SUPPORTED_IMAGE_TYPES.includes(contentType)) {
        return {
          type: "image" as const,
          image: url,
        };
      }

      return null; // tipo no soportado
    });

  // 2. Disparamos todas las descargas a la vez
  const docContents = (await Promise.all(docPromises)).filter(
    (
      item,
    ): item is
      | { type: "file"; data: ArrayBuffer; mimeType: string; filename: string }
      | { type: "image"; image: string } => item !== null,
  );

  // 3. Armamos el contenido final, incluyendo la pregunta si existe
  const content: (
    | { type: "text"; text: string }
    | { type: "file"; data: ArrayBuffer; mimeType: string; filename: string }
    | { type: "image"; image: string }
  )[] = [];

  if (payload.question) {
    content.push({ type: "text", text: payload.question });
  }
  content.push(...docContents);

  if (content.length === 0) {
    return {
      error: "Por favor, sube un PDF o imagen médica, o escribe una pregunta.",
    };
  }

  // 4. Llamada final al modelo
  try {
    const { object: result } = await generateObject({
      model,
      system: prompt,
      schema: AIRecommendationSchema,
      messages: [{ role: "user", content }],
    });

    const recommendations: AIRecommendation[] = result.recommendations.map(
      (rec: Omit<AIRecommendation, "id">) => ({
        ...rec,
        id: crypto.randomUUID(),
        relatedDocuments: rec.relatedDocuments || [],
        relatedTags: rec.relatedTags || [],
      }),
    );

    return recommendations;
  } catch (err) {
    console.error("❌ Error generando recomendaciones con IA:", err);
    throw new Error("No se pudo generar recomendaciones. Intenta nuevamente.");
  }
}
