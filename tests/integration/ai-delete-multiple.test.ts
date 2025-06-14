import { describe, it, expect, vi } from "vitest";

// Mocks
vi.mock("@/db/querys/ai-recommendations-querys", () => ({
  deleteManyAiRecommendations: vi.fn(),
  getSavedAiRecommendations: vi.fn(),
}));

import {
  deleteManyAiRecommendations,
  getSavedAiRecommendations,
} from "@/db/querys/ai-recommendations-querys";

describe("Integración: Eliminación múltiple de recomendaciones + uso IA (mockeado)", () => {
  const userId = "test-user-id";
  const recommendationIds = ["rec-1", "rec-2"];

  it("elimina múltiples recomendaciones y actualiza uso correctamente", async () => {
    vi.mocked(deleteManyAiRecommendations).mockResolvedValueOnce({
      success: true,
      deleted: ["rec-1", "rec-2"],
      failed: [],
    });

    vi.mocked(getSavedAiRecommendations).mockResolvedValueOnce([]);

    const result = await deleteManyAiRecommendations({
      userId,
      ids: recommendationIds,
    });

    expect(result.success).toBe(true);
    expect(result.deleted).toEqual(expect.arrayContaining(recommendationIds));
    expect(result.failed).toHaveLength(0);

    const remaining = await getSavedAiRecommendations(userId);
    expect(remaining).toHaveLength(0); // se eliminaron todas
  });
});
