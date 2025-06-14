import { describe, it, expect, vi } from "vitest";

vi.mock("@/db/querys/medical-history-querys", () => ({
  deleteMedicalHistory: vi.fn(),
}));

import { deleteMedicalHistory } from "@/db/querys/medical-history-querys";

describe("Integración: Eliminar historial médico (mockeado)", () => {
  it("retorna success: true al eliminar historial", async () => {
    const userId = "test-user-id";
    const historyId = "hist-001";

    vi.mocked(deleteMedicalHistory).mockResolvedValueOnce({
      success: true,
    });

    const result = await deleteMedicalHistory({ userId, id: historyId });

    expect(result).toEqual({ success: true });
  });
});
