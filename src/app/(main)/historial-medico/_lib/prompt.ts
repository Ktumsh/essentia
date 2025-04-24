import { validMedicalTagNames } from "@/lib/form-schemas";

export type GeneratePayload = {
  documents: {
    id: string;
    condition: string;
    description: string;
    tags: string[];
    type: string;
    issuer?: string | null;
    documentDate?: string | null;
    file?: {
      url: string;
      contentType: string;
    };
  }[];
  question: string | null;
};

export function AI_RECOMMENDATION_PROMPT(payload: GeneratePayload) {
  const currentDate = new Date().toISOString().split("T")[0];

  const docSummary = payload.documents
    .map((d) => {
      const date = d.documentDate || "sin fecha";
      return `- ${d.condition} (${d.tags.join(", ")}) → ID: ${d.id}, Fecha: ${date}`;
    })
    .join("\n");

  return `
  Eres un asistente médico experto. A partir del historial médico del usuario descrito a continuación, genera recomendaciones breves y claras para mejorar su salud.

  Fecha actual: ${currentDate}

  Historial médico:
  ${docSummary}

  ${payload.question ? `Pregunta del usuario: ${payload.question}\n` : ""}

  Considera la fecha actual y la antigüedad de los documentos al priorizar tus recomendaciones. Si un documento es muy antiguo, podría no ser tan relevante como uno reciente.

  Devuelve las recomendaciones como un JSON válido, dentro de un objeto con esta forma exacta:
  {
    "recommendations": [
      {
        "type": "...",
        "title": "...",
        "description": "...",
        "priority": "...",
        "relatedTags": [...],
        "relatedDocuments": [...]
      }
    ]
  }

  Reglas para cada recomendación:
  - "type": SOLO uno de estos valores EXACTOS → "general", "preventive", "lifestyle", "followUp", "medication". ❌ No uses otros como "nutrition".
  - "title": un título breve.
  - "description": una recomendación clara dirigida al usuario (ej: "Basado en tu historial...", "Es recomendable...", etc.).
  - "priority": SOLO uno de → "high", "medium", "low".
  - "relatedTags": debe contener etiquetas válidas que provienen del historial médico. ❌ No inventes.
  - "relatedDocuments": SOLO los IDs EXACTOS de los documentos relevantes, tomados desde el historial anterior.

  Etiquetas válidas:
  ${validMedicalTagNames.join(", ")}

⚠️ IMPORTANTE: Devuelve SOLO el JSON. ❌ NO incluyas explicaciones ni texto adicional.
  `.trim();
}
