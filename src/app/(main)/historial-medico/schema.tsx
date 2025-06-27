import { z } from "zod";

export const validMedicalTagNames = [
  "Alergia",
  "Cirugía",
  "Consulta General",
  "Diagnóstico",
  "Enfermedad Crónica",
  "Examen de Laboratorio",
  "Examen de Imagenología",
  "Medicación",
  "Vacunación",
  "Salud Mental",
  "Nutrición",
  "Odontología",
  "Oftalmología",
  "Pediatría",
  "Cardiología",
  "Dermatología",
  "Neurología",
  "Certificado Médico",
  "Informe Médico",
  "Epicrisis",
  "Consentimiento Informado",
  "Receta Médica",
  "Rehabilitación",
  "Ginecología",
  "Otro",
] as const;

export const AIRecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      type: z
        .enum(["general", "preventive", "lifestyle", "followUp", "medication"])
        .describe("Tipo de recomendación médica"),
      title: z.string().describe("Título de la recomendación"),
      description: z
        .string()
        .describe("Descripción detallada de la recomendación"),
      priority: z
        .enum(["critical", "high", "medium", "low"])
        .describe("Prioridad de la recomendación"),
      confidence: z
        .number()
        .min(0)
        .max(1)
        .describe("Confianza de la recomendación"),
      actionItems: z
        .array(z.string())
        .describe("Lista de acciones recomendadas para el paciente"),
      relatedTags: z
        .array(z.enum(validMedicalTagNames))
        .describe("Etiquetas relacionadas con la recomendación médica"),
      relatedDocuments: z
        .array(z.string())
        .describe(
          "IDs de documentos médicos relacionados con la recomendación",
        ),
    }),
  ),
});
