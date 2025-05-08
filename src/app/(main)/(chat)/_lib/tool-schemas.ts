import { z } from "zod";

export const routineSchema = z.object({
  routine: z.object({
    exercises: z.array(
      z.object({
        name: z.string().describe("Nombre del ejercicio"),
        reps: z
          .number()
          .nullable()
          .describe("Número de repeticiones por serie"),
        sets: z.number().nullable().describe("Número de series por ejercicio"),
        duration: z
          .string()
          .nullable()
          .describe("Duración del ejercicio o serie"),
        rest: z
          .string()
          .nullable()
          .describe("Tiempo de descanso entre series o ejercicios"),
        progression: z
          .string()
          .nullable()
          .describe("Instrucciones para aumentar la dificultad"),
        equipment: z.string().nullable().describe("Equipamiento necesario"),
        instructions: z
          .string()
          .nullable()
          .describe("Instrucciones detalladas del ejercicio"),
        benefits: z.string().nullable().describe("Beneficios para la salud"),
        modifications: z
          .string()
          .nullable()
          .describe("Modificaciones para distintos niveles o limitaciones"),
      }),
    ),
    durationWeeks: z.number().describe("Número de semanas de la rutina"),
    goal: z.string().describe("Objetivo principal del usuario"),
    fitnessLevel: z.string().describe("Nivel de condición física del usuario"),
    warmUp: z
      .string()
      .nullable()
      .describe("Recomendaciones para el calentamiento"),
    coolDown: z
      .string()
      .nullable()
      .describe("Recomendaciones para el enfriamiento"),

    schedule: z
      .array(
        z.object({
          day: z.string().describe("Día de la semana"),
          exercises: z
            .array(z.string())
            .describe("Ejercicios programados para el día"),
        }),
      )
      .nullable()
      .describe("Programa semanal de ejercicios"),
    recommendations: z
      .string()
      .nullable()
      .describe("Recomendaciones finales basadas en el progreso esperado"),
  }),
});

export type Routine = z.infer<typeof routineSchema.shape.routine>;

export const healthRiskSchema = z.object({
  healthRisk: z.object({
    diabetes: z.object({
      percentage: z.number().describe("Porcentaje de riesgo de diabetes"),
      level: z.string().describe("Nivel de riesgo de diabetes"),
      interpretation: z
        .string()
        .nullable()
        .describe("Interpretación personalizada del riesgo de diabetes"),
      recommendedActions: z
        .string()
        .nullable()
        .describe("Acciones recomendadas para reducir el riesgo de diabetes"),
    }),
    heartDisease: z.object({
      percentage: z
        .number()
        .describe("Porcentaje de riesgo de enfermedad cardiaca"),
      level: z.string().describe("Nivel de riesgo de enfermedad cardiaca"),
      interpretation: z
        .string()
        .nullable()
        .describe("Interpretación personalizada del riesgo cardiaco"),
      recommendedActions: z
        .string()
        .nullable()
        .describe("Acciones recomendadas para reducir el riesgo cardiaco"),
    }),
    hypertension: z.object({
      percentage: z.number().describe("Porcentaje de riesgo de hipertensión"),
      level: z.string().describe("Nivel de riesgo de hipertensión"),
      interpretation: z
        .string()
        .nullable()
        .describe("Interpretación personalizada del riesgo de hipertensión"),
      recommendedActions: z
        .string()
        .nullable()
        .describe(
          "Acciones recomendadas para reducir el riesgo de hipertensión",
        ),
    }),
    lungDisease: z.object({
      percentage: z
        .number()
        .describe("Porcentaje de riesgo de enfermedad pulmonar"),
      level: z.string().describe("Nivel de riesgo de enfermedad pulmonar"),
      interpretation: z
        .string()
        .nullable()
        .describe("Interpretación personalizada del riesgo pulmonar"),
      recommendedActions: z
        .string()
        .nullable()
        .describe("Acciones recomendadas para reducir el riesgo pulmonar"),
    }),
    kidneyDisease: z.object({
      percentage: z
        .number()
        .describe("Porcentaje de riesgo de enfermedad renal"),
      level: z.string().describe("Nivel de riesgo de enfermedad renal"),
      interpretation: z
        .string()
        .nullable()
        .describe("Interpretación personalizada del riesgo renal"),
      recommendedActions: z
        .string()
        .nullable()
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

export type HealthRisk = z.infer<typeof healthRiskSchema.shape.healthRisk>;

export const nutritionalPlanSchema = z.object({
  nutritionalPlan: z.object({
    breakfast: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (desayuno)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        }),
      )
      .nullable(),
    lunch: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (almuerzo)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        }),
      )
      .nullable(),
    snack: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (snack)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        }),
      )
      .nullable(),
    dinner: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (cena)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        }),
      )
      .nullable(),
    additional: z
      .array(
        z.object({
          type: z.string().describe("Tipo de la comida (adicional)"),
          name: z.string().describe("Nombre del alimento o plato"),
          quantity: z.string().describe("Cantidad o porción"),
          calories: z.number().describe("Calorías del alimento o plato"),
          time: z.string().describe("Horario sugerido"),
        }),
      )
      .nullable(),
    totalCalories: z.number().nullable().describe("Calorías totales diarias"),
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

export type NutritionalPlan = z.infer<
  typeof nutritionalPlanSchema.shape.nutritionalPlan
>;

export const moodTrackSchema = z.object({
  moodTrack: z.object({
    mood: z.array(
      z.object({
        activity: z.string().describe("Actividad de bienestar recomendada"),
        description: z
          .string()
          .describe("Descripción detallada de la actividad"),
      }),
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
      .nullable(),
  }),
});

export type MoodTrack = z.infer<typeof moodTrackSchema.shape.moodTrack>;

export const taskSchema = z.object({
  task: z.object({
    name: z.string().describe("Nombre de la tarea"),
    instructions: z
      .string()
      .describe(
        "Instrucción breve y estructurada para generar un mensaje de notificación",
      ),
    schedule: z.object({
      frequency: z
        .enum([
          "No se repite",
          "Diariamente",
          "Semanalmente",
          "Mensualmente",
          "Anualmente",
        ])
        .describe("Frecuencia de la tarea"),
      time: z.string().describe("Hora específica para realizar la tarea"),
      exactDate: z
        .string()
        .nullable()
        .describe("Fecha exacta en formato ISO (YYYY-MM-DD)"),
      weekDay: z
        .enum([
          "lunes",
          "martes",
          "miércoles",
          "jueves",
          "viernes",
          "sábado",
          "domingo",
        ])
        .nullable()
        .describe("Día de la semana para tareas semanales o sin repetición"),
      monthDay: z
        .number()
        .nullable()
        .describe(
          "Día del mes para tareas mensuales, anuales o sin repetición",
        ),
      month: z
        .enum([
          "enero",
          "febrero",
          "marzo",
          "abril",
          "mayo",
          "junio",
          "julio",
          "agosto",
          "septiembre",
          "octubre",
          "noviembre",
          "diciembre",
        ])
        .nullable()
        .describe("Mes para tareas anuales o sin repetición"),
    }),
  }),
});

export type Task = z.infer<typeof taskSchema.shape.task>;
