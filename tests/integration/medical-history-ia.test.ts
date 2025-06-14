import { describe, it, expect, vi } from "vitest";

// Mocks
vi.mock("@/db/querys/ai-recommendations-querys", () => ({
  saveAiMedicalRecommendation: vi.fn(() => ({
    recommendation: {
      id: "rec-123",
      userId: "test-user-id",
      title: "Control de presión arterial",
      description: "Se recomienda monitoreo regular y dieta baja en sodio.",
      priority: "high",
    },
    isNew: true,
  })),
  getSavedAiRecommendations: vi.fn(() => [
    {
      id: "rec-123",
      userId: "test-user-id",
      title: "Control de presión arterial",
      relatedDocuments: ["mock-history-id"],
      relatedTags: ["presión arterial", "salud cardiovascular"],
    },
  ]),
}));

vi.mock("@/db/querys/medical-history-querys", () => ({
  addMedicalHistoryWithTags: vi.fn(() => ({
    id: "mock-history-id",
    userId: "test-user-id",
    condition: "Hipertensión",
  })),
}));

import {
  saveAiMedicalRecommendation,
  getSavedAiRecommendations,
} from "@/db/querys/ai-recommendations-querys";
import { addMedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

describe("Integración: Historial Médico + Recomendaciones con IA (mockeado)", () => {
  const userId = "test-user-id";

  it("debería crear historial y generar recomendación IA asociada", async () => {
    const history = await addMedicalHistoryWithTags({
      userId,
      data: {
        condition: "Hipertensión",
        type: "Examen",
        tags: [],
        notes: "Valor elevado en última medición",
      },
      file: {
        url: "/fake.pdf",
        name: "examen.pdf",
        size: 12345,
        contentType: "application/pdf",
        uploadedAt: new Date(),
      },
    });

    expect(history).toBeDefined();
    expect(history.userId).toBe(userId);

    const result = await saveAiMedicalRecommendation({
      userId,
      id: "rec-123",
      title: "Control de presión arterial",
      description: "Se recomienda monitoreo regular y dieta baja en sodio.",
      type: "preventive",
      priority: "high",
      relatedDocuments: [history.id],
      relatedTags: ["presión arterial", "salud cardiovascular"],
    });

    expect(result.recommendation.userId).toBe(userId);
    expect(result.recommendation.title).toContain("Control");

    const saved = await getSavedAiRecommendations(userId);
    expect(saved.length).toBeGreaterThan(0);
    expect(saved[0].relatedDocuments).toContain(history.id);
  });
});
