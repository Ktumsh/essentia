import { tool } from "ai";
import { z } from "zod";

import { generateHealthRisk } from "../server";

export const createHealthRisk = tool({
  description: "Mostrar evaluación de riesgo de salud",
  parameters: z.object({
    weight: z.number().describe("Peso"),
    height: z.number().describe("Altura"),
    familyHistory: z.string().describe("Historial familiar"),
    lifestyle: z.string().describe("Estilo de vida"),
    healthConditions: z.string().describe("Condiciones de salud preexistentes"),
  }),
  execute: async (args) => {
    try {
      const results = await generateHealthRisk({
        ...args,
        currentDate: new Date(),
      });
      return results;
    } catch (error) {
      console.error("Error en riskAssessment:", error);
      return { error: String(error) };
    }
  },
});
