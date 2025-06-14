import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { fetcher } from "@/utils";

describe("fetcher", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.resetAllMocks();
  });

  it("debería retornar los datos si la respuesta es exitosa", async () => {
    const mockData = { message: "ok" };

    (fetch as unknown as ReturnType<typeof vi.fn>) = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const result = await fetcher("/api/test");
    expect(result).toEqual(mockData);
  });

  it("debería lanzar un error si la respuesta no es exitosa", async () => {
    const mockError = { error: "not found" };

    (fetch as unknown as ReturnType<typeof vi.fn>) = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve(mockError),
      }),
    );

    await expect(fetcher("/api/fail")).rejects.toMatchObject({
      message: "Error al obtener los datos.",
      info: mockError,
      status: 404,
    });
  });
});
