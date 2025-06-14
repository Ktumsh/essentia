import { describe, it, expect, vi } from "vitest";

vi.mock("@/db/querys/ai-recommendations-querys", () => ({
  updateAiRecommendationNotes: vi.fn(),
}));

import { updateAiRecommendationNotes } from "@/db/querys/ai-recommendations-querys";

describe("Integración: Actualizar notas de recomendación IA (mockeado)", () => {
  it("debería actualizar correctamente las notas de la recomendación", async () => {
    const userId = "user-abc";
    const recommendationId = "rec-123";
    const newNotes = "Paciente debe realizar chequeo en 3 meses";

    vi.mocked(updateAiRecommendationNotes).mockResolvedValueOnce({
      success: true,
    });

    const result = await updateAiRecommendationNotes({
      userId,
      recommendationId,
      notes: newNotes,
    });

    expect(result).toEqual({ success: true });
  });
});
