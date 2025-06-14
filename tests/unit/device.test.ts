import { describe, it, expect } from "vitest";

import { getDeviceInfo } from "@/utils";

// Helper para mockear navigator.userAgent
function mockUserAgent(userAgent: string) {
  Object.defineProperty(window.navigator, "userAgent", {
    value: userAgent,
    configurable: true,
  });
}

describe("getDeviceInfo", () => {
  it("detecta iPod con versión", () => {
    mockUserAgent("Mozilla/5.0 (iPod touch; CPU iPhone OS 13_3 like Mac OS X)");
    expect(getDeviceInfo()).toBe("iPod iOS 13.3");
  });

  it("detecta iPhone con versión", () => {
    mockUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X)");
    expect(getDeviceInfo()).toBe("iPhone iOS 15.6");
  });

  it("detecta iPad con versión", () => {
    mockUserAgent("Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X)");
    expect(getDeviceInfo()).toBe("iPad iOS 14.4");
  });

  it("detecta Android con modelo y versión", () => {
    mockUserAgent(
      "Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SD1A.210817.015)",
    );
    expect(getDeviceInfo()).toBe("Pixel 6 Android 12");
  });

  it("detecta Windows con mapeo correcto", () => {
    mockUserAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64)");
    expect(getDeviceInfo()).toBe("Windows 7");
  });

  it("detecta macOS con versión", () => {
    mockUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
    expect(getDeviceInfo()).toBe("Mac OS X 10.15.7");
  });

  it("detecta Chrome OS", () => {
    mockUserAgent("Mozilla/5.0 (X11; CrOS x86_64 14526.86.0)");
    expect(getDeviceInfo()).toBe("Chrome OS");
  });

  it("detecta Linux como fallback", () => {
    mockUserAgent("Mozilla/5.0 (X11; Linux x86_64)");
    expect(getDeviceInfo()).toBe("Linux");
  });

  it("retorna 'Otro' si no se detecta nada", () => {
    mockUserAgent("DispositivoDesconocido/1.0");
    expect(getDeviceInfo()).toBe("Otro");
  });
});
