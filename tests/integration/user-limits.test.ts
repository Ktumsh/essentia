import { describe, it, expect, vi, beforeEach } from "vitest";

// Mocks
vi.mock("@/db/querys/user-querys", () => ({
  getUserSubscriptionInfo: vi.fn(),
}));
vi.mock("@/db/querys/ai-recommendations-querys", () => ({
  getUserRecommendationLimit: vi.fn(),
}));
vi.mock("@/db/querys/medical-history-querys", () => ({
  canUploadMedicalFile: vi.fn(),
}));

// Imports después de mocks
import { getUserRecommendationLimit } from "@/db/querys/ai-recommendations-querys";
import { canUploadMedicalFile } from "@/db/querys/medical-history-querys";
import { getUserSubscriptionInfo } from "@/db/querys/user-querys";

describe("Integración: Límite de documentos y recomendaciones IA (mockeado)", () => {
  const userId = "test-user-id";

  const mockPlan = {
    id: "plan-premium",
    name: "Premium",
    createdAt: new Date(),
    updatedAt: null,
    description: "Acceso total",
    maxDocuments: 50,
    isUnlimited: false,
    price: 12990,
    maxChatMessagesPerDay: 100,
    maxAiRecommendations: 25,
    isAvailable: true,
  };

  const mockSubscription = {
    id: "sub-123",
    status: "active",
    userId: userId,
    subscriptionId: "sub-ext",
    clientId: "client-abc",
    isPremium: true,
    type: "premium" as const,
    futureType: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 86400000),
  };

  const mockTrial = {
    hasUsed: true,
    isActive: false,
    expiresAt: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Usuario gratuito: 12 documentos, 0 recomendaciones IA", async () => {
    vi.mocked(getUserSubscriptionInfo).mockResolvedValueOnce({
      subscription: null,
      trial: mockTrial,
    });

    vi.mocked(getUserRecommendationLimit).mockResolvedValueOnce(0);

    vi.mocked(canUploadMedicalFile).mockResolvedValueOnce({
      allowed: true,
      current: 3,
      max: 12,
      isPremium: false,
      isUnlimited: false,
    });

    const upload = await canUploadMedicalFile(userId);
    const limit = await getUserRecommendationLimit(userId);

    expect(upload.max).toBe(12);
    expect(upload.isPremium).toBe(false);
    expect(upload.isUnlimited).toBe(false);
    expect(limit).toBe(0);
  });

  it("Usuario con trial activo: 12 documentos, 15 recomendaciones IA", async () => {
    vi.mocked(getUserSubscriptionInfo).mockResolvedValueOnce({
      subscription: null,
      trial: {
        hasUsed: false,
        isActive: true,
        expiresAt: new Date(Date.now() + 7 * 86400000),
      },
    });

    vi.mocked(getUserRecommendationLimit).mockResolvedValueOnce(15);

    vi.mocked(canUploadMedicalFile).mockResolvedValueOnce({
      allowed: true,
      current: 5,
      max: 12,
      isPremium: false,
      isUnlimited: false,
    });

    const upload = await canUploadMedicalFile(userId);
    const limit = await getUserRecommendationLimit(userId);

    expect(upload.max).toBe(12);
    expect(upload.isPremium).toBe(false);
    expect(upload.isUnlimited).toBe(false);
    expect(limit).toBe(15);
  });

  it("Usuario Premium: 50 documentos, 25 recomendaciones IA", async () => {
    vi.mocked(getUserSubscriptionInfo).mockResolvedValueOnce({
      subscription: {
        subscription: mockSubscription,
        plan: mockPlan,
      },
      trial: mockTrial,
    });

    vi.mocked(getUserRecommendationLimit).mockResolvedValueOnce(25);

    vi.mocked(canUploadMedicalFile).mockResolvedValueOnce({
      allowed: true,
      current: 10,
      max: 50,
      isPremium: true,
      isUnlimited: false,
    });

    const upload = await canUploadMedicalFile(userId);
    const limit = await getUserRecommendationLimit(userId);

    expect(upload.max).toBe(50);
    expect(upload.isPremium).toBe(true);
    expect(upload.isUnlimited).toBe(false);
    expect(limit).toBe(25);
  });

  it("Usuario Premium Plus: ilimitado", async () => {
    vi.mocked(getUserSubscriptionInfo).mockResolvedValueOnce({
      subscription: {
        subscription: {
          ...mockSubscription,
          type: "premium-plus" as const,
        },
        plan: {
          ...mockPlan,
          maxDocuments: null,
          maxAiRecommendations: null,
          isUnlimited: true,
        },
      },
      trial: mockTrial,
    });

    vi.mocked(getUserRecommendationLimit).mockResolvedValueOnce(Infinity);

    vi.mocked(canUploadMedicalFile).mockResolvedValueOnce({
      allowed: true,
      current: 999,
      max: null,
      isPremium: true,
      isUnlimited: true,
    });

    const upload = await canUploadMedicalFile(userId);
    const limit = await getUserRecommendationLimit(userId);

    expect(upload.isUnlimited).toBe(true);
    expect(upload.max).toBe(null);
    expect(upload.isPremium).toBe(true);
    expect(limit).toBe(Infinity);
  });
});
