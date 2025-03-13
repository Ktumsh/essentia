import { tool } from "ai";
import { z } from "zod";

import { generateNutritionalPlan } from "../server";

export const createNutritionalPlan = tool({
  description: "Mostrar plan nutricional",
  parameters: z.object({
    dietType: z.string().describe("Tipo de alimento"),
    restrictions: z.string().describe("Restricciones"),
    calorieGoal: z.number().describe("Meta de calorías"),
    activityLevel: z.string().describe("Nivel de actividad"),
    weight: z.number().describe("Peso"),
    height: z.number().describe("Altura"),
    weightGoal: z.string().describe("Meta de peso"),
  }),
  execute: async (args) => {
    try {
      const results = await generateNutritionalPlan(args);
      return results;
    } catch (error) {
      console.error("Error en nutritionalAdvice:", error);
      return { error: String(error) };
    }
  },
});
