import { describe, it, expect } from "vitest";

import { resultMessages } from "@/utils";

describe("resultMessages", () => {
  it("debería contener un mensaje para USER_CREATED", () => {
    expect(resultMessages.USER_CREATED).toBe(
      "¡Usuario creado! Verifica tu correo para activar tu cuenta",
    );
  });

  it("debería contener un mensaje para INVALID_CREDENTIALS", () => {
    expect(resultMessages.INVALID_CREDENTIALS).toBe("¡Credenciales inválidas!");
  });

  it("debería contener un mensaje para MEDICAL_FILE_INVALID_TYPE", () => {
    expect(resultMessages.MEDICAL_FILE_INVALID_TYPE).toBe(
      "Formato no permitido. Usa PDF, JPEG, PNG o WEBP",
    );
  });

  it("debería contener exactamente 60 claves", () => {
    expect(Object.keys(resultMessages).length).toBe(60);
  });

  it("todos los mensajes deberían ser strings no vacíos", () => {
    const allValid = Object.values(resultMessages).every(
      (msg) => typeof msg === "string" && msg.trim().length > 0,
    );
    expect(allValid).toBe(true);
  });
});
