import { describe, it, expect, beforeAll } from "vitest";

import {
  convertSubscriptionToServerFormat,
  urlBase64ToUint8Array,
} from "@/utils";

// Mock para window.atob
beforeAll(() => {
  global.atob = (input: string) =>
    Buffer.from(input, "base64").toString("binary");
});

describe("convertSubscriptionToServerFormat", () => {
  it("convierte una suscripción válida al formato del servidor", () => {
    const p256dhKey = new TextEncoder().encode("claveP256dh");
    const authKey = new TextEncoder().encode("claveAuth");

    const mockSubscription = {
      endpoint: "https://example.com/endpoint",
      getKey: (name: string) => {
        if (name === "p256dh") return p256dhKey.buffer;
        if (name === "auth") return authKey.buffer;
        return null;
      },
    } as unknown as PushSubscription;

    const result = convertSubscriptionToServerFormat(mockSubscription);

    expect(result.endpoint).toBe("https://example.com/endpoint");
    expect(result.keys.p256dh).toBe(btoa("claveP256dh"));
    expect(result.keys.auth).toBe(btoa("claveAuth"));
  });

  it("devuelve claves vacías si no existen", () => {
    const mockSubscription = {
      endpoint: "https://example.com/endpoint",
      getKey: () => null,
    } as unknown as PushSubscription;

    const result = convertSubscriptionToServerFormat(mockSubscription);

    expect(result.keys.p256dh).toBe("");
    expect(result.keys.auth).toBe("");
  });
});

describe("urlBase64ToUint8Array", () => {
  it("convierte una string base64 a Uint8Array correctamente", () => {
    const original = "Hello World!";
    const base64 = btoa(original)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const result = urlBase64ToUint8Array(base64);
    const resultString = String.fromCharCode(...result);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(resultString).toBe(original);
  });

  it("devuelve un Uint8Array vacío si la entrada es vacía", () => {
    const result = urlBase64ToUint8Array("");
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(0);
  });
});
