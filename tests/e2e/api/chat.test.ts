import { generateUUID } from "@/app/(main)/(chat)/_lib/utils";

import { expect, test } from "../../fixtures";
import { TEST_PROMPTS } from "../../prompts/routes";

const chatsCreados: string[] = [];

test.describe.serial("/api/chat (usuario premium)", () => {
  test("No se permite crear un chat con cuerpo vacío", async ({
    adaContext,
  }) => {
    const response = await adaContext.request.post("/api/chat", {
      data: {},
    });

    expect(response.status()).toBe(400);
    const text = await response.text();
    expect(text).toEqual("Cuerpo de la solicitud no válido");
  });

  test("Puede generar un nuevo chat correctamente", async ({ adaContext }) => {
    const chatId = generateUUID();

    const response = await adaContext.request.post("/api/chat", {
      data: JSON.stringify({
        id: chatId,
        message: TEST_PROMPTS.ANIMO.MESSAGE,
        selectedChatModel: "chat-model",
        selectedVisibilityType: "private",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    const lines = text.split("\n");
    const [, ...rest] = lines;

    expect(rest.filter(Boolean).length).toBeGreaterThan(5);

    chatsCreados.push(chatId);
  });

  test("Puede eliminar su propio chat", async ({ adaContext }) => {
    const [chatId] = chatsCreados;

    const response = await adaContext.request.delete(`/api/chat?id=${chatId}`);

    expect(response.status()).toBe(200);
    const deletedChat = await response.json();
    expect(deletedChat).toMatchObject({ id: chatId });
  });
});
