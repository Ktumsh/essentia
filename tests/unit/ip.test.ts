import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import { getClientIp } from "@/utils";

describe("getClientIp", () => {
  const originalFetch = global.fetch;
  const originalConsoleError = console.error;

  beforeEach(() => {
    vi.resetAllMocks();
    console.error = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    console.error = originalConsoleError;
  });

  it("devuelve la IP correctamente cuando la respuesta es válida", async () => {
    const mockResponse: Partial<Response> = {
      json: () => Promise.resolve({ ip: "192.168.1.1" }),
    };

    global.fetch = vi.fn(() =>
      Promise.resolve(mockResponse as Response),
    ) as typeof fetch;

    const ip = await getClientIp();
    expect(ip).toBe("192.168.1.1");
  });

  it("devuelve una cadena vacía cuando ocurre un error en la petición", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("Falló la red")),
    ) as typeof fetch;

    const ip = await getClientIp();
    expect(ip).toBe("");
  });
});
