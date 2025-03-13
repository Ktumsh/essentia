import { tool } from "ai";
import { z } from "zod";

import { generateRoutine } from "../server";

export const createRoutine = tool({
  description: "Mostrar rutina de ejercicios personalizada",
  parameters: z.object({
    objective: z.string().describe("Objetivo principal"),
    physicalLevel: z.string().describe("Nivel de condición física"),
    time: z.string().describe("Tiempo disponible para realizar la rutina"),
    preferences: z.string().describe("Preferencias"),
    healthConditions: z.string().describe("Condiciones de salud preexistentes"),
    equipment: z.string().describe("Disponibilidad de equipamiento"),
  }),
  execute: async (args) => {
    try {
      const results = await generateRoutine(args);
      return results;
    } catch (error) {
      console.error("Error en recommendExercise:", error);
      return { error: String(error) };
    }
  },
});
