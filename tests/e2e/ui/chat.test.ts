import { test, expect } from "../../fixtures";
import { AuthPage } from "@@/tests/pages/auth";
import { ChatPage } from "../../pages/chat";

test.describe("Actividad en el chat de Essentia", () => {
  let authPage: AuthPage;
  let chatPage: ChatPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    chatPage = new ChatPage(page);

    await authPage.login(
      process.env.TEST_PREMIUM_EMAIL!,
      process.env.TEST_PREMIUM_PASSWORD!,
    );
    await page.waitForURL("/");
    await chatPage.createNewChat();

    await page.waitForFunction(
      () => {
        const el = document.querySelector(
          '[data-testid="chat-input"]',
        ) as HTMLTextAreaElement;
        return el && !el.disabled && el.offsetParent !== null;
      },
      { timeout: 5000 },
    );

    await expect(chatPage.chatInput).toBeVisible();
  });

  test("Envía un mensaje y recibe respuesta", async () => {
    await chatPage.sendUserMessage("¿Cómo puedo reducir el estrés?");
    await chatPage.isGenerationComplete();

    const assistantMessage = await chatPage.getRecentAssistantMessage();
    expect(assistantMessage.content?.length).toBeGreaterThan(5);
  });

  test("Redirige a /chat/:id tras enviar mensaje", async () => {
    await chatPage.sendUserMessage("¿Cómo dormir mejor?");
    await chatPage.isGenerationComplete();
    await chatPage.hasChatIdInUrl();
  });

  test("Envía mensaje desde sugerencia", async () => {
    await chatPage.sendUserMessageFromSuggestion();
    await chatPage.isGenerationComplete();

    const assistantMessage = await chatPage.getRecentAssistantMessage();
    expect(assistantMessage.content?.length).toBeGreaterThan(5);
  });

  test("Alterna entre botón de enviar y detener", async () => {
    await expect(chatPage.sendButton).toBeVisible();
    await expect(chatPage.sendButton).toBeDisabled();

    await chatPage.sendUserMessage("Quiero una recomendación saludable");
    await expect(chatPage.sendButton).not.toBeVisible();
    await expect(chatPage.stopButton).toBeVisible();

    await chatPage.isGenerationComplete();
    await expect(chatPage.stopButton).not.toBeVisible();
    await expect(chatPage.sendButton).toBeVisible();
  });

  test("Detiene la generación de respuesta", async () => {
    await chatPage.sendUserMessage("Haz una pausa por favor");
    await expect(chatPage.stopButton).toBeVisible();
    await chatPage.stopButton.click();
    await expect(chatPage.sendButton).toBeVisible();
  });

  test("Oculta sugerencias luego de enviar mensaje", async () => {
    await chatPage.isElementVisible("suggested-actions");
    await chatPage.sendUserMessageFromSuggestion();
    await chatPage.isElementNotVisible("suggested-actions");
  });

  test("Simula llamada a herramienta del clima", async () => {
    await chatPage.sendUserMessage("¿Qué clima hay hoy en Santiago?");
    await chatPage.isGenerationComplete();

    const assistantMessage = await chatPage.getRecentAssistantMessage();
    expect(assistantMessage.content?.length).toBeGreaterThan(5);
  });

  test("Vota positivo un mensaje del asistente", async () => {
    await chatPage.sendUserMessage("¿Cómo manejar la ansiedad?");
    await chatPage.isGenerationComplete();

    const assistantMessage = await chatPage.getRecentAssistantMessage();
    await assistantMessage.upvote();
    await chatPage.isVoteComplete();
  });

  test("Vota negativo un mensaje del asistente", async () => {
    await chatPage.sendUserMessage("Me siento sin energía");
    await chatPage.isGenerationComplete();

    const assistantMessage = await chatPage.getRecentAssistantMessage();
    await assistantMessage.downvote();
    await chatPage.isVoteComplete();
  });

  test("Actualiza el voto de un mensaje", async () => {
    await chatPage.sendUserMessage("Tengo insomnio últimamente");
    await chatPage.isGenerationComplete();

    const assistantMessage = await chatPage.getRecentAssistantMessage();
    await assistantMessage.upvote();
    await chatPage.isVoteComplete();
    await assistantMessage.downvote();
    await chatPage.isVoteComplete();
  });

  test("Crea mensaje desde query en la URL", async ({ page }) => {
    await page.goto("/aeris?search=¿Cómo puedo mejorar mi alimentación?");
    await chatPage.isGenerationComplete();

    const userMessage = await chatPage.getRecentUserMessage();
    expect(userMessage.content).toBe("¿Cómo puedo mejorar mi alimentación?");

    const assistantMessage = await chatPage.getRecentAssistantMessage();
    expect(assistantMessage.content?.length).toBeGreaterThan(5);
  });

  test("Auto-scroll al fondo tras enviar mensajes", async () => {
    await chatPage.sendMultipleMessages(1, (i) => `mensaje número ${i + 1}`);
    await chatPage.waitForScrollToBottom();
  });
});
