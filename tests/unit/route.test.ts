import { describe, it, expect, vi } from "vitest";

import { startsWithAny, getRouteIndex } from "@/utils";
vi.mock("@/config/nav.config", () => ({
  navConfig: {
    asideMenuLinks: [
      { name: "Inicio" },
      { name: "Perfil" },
      { name: "Historial Médico" },
    ],
  },
}));

describe("startsWithAny", () => {
  it("devuelve true si el pathname comienza con uno de los prefijos", () => {
    expect(startsWithAny("/cuenta/perfil", ["/cuenta", "/inicio"])).toBe(true);
  });

  it("devuelve false si el pathname no comienza con ninguno de los prefijos", () => {
    expect(startsWithAny("/configuracion", ["/cuenta", "/inicio"])).toBe(false);
  });
});

describe("getRouteIndex", () => {
  it("devuelve el índice correcto del nombre", () => {
    expect(getRouteIndex("Perfil")).toBe(1);
  });

  it("devuelve -1 si el nombre no existe", () => {
    expect(getRouteIndex("NoExiste")).toBe(-1);
  });
});
