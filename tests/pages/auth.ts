import { expect } from "../fixtures";

import type { Page } from "@playwright/test";

export class AuthPage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.goto("/login");
    await expect(
      this.page.getByPlaceholder("Ingresa tu correo electrónico"),
    ).toBeVisible();
  }

  async gotoSignup() {
    await this.page.goto("/signup");
    await expect(
      this.page.getByPlaceholder("Ingresa tu correo electrónico"),
    ).toBeVisible();
  }

  async register(fullEmail: string, password: string) {
    await this.gotoSignup();

    // Paso 1: Correo electrónico
    await this.page
      .getByPlaceholder("Ingresa tu correo electrónico")
      .fill(fullEmail);
    await this.page.getByRole("button", { name: "Continuar" }).click();

    await this.waitForSignupStep(2);

    // Paso 2: Información personal
    await this.page.locator('input[name="firstName"]').fill("Test");
    await this.page.locator('input[name="lastName"]').fill("User");
    await this.page
      .locator('input[name="username"]')
      .fill("usuario" + Math.floor(Math.random() * 10000));

    // Fecha de nacimiento
    await this.page.getByText("Día").click();
    await this.page.getByRole("option", { name: "12" }).click();
    await this.page.getByText("Mes").click();
    await this.page.getByRole("option", { name: "Junio" }).click();
    await this.page.getByText("Año").click();
    await this.page.getByRole("option", { name: "2000" }).click();

    await this.page.getByRole("button", { name: "Continuar" }).click();
    await this.waitForSignupStep(3);

    // Paso 3: Contraseña
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('input[name="confirmPassword"]').fill(password);
    await this.page.getByRole("button", { name: "Crear cuenta" }).click();

    await this.expectToastToContain(
      "¡Usuario creado! Verifica tu correo para activar tu cuenta",
    );
  }

  async login(email: string, password: string) {
    await this.gotoLogin();
    await this.page
      .getByPlaceholder("Ingresa tu correo electrónico")
      .fill(email);
    await this.page.getByPlaceholder("Ingresa tu contraseña").fill(password);
    await this.page.getByRole("button", { name: "Iniciar sesión" }).click();
  }

  async logout(email: string, password: string) {
    await this.login(email, password);
    await this.page.waitForURL("/");

    await this.openSidebar();

    const userNavButton = this.page.getByTestId("user-nav-button");
    await expect(userNavButton).toBeVisible();

    await this.page.waitForSelector("nextjs-portal", { state: "detached" });

    await userNavButton.click({ force: true });

    const userNavMenu = this.page.getByTestId("user-nav-menu");
    await expect(userNavMenu).toBeVisible();

    const authMenuItem = this.page.getByTestId("user-nav-item-auth");
    await expect(authMenuItem).toContainText("Cerrar sesión");

    await authMenuItem.click();

    const userName = this.page.getByTestId("user-name");
    await expect(userName).toContainText("Invitado");
  }

  async expectToastToContain(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async openSidebar() {
    const sidebarToggleButton = this.page.getByTestId("sidebar-toggle-button");
    await sidebarToggleButton.click();
  }

  async fillEmailAndContinue(email: string) {
    await this.gotoSignup();
    await this.page
      .getByPlaceholder("Ingresa tu correo electrónico")
      .fill(email);
    await this.page.getByRole("button", { name: "Continuar" }).click();
  }

  async waitForSignupStep(step: number) {
    switch (step) {
      case 2:
        await this.page
          .locator('input[name="firstName"]')
          .waitFor({ state: "visible" });
        break;
      case 3:
        await this.page
          .locator('input[name="password"]')
          .waitFor({ state: "visible" });
        break;
    }
  }
}
