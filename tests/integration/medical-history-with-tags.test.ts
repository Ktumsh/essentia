import { describe, it, expect, vi } from "vitest";

vi.mock("@/db/querys/medical-history-querys", () => ({
  getMedicalHistory: vi.fn(),
}));

import { getMedicalHistory } from "@/db/querys/medical-history-querys";

describe("Integración: getMedicalHistory (mockeado)", () => {
  const userId = "test-user-id";

  it("retorna historial médico completo con tags y archivo asociado", async () => {
    vi.mocked(getMedicalHistory).mockResolvedValueOnce([
      {
        id: "hist-001",
        userId,
        condition: "Asma",
        description: "Control reciente",
        type: "Examen",
        tags: ["respiratorio", "control"],
        notes: "Chequeo trimestral",
        issuer: "Dr. López",
        documentDate: new Date("2024-12-01"),
        visibility: "private",
        folderId: "folder-123",
        orderIndex: 0,
        createdAt: new Date("2024-12-01"),
        updatedAt: new Date("2024-12-01"),
        isDeleted: false,
        isArchived: false,
        file: {
          id: "file-001",
          userId,
          medicalHistoryId: "hist-001",
          url: "/archivos/asma.pdf",
          name: "asma.pdf",
          size: 10240,
          contentType: "application/pdf",
          uploadedAt: new Date("2024-12-01"),
        },
      },
      {
        id: "hist-002",
        userId,
        condition: "Colesterol alto",
        description: null,
        type: "Receta",
        tags: [],
        notes: null,
        issuer: null,
        documentDate: null,
        visibility: "private",
        folderId: null,
        orderIndex: 1,
        createdAt: new Date("2024-11-01"),
        updatedAt: null,
        isDeleted: false,
        isArchived: false,
        file: null,
      },
    ]);

    const result = await getMedicalHistory({ userId });

    expect(result).toHaveLength(2);
    expect(result[0].tags).toContain("control");
    expect(result[0].file?.url).toBe("/archivos/asma.pdf");
    expect(result[1].file).toBeNull();
    expect(result[1].type).toBe("Receta");
    expect(result.every((r) => r.isDeleted === false)).toBe(true);
  });
});
