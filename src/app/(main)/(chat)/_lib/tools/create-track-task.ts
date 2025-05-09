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
    description:
      "Crea un recordatorio o seguimiento personalizado para una activida específica",
    parameters: z.object({
      name: z.string().describe("Nombre de la activida"),
      schedule: z.object({
        frequency: z
          .enum([
            "No se repite",
            "Diariamente",
            "Semanalmente",
            "Mensualmente",
            "Anualmente",
          ])
          .describe("Frecuencia de la activida"),
        time: z.string().describe("Hora específica para realizar la activida"),
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
          .describe(
            "Día de la semana para actividades semanales o sin repetición",
          ),
        monthDay: z
          .number()
          .nullable()
          .describe(
            "Día del mes para actividades mensuales, anuales o sin repetición",
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
          .describe("Mes para actividades anuales o sin repetición"),
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
          exactDate: result.task.schedule.exactDate
            ? new Date(result.task.schedule.exactDate)
            : null,
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
