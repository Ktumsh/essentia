import { describe, it, expect, vi } from "vitest";

// Mocks
vi.mock("@/db/querys/profile-querys", () => ({
  getUserProfileById: vi.fn(() => [
    {
      user: {
        id: "test-user-id",
        email: "test@essentia.cl",
        username: "essuser",
        createdAt: new Date(),
      },
      profile: {
        firstName: "Fabián",
        lastName: "Iturra",
        profileImage: null,
        birthdate: null,
        bio: null,
        genre: null,
        weight: null,
        height: null,
        location: null,
      },
      subscription: {
        isPremium: true,
      },
    },
  ]),
  getUserProfileByUsername: vi.fn(() => []),
}));

vi.mock("@/db/querys/user-querys", () => ({
  getUserTrialStatus: vi.fn(() => ({
    isActive: false,
    startedAt: null,
    expiresAt: null,
    hasUsed: true,
    ip: "127.0.0.1",
  })),
}));

import { getUserData } from "@/utils";

describe("Integración: getUserData (mockeado)", () => {
  it("devuelve los datos combinados de usuario, perfil y trial", async () => {
    const result = await getUserData({ userId: "test-user-id" });

    expect(result.id).toBe("test-user-id");
    expect(result.email).toBe("test@essentia.cl");
    expect(result.firstName).toBe("Fabián");
    expect(result.trial.isActive).toBe(false);
    expect(result.isPremium).toBe(true);
  });

  it("lanza error si no se proporciona userId ni username", async () => {
    await expect(getUserData({})).rejects.toThrow(
      "Sesión no válida o username no proporcionado.",
    );
  });
});
