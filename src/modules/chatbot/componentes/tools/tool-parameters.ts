import { z } from "zod";

export const routineSchema = z.object({
  routine: z.object({
    exercises: z.array(
      z.object({
        name: z.string().describe("Nombre del ejercicio"),
        reps: z
          .number()
          .optional()
          .describe("Número de repeticiones por serie"),
        sets: z.number().optional().describe("Número de series por ejercicio"),
        duration: z
          .string()
          .optional()
          .describe("Duración del ejercicio o serie"),
        rest: z
          .string()
          .optional()
          .describe("Tiempo de descanso entre series o ejercicios"),
        progression: z
          .string()
          .describe("Instrucciones para aumentar la dificultad"),
        equipment: z.string().optional().describe("Equipamiento necesario"),
        instructions: z
          .string()
          .optional()
          .describe("Instrucciones detalladas del ejercicio"),
        benefits: z.string().optional().describe("Beneficios para la salud"),
        modifications: z
          .string()
          .optional()
          .describe("Modificaciones para distintos niveles o limitaciones"),
      })
    ),
    durationWeeks: z.number().describe("Número de semanas de la rutina"),
    goal: z.string().describe("Objetivo principal del usuario"),
    fitnessLevel: z.string().describe("Nivel de condición física del usuario"),
    warmUp: z
      .string()
      .optional()
      .describe("Recomendaciones para el calentamiento"),
    coolDown: z
      .string()
      .optional()
      .describe("Recomendaciones para el enfriamiento"),
    schedule: z
      .array(
        z.object({
          day: z.string().describe("Día de la semana"),
          exercises: z
            .array(z.string())
            .describe("Ejercicios programados para el día"),
        })
      )
      .optional()
      .describe("Programa semanal de ejercicios"),
    recommendations: z
      .string()
      .optional()
      .describe("Recomendaciones finales basadas en el progreso esperado"),
  }),
});

export const riskAssessmentSchema = z.object({
  riskAssessment: z.object({
    diabetes: z.object({
      percentage: z.number().describe("Porcentaje de riesgo de diabetes"),
      level: z.string().describe("Nivel de riesgo de diabetes"),
      interpretation: z
        .string()
        .optional()
        .describe("Interpretación personalizada del riesgo de diabetes"),
      recommendedActions: z
        .string()
        .optional()
        .describe("Acciones recomendadas para reducir el riesgo de diabetes"),
    }),
    heartDisease: z.object({
      percentage: z
        .number()
        .describe("Porcentaje de riesgo de enfermedad cardiaca"),
      level: z.string().describe("Nivel de riesgo de enfermedad cardiaca"),
      interpretation: z
        .string()
        .optional()
        .describe("Interpretación personalizada del riesgo cardiaco"),
      recommendedActions: z
        .string()
        .optional()
        .describe("Acciones recomendadas para reducir el riesgo cardiaco"),
    }),
    hypertension: z.object({
      percentage: z.number().describe("Porcentaje de riesgo de hipertensión"),
      level: z.string().describe("Nivel de riesgo de hipertensión"),
      interpretation: z
        .string()
        .optional()
        .describe("Interpretación personalizada del riesgo de hipertensión"),
      recommendedActions: z
        .string()
        .optional()
        .describe(
          "Acciones recomendadas para reducir el riesgo de hipertensión"
        ),
    }),
    lungDisease: z.object({
      percentage: z
        .number()
        .describe("Porcentaje de riesgo de enfermedad pulmonar"),
      level: z.string().describe("Nivel de riesgo de enfermedad pulmonar"),
      interpretation: z
        .string()
        .optional()
        .describe("Interpretación personalizada del riesgo pulmonar"),
      recommendedActions: z
        .string()
        .optional()
        .describe("Acciones recomendadas para reducir el riesgo pulmonar"),
    }),
    kidneyDisease: z.object({
      percentage: z
        .number()
        .describe("Porcentaje de riesgo de enfermedad renal"),
      level: z.string().describe("Nivel de riesgo de enfermedad renal"),
      interpretation: z
        .string()
        .optional()
        .describe("Interpretación personalizada del riesgo renal"),
      recommendedActions: z
        .string()
        .optional()
        .describe("Acciones recomendadas para reducir el riesgo renal"),
    }),
    generalRiskLevelPercentage: z
      .number()
      .describe("Porcentaje de riesgo general"),
    generalRiskLevel: z.string().describe("Nivel de riesgo general"),
    bmi: z.number().describe("Índice de masa corporal"),
    bmiLevel: z.string().describe("Interpretación del IMC"),
    recommendations: z
      .string()
      .describe("Recomendaciones generales según el nivel de riesgo"),
    assessmentDate: z.string().describe("Fecha actual de la evaluación"),
  }),
});

export const nutritionalPlanSchema = z.object({
  plan: z.object({
    breakfast: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (desayuno)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        })
      )
      .optional(),
    lunch: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (almuerzo)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        })
      )
      .optional(),
    snack: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (snack)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        })
      )
      .optional(),
    dinner: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (cena)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        })
      )
      .optional(),
    additional: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (adicional)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        })
      )
      .optional(),
    totalCalories: z.number().optional().describe("Calorías totales diarias"),
    macronutrients: z
      .object({
        proteins: z.number().describe("Gramos de proteínas"),
        carbohydrates: z.number().describe("Gramos de carbohidratos"),
        fats: z.number().describe("Gramos de grasas"),
      })
      .describe("Desglose de macronutrientes"),
    recommendations: z
      .string()
      .describe("Recomendaciones sobre el plan nutricional"),
  }),
});

export const moodTrackingSchema = z.object({
  moodTracking: z.object({
    mood: z.array(
      z.object({
        activity: z.string().describe("Actividad de bienestar recomendada"),
        description: z
          .string()
          .describe("Descripción detallada de la actividad"),
      })
    ),
    suggestion: z
      .string()
      .describe("Recomendación para mejorar el estado de ánimo"),
    tip: z.string().describe("Consejo de vida motivador"),
    poeticPhrase: z
      .object({
        phrase: z
          .string()
          .describe("Frase poética o inspiradora sin comillas."),
        author: z.string().describe("Autor real de la frase poética."),
      })
      .optional(),
  }),
});
