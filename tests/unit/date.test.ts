import { describe, it, expect } from "vitest";

import { isSameDate } from "@/utils";

describe("isSameDate", () => {
  it("retorna true si dos fechas son exactamente el mismo día", () => {
    const date1 = new Date("2023-06-08T12:00:00");
    const date2 = new Date("2023-06-08T23:59:59");
    expect(isSameDate(date1, date2)).toBe(true);
  });

  it("retorna false si las fechas tienen diferentes días", () => {
    const date1 = new Date("2023-06-08");
    const date2 = new Date("2023-06-09");
    expect(isSameDate(date1, date2)).toBe(false);
  });

  it("retorna false si las fechas tienen diferentes meses", () => {
    const date1 = new Date("2023-06-08");
    const date2 = new Date("2023-07-08");
    expect(isSameDate(date1, date2)).toBe(false);
  });

  it("retorna false si las fechas tienen diferentes años", () => {
    const date1 = new Date("2023-06-08");
    const date2 = new Date("2024-06-08");
    expect(isSameDate(date1, date2)).toBe(false);
  });
});
