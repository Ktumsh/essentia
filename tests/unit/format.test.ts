import { formatDate } from "@/utils";

describe("formatDate", () => {
  it("formatea correctamente la fecha por defecto", () => {
    const result = formatDate("2025-06-08T12:00:00-04:00");
    expect(result).toBe("08/06/2025");
  });

  it("lanza error si la fecha es inválida", () => {
    expect(() => formatDate("no-es-fecha")).toThrow(
      "Fecha inválida proporcionada.",
    );
  });

  it("permite cambiar el formato", () => {
    const result = formatDate("2025-06-08", "MMMM yyyy");
    expect(result).toBe("junio 2025");
  });
});
