import { tool } from "ai";
import { z } from "zod";

import { generateMoodTracking } from "../actions";

export const createMoodTrack = tool({
  description:
    "Mostrar recomendación de actividades para mejorar el estado de ánimo",
  parameters: z.object({
    mood: z.string().describe("Estado de ánimo"),
  }),
  execute: async (args) => {
    try {
      const results = await generateMoodTracking(args);
      return results;
    } catch (error) {
      console.error("Error en moodTracking:", error);
      return { error: String(error) };
    }
  },
});
