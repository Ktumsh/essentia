import { describe, it, expect } from "vitest";

import { getPlanName, getPlanPrice, calculatePremiumExpiresAt } from "@/utils";

vi.mock("@/config/site.config", () => ({
  siteConfig: {
    plan: {
      free: "free",
      premium: "premium",
      premiumPlus: "premium_plus",
    },
    priceId: {
      free: "price_0",
      premium: "price_1",
      premiumPlus: "price_2",
    },
  },
}));

describe("getPlanName", () => {
  it("devuelve el nombre correcto para cada plan", () => {
    expect(getPlanName("free")).toBe("Gratis");
    expect(getPlanName("premium")).toBe("Premium");
    expect(getPlanName("premium_plus")).toBe("Premium Plus");
  });

  it("devuelve 'Plan' si no coincide", () => {
    expect(getPlanName("otro")).toBe("Plan");
  });
});

describe("getPlanPrice", () => {
  it("devuelve el priceId correcto para cada plan", () => {
    expect(getPlanPrice("free")).toBe("price_0");
    expect(getPlanPrice("premium")).toBe("price_1");
    expect(getPlanPrice("premium_plus")).toBe("price_2");
  });

  it("devuelve priceId de plan gratuito si no coincide", () => {
    expect(getPlanPrice("otro")).toBe("price_0");
  });
});

describe("calculatePremiumExpiresAt", () => {
  it("convierte el UNIX timestamp a fecha correctamente", () => {
    const timestamp = 1718006400; // Ej: lunes 10 junio 2024 00:00:00 GMT
    const result = calculatePremiumExpiresAt(timestamp);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBe(timestamp * 1000);
  });
});
