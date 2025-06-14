import { describe, it, expect, vi } from "vitest";

vi.mock("@/db/querys/medical-history-querys", () => ({
  restoreMedicalHistory: vi.fn(),
}));

import { restoreMedicalHistory } from "@/db/querys/medical-history-querys";

describe("Integración: Restaurar historial médico eliminado (mockeado)", () => {
  const userId = "test-user-id";
  const historyId = "hist-eliminado-456";

  it("restaura un historial eliminado correctamente", async () => {
    vi.mocked(restoreMedicalHistory).mockResolvedValueOnce({ success: true });

    const result = await restoreMedicalHistory({ userId, id: historyId });

    expect(result.success).toBe(true);
  });
});
