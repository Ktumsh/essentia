import { tool } from "ai";
import { z } from "zod";

import { createUserTask } from "@/db/querys/task-querys";

import { generateTrackTask } from "../server";

interface CreateTrackTaskProp {
  userId: string;
  chatId: string;
}

export const createTrackTask = ({ userId, chatId }: CreateTrackTaskProp) =>
  tool({
    description: "Crea un seguimiento personalizado para una tarea específica",
    parameters: z.object({
      name: z.string().max(80).describe("Nombre de la tarea"),
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
        time: z
          .string()
          .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Hora en formato 24 horas (hh:mm)",
          )
          .describe("Hora específica para realizar la tarea"),
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
          .optional()
          .describe("Día de la semana para tareas semanales o sin repetición"),
        monthDay: z
          .number()
          .nullable()
          .optional()
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
          .optional()
          .describe("Mes para tareas anuales o sin repetición"),
      }),
    }),
    execute: async (args) => {
      try {
        const result = await generateTrackTask(args);

        const createdTask = await createUserTask({
          userId,
          chatId,
          name: result.task.name,
          instructions: result.task.instructions,
          frequency: result.task.schedule.frequency,
          time: result.task.schedule.time,
          exactDate: result.task.schedule.exactDate ?? null,
          weekDay: result.task.schedule.weekDay ?? null,
          monthDay: result.task.schedule.monthDay ?? null,
          month: result.task.schedule.month ?? null,
        });

        return createdTask;
      } catch (error) {
        console.error("Error en trackTask:", error);
        return { error: String(error) };
      }
    },
  });
