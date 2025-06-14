import { describe, it, expect } from "vitest";

import {
  getFirstNameAndLastName,
  usernameOrEmail,
  getSureLabel,
  getWelcomeLabel,
} from "@/utils";

describe("getFirstNameAndLastName", () => {
  it("retorna 'Usuario' si el nombre completo no está definido", () => {
    expect(getFirstNameAndLastName(undefined)).toBe("Usuario");
    expect(getFirstNameAndLastName(null)).toBe("Usuario");
    expect(getFirstNameAndLastName("")).toBe("Usuario");
  });

  it("capitaliza correctamente nombres simples", () => {
    expect(getFirstNameAndLastName("juan perez")).toBe("Juan perez");
    expect(getFirstNameAndLastName("maria")).toBe("Maria");
  });

  it("retorna nombre y penúltimo apellido si hay tres palabras o más", () => {
    expect(getFirstNameAndLastName("juan carlos perez gomez")).toBe(
      "Juan Perez",
    );
    expect(getFirstNameAndLastName("ana maria lopez")).toBe("Ana Maria");
  });
});

describe("usernameOrEmail", () => {
  it("retorna el username si existe", () => {
    const session = { user: { username: "fabian", email: "fabi@example.com" } };
    expect(usernameOrEmail(session)).toBe("@fabian");
  });

  it("retorna el email si no hay username", () => {
    const session = { user: { email: "correo@example.com" } };
    expect(usernameOrEmail(session)).toBe("correo@example.com");
  });

  it("retorna undefined si no hay sesión", () => {
    expect(usernameOrEmail(null)).toBeUndefined();
    expect(usernameOrEmail(undefined)).toBeUndefined();
  });
});

describe("getSureLabel", () => {
  it("retorna 'segura' si el género es femenino", () => {
    expect(getSureLabel("Femenino")).toBe("segura");
  });

  it("retorna 'seguro' si el género es masculino", () => {
    expect(getSureLabel("Masculino")).toBe("seguro");
  });

  it("retorna 'segur@' si no hay género definido o es otro", () => {
    expect(getSureLabel()).toBe("segur@");
    expect(getSureLabel(null)).toBe("segur@");
    expect(getSureLabel("Otro")).toBe("segur@");
  });
});

describe("getWelcomeLabel", () => {
  it("retorna 'Bienvenida' si el género es femenino", () => {
    expect(getWelcomeLabel("Femenino")).toBe("Bienvenida");
  });

  it("retorna 'Bienvenido' si el género es masculino", () => {
    expect(getWelcomeLabel("Masculino")).toBe("Bienvenido");
  });

  it("retorna 'Bienvenid@' si no hay género definido o es otro", () => {
    expect(getWelcomeLabel()).toBe("Bienvenid@");
    expect(getWelcomeLabel(null)).toBe("Bienvenid@");
    expect(getWelcomeLabel("Otro")).toBe("Bienvenid@");
  });
});
