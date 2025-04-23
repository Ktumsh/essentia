import { openai } from "@ai-sdk/openai";
import { customProvider } from "ai";

export const DEFAULT_CHAT_MODEL: string = "chat-model-small";

export const modelProvider = customProvider({
  languageModels: {
    "chat-model-small": openai.responses("gpt-4.1-mini"),
    "chat-model-large": openai.responses("gpt-4.1"),
    /* "chat-model-reasoning": wrapLanguageModel({
      model: fireworks("accounts/fireworks/models/deepseek-r1"),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }), */
    "chat-model-reasoning": openai.responses("o4-mini"),
    "title-model": openai("gpt-4.1-nano"),
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
