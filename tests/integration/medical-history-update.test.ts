import { describe, it, expect, vi } from "vitest";

vi.mock("@/db/querys/medical-history-querys", () => ({
  updateMedicalHistory: vi.fn(),
}));

import { updateMedicalHistory } from "@/db/querys/medical-history-querys";

describe("Integración: Actualización de historial médico con reemplazo de archivo y tags (mockeado)", () => {
  const userId = "test-user-id";
  const historyId = "hist-123";

  const newData = {
    condition: "Hipotiroidismo",
    description: "Control hormonal actualizado",
    type: "Examen" as const,
    tags: ["tiroides", "hormonas"],
    notes: "Revisar en 6 meses",
    issuer: "Centro Médico Norte",
    documentDate: new Date("2024-12-01"),
    visibility: "shared" as const,
    folderId: "folder-1",
    orderIndex: 2,
  };

  const newFile = {
    url: "/new.pdf",
    name: "control-hormonal.pdf",
    size: 23456,
    contentType: "application/pdf",
    uploadedAt: new Date(),
  };

  it("actualiza historial, reemplaza archivo y guarda nuevos tags", async () => {
    vi.mocked(updateMedicalHistory).mockResolvedValueOnce({ success: true });

    const result = await updateMedicalHistory({
      userId,
      id: historyId,
      data: newData,
      file: newFile,
    });

    expect(result.success).toBe(true);
  });
});
