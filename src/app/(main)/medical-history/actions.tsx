"use server";

import { generateObject } from "ai";

import { AIRecommendationSchema } from "@/lib/form-schemas";

import { AIRecommendationType } from "./_components/ai-recommendation";
import { AI_RECOMMENDATION_PROMPT, GeneratePayload } from "./_lib/prompt";
import { modelProvider } from "../(chat)/_lib/ai/models";

export async function generateAiMedicalRecommendations(
  payload: GeneratePayload,
): Promise<AIRecommendationType[]> {
  const prompt = AI_RECOMMENDATION_PROMPT(payload);

  const files = await Promise.all(
    payload.documents
      .filter((doc) => doc.file?.url)
      .map(async (doc) => {
        const res = await fetch(doc.file!.url);
        const buffer = await res.arrayBuffer();

        return {
          type: "file" as const,
          data: buffer,
          mimeType: doc.file!.contentType,
          filename: `${doc.condition}-${doc.id}`,
        };
      }),
  );

  const content: (
    | { type: "text"; text: string }
    | {
        type: "file";
        data: ArrayBuffer;
        mimeType: string;
        filename: string;
      }
  )[] = [
    {
      type: "text",
      text: prompt,
    },
    ...files,
  ];

  try {
    const { object: result } = await generateObject({
      model: modelProvider.languageModel("chat-model-large"),
      schema: AIRecommendationSchema,
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });

    return result.recommendations;
  } catch (err) {
    console.error("❌ Error generando recomendaciones con IA:", err);
    throw new Error("No se pudo generar recomendaciones. Intenta nuevamente.");
  }
}
