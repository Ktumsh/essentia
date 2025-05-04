import { tool } from "ai";
import { z } from "zod";

import { generateMoodTrack } from "../server";

export const createMoodTrack = tool({
  description:
    "Mostrar recomendación de actividades para mejorar el estado de ánimo",
  parameters: z.object({
    mood: z.string().describe("Estado de ánimo actual del usuario"),
  }),
  execute: async (args) => {
    try {
      const results = await generateMoodTrack(args);
      return results;
    } catch (error) {
      console.error("Error en moodTracking:", error);
      return { error: String(error) };
    }
  },
});
