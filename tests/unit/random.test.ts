import { generateVerificationCode } from "@/utils";

describe("generateVerificationCode", () => {
  it("genera un código de 6 dígitos como string", () => {
    const code = generateVerificationCode();
    expect(code).toHaveLength(6);
    expect(typeof code).toBe("string");
    expect(Number.isNaN(Number(code))).toBe(false);
  });

  it("el código generado está entre 100000 y 999999", () => {
    const code = Number(generateVerificationCode());
    expect(code).toBeGreaterThanOrEqual(100000);
    expect(code).toBeLessThanOrEqual(999999);
  });
});
