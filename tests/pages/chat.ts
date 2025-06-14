import fs from "node:fs";
import path from "node:path";

import { expect, type Page } from "@playwright/test";

export class ChatPage {
  constructor(private page: Page) {}

  public get sendButton() {
    return this.page.getByTestId("send-button");
  }

  public get stopButton() {
    return this.page.getByTestId("stop-button");
  }

  public get toggleThinkingButton() {
    return this.page.getByTestId("thinking-button");
  }

  public get chatInput() {
    return this.page.getByTestId("chat-input");
  }

  public get scrollContainer() {
    return this.page.getByTestId("chat-scroll-container");
  }

  public get scrollToBottomButton() {
    return this.page.getByTestId("scroll-to-bottom-button");
  }

  async createNewChat() {
    await this.page.goto("/aeris");
  }

  public getCurrentURL(): string {
    return this.page.url();
  }

  async sendUserMessage(message: string) {
    await this.chatInput.click();
    await this.chatInput.fill(message);
    await this.sendButton.click();
  }

  async isGenerationComplete() {
    await this.page.waitForResponse((res) => res.url().includes("/api/chat"));

    await this.page.waitForSelector(
      '[data-testid="message-assistant-loading"]',
      {
        state: "detached",
      },
    );

    await this.page.waitForFunction(() => {
      const messages = document.querySelectorAll(
        '[data-testid="message-assistant"]',
      );
      const last = messages[messages.length - 1];
      const content = last
        ?.querySelector('[data-testid="message-content"]')
        ?.textContent?.trim();
      return content && content.length > 5;
    });
  }

  async isVoteComplete() {
    const response = await this.page.waitForResponse((response) =>
      response.url().includes("/api/vote"),
    );

    await response.finished();
  }

  async hasChatIdInUrl() {
    await expect(this.page).toHaveURL(
      /^http:\/\/localhost:3000\/aeris\/chat\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  }

  async sendUserMessageFromSuggestion() {
    const suggestedButtons = this.page
      .getByTestId("suggested-actions")
      .locator("button");

    const count = await suggestedButtons.count();

    if (count === 0) {
      throw new Error("No se encontraron sugerencias visibles");
    }

    await suggestedButtons.nth(0).click();
    await this.sendButton.click();
  }

  async isElementVisible(elementId: string) {
    await expect(this.page.getByTestId(elementId)).toBeVisible();
  }

  async isElementNotVisible(elementId: string) {
    await expect(this.page.getByTestId(elementId)).not.toBeVisible();
  }

  async addImageAttachment() {
    this.page.on("filechooser", async (fileChooser) => {
      const filePath = path.join(
        process.cwd(),
        "public",
        "test",
        "mouth of the seine, monet.jpg",
      );
      const imageBuffer = fs.readFileSync(filePath);

      await fileChooser.setFiles({
        name: "mouth of the seine, monet.jpg",
        mimeType: "image/jpeg",
        buffer: imageBuffer,
      });
    });

    await this.page.getByTestId("attachments-button").click();
  }

  public async getSelectedVisibility() {
    const visibilityId = await this.page
      .getByTestId("visibility-selector")
      .innerText();
    return visibilityId;
  }

  public async chooseVisibilityFromSelector(
    chatVisibility: "public" | "private",
  ) {
    await this.page.getByTestId("visibility-selector").click();
    await this.page
      .getByTestId(`visibility-selector-item-${chatVisibility}`)
      .click();
    expect(await this.getSelectedVisibility()).toBe(chatVisibility);
  }

  async getRecentAssistantMessage() {
    const messageElements = await this.page
      .getByTestId("message-assistant")
      .all();
    const lastMessageElement = messageElements.at(-1);

    if (!lastMessageElement) {
      throw new Error("No se encontró ningún mensaje del asistente.");
    }

    const content = await lastMessageElement
      .getByTestId("message-content")
      .innerText()
      .catch(() => null);

    return {
      element: lastMessageElement,
      content,
      async upvote() {
        await lastMessageElement.getByTestId("message-upvote").click();
      },
      async downvote() {
        await lastMessageElement.getByTestId("message-downvote").click();
      },
    };
  }

  async getRecentUserMessage() {
    const messageElements = await this.page.getByTestId("message-user").all();
    const lastMessageElement = messageElements.at(-1);

    if (!lastMessageElement) {
      throw new Error("No se encontró un mensaje de usuario");
    }

    const content = await lastMessageElement
      .getByTestId("message-content")
      .innerText()
      .catch(() => null);

    const hasAttachments = await lastMessageElement
      .getByTestId("message-attachments")
      .isVisible()
      .catch(() => false);

    const attachments = hasAttachments
      ? await lastMessageElement.getByTestId("message-attachments").all()
      : [];

    const page = this.page;

    return {
      element: lastMessageElement,
      content,
      attachments,
      async edit(newMessage: string) {
        await page.getByTestId("message-edit-button").click();
        await page.getByTestId("message-editor").fill(newMessage);
        await page.getByTestId("message-editor-send-button").click();
        await expect(
          page.getByTestId("message-editor-send-button"),
        ).toBeVisible();
      },
    };
  }

  async expectToastToContain(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async openSideBar() {
    const sidebarToggleButton = this.page.getByTestId("sidebar-toggle-button");
    await sidebarToggleButton.click();
  }

  public async isScrolledToBottom(): Promise<boolean> {
    return this.scrollContainer.evaluate(
      (el) => Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 1,
    );
  }

  public async waitForScrollToBottom(timeout = 5_000): Promise<void> {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      if (await this.isScrolledToBottom()) return;
      await this.page.waitForTimeout(100);
    }

    throw new Error(
      `Tiempo de espera agotado esperando el final del desplazamiento después de ${timeout}ms`,
    );
  }

  public async sendMultipleMessages(
    count: number,
    makeMessage: (i: number) => string,
  ) {
    for (let i = 0; i < count; i++) {
      await this.sendUserMessage(makeMessage(i));
      await this.isGenerationComplete();
    }
  }

  public async scrollToTop(): Promise<void> {
    await this.scrollContainer.evaluate((element) => {
      element.scrollTop = 0;
    });
  }
}
