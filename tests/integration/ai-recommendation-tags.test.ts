import { describe, it, expect, vi } from "vitest";

// Mocks
vi.mock("@/db/querys/ai-recommendations-querys", () => ({
  saveAiMedicalRecommendation: vi.fn(),
  getSavedAiRecommendations: vi.fn(),
}));

import {
  saveAiMedicalRecommendation,
  getSavedAiRecommendations,
} from "@/db/querys/ai-recommendations-querys";

describe("Integración: Guardado de Recomendaciones IA + Tags (mockeado)", () => {
  const userId = "test-user-id";
  const fakeRecommendationId = "rec-abc123";
  const relatedTags = ["nutrición", "presión arterial"];

  it("guarda recomendación con tags y los recupera correctamente", async () => {
    vi.mocked(saveAiMedicalRecommendation).mockResolvedValueOnce({
      recommendation: {
        id: fakeRecommendationId,
        userId,
        title: "Revisión nutricional",
        description:
          "Se recomienda ajustar la dieta para mejorar presión arterial.",
        type: "lifestyle",
        priority: "medium",
        notes: null,
        isDeleted: false,
        createdAt: new Date(),
      },
      isNew: true,
    });

    vi.mocked(getSavedAiRecommendations).mockResolvedValueOnce([
      {
        id: fakeRecommendationId,
        userId,
        title: "Revisión nutricional",
        description:
          "Se recomienda ajustar la dieta para mejorar presión arterial.",
        type: "lifestyle",
        priority: "medium",
        notes: null,
        isDeleted: false,
        createdAt: new Date(),
        relatedTags,
        relatedDocuments: [],
      },
    ]);

    const result = await saveAiMedicalRecommendation({
      userId,
      id: fakeRecommendationId,
      type: "lifestyle",
      title: "Revisión nutricional",
      description:
        "Se recomienda ajustar la dieta para mejorar presión arterial.",
      priority: "medium",
      relatedDocuments: [],
      relatedTags,
    });

    expect(result.isNew).toBe(true);
    expect(result.recommendation.userId).toBe(userId);
    expect(result.recommendation.title).toContain("nutricional");

    const saved = await getSavedAiRecommendations(userId);

    expect(saved.length).toBeGreaterThan(0);
    expect(saved[0].relatedTags).toEqual(expect.arrayContaining(relatedTags));
  });
});
