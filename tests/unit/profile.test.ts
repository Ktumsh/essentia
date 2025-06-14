import { describe, it, expect, vi } from "vitest";

import {
  getUserProfileById,
  getUserProfileByUsername,
} from "@/db/querys/profile-querys";
import { getUserTrialStatus } from "@/db/querys/user-querys";
import { getUserData } from "@/utils";

// Mock manual de los módulos que importa
vi.mock("@/db/querys/profile-querys", () => ({
  getUserProfileById: vi.fn(),
  getUserProfileByUsername: vi.fn(),
}));

vi.mock("@/db/querys/user-querys", () => ({
  getUserTrialStatus: vi.fn(),
}));

describe("getUserData", () => {
  const mockUserProfile = {
    user: {
      id: "user123",
      email: "test@example.com",
      username: "testuser",
      createdAt: new Date("2023-01-01"),
    },
    profile: {
      firstName: "Test",
      lastName: "User",
      profileImage: "avatar.png",
      birthdate: "2000-01-01",
      bio: "Soy bio",
      genre: "otro",
      weight: 70,
      height: 170,
      location: "Chile",
    },
    subscription: {
      isPremium: false,
    },
  };

  const mockTrial = {
    isActive: true,
    startedAt: new Date("2024-01-01"),
    expiresAt: new Date("2024-01-07"),
    hasUsed: false,
    ip: "127.0.0.1",
  };

  it("devuelve datos del usuario usando userId", async () => {
    (getUserProfileById as any).mockResolvedValueOnce([mockUserProfile]);
    (getUserTrialStatus as any).mockResolvedValueOnce(mockTrial);

    const result = await getUserData({ userId: "user123" });

    expect(result).toMatchObject({
      id: "user123",
      email: "test@example.com",
      isPremium: true,
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      profileImage: "avatar.png",
      bio: "Soy bio",
      genre: "otro",
      weight: 70,
      height: 170,
      location: "Chile",
    });
  });

  it("devuelve datos del usuario usando username", async () => {
    (getUserProfileByUsername as any).mockResolvedValueOnce([mockUserProfile]);
    (getUserTrialStatus as any).mockResolvedValueOnce(mockTrial);

    const result = await getUserData({ username: "testuser" });

    expect(result.username).toBe("testuser");
  });

  it("lanza error si no se proporciona ni userId ni username", async () => {
    await expect(getUserData({})).rejects.toThrow(
      "Sesión no válida o username no proporcionado.",
    );
  });

  it("lanza error si no se encuentra perfil", async () => {
    (getUserProfileById as any).mockResolvedValueOnce([]);
    await expect(getUserData({ userId: "user123" })).rejects.toThrow(
      "Perfil no encontrado.",
    );
  });
});
