import { fireworks } from "@ai-sdk/fireworks";
import { openai } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

export const DEFAULT_CHAT_MODEL: string = "chat-model-small";

export const modelProvider = customProvider({
  languageModels: {
    "chat-model-small": openai("gpt-4o-mini-2024-07-18"),
    "chat-model-large": openai("gpt-4o-2024-11-20"),
    "chat-model-reasoning": wrapLanguageModel({
      model: fireworks("accounts/fireworks/models/deepseek-r1"),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": openai("gpt-4o-mini"),
  },
  imageModels: {
    "small-model": openai.image("dall-e-2"),
    "large-model": openai.image("dall-e-3"),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const CHAT_MODELS: Array<ChatModel> = [
  {
    id: "chat-model-small",
    name: "Modelo rápido",
    description: "Respuestas ágiles para consultas generales",
  },
  {
    id: "chat-model-large",
    name: "Modelo avanzado",
    description: "Mayor profundidad y contexto en las respuestas",
  },
  {
    id: "chat-model-reasoning",
    name: "Modelo de razonamiento",
    description: "Análisis y toma de decisiones complejas",
  },
];
