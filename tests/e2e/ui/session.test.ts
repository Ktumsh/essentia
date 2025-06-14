import { expect, test } from "../../fixtures";
import { AuthPage } from "../../pages/auth";
import { ChatPage } from "../../pages/chat";

test.describe.serial("Navegación sin sesión", () => {
  test('Muestra "Invitado" cuando no hay sesión iniciada', async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("sidebar-toggle-button").click();

    const userName = page.getByTestId("user-name");
    await expect(userName).toContainText("Invitado");
  });

  test('No muestra la opción "Cerrar sesión" sin sesión iniciada', async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("sidebar-toggle-button").click();

    const userNavButton = page.getByTestId("user-nav-button");
    await userNavButton.click();

    const authMenuItem = page.locator('[data-testid="user-nav-item-auth"]');
    await expect(authMenuItem).toHaveCount(0);

    const userName = page.getByTestId("user-name");
    await expect(userName).toContainText("Invitado");
  });

  test("Permite acceder a /login sin estar autenticado", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login");
    await expect(
      page.getByPlaceholder("Ingresa tu correo electrónico"),
    ).toBeVisible();
  });

  test("Permite acceder a /signup sin estar autenticado", async ({ page }) => {
    await page.goto("/signup");
    await expect(page).toHaveURL("/signup");
    await expect(
      page.getByPlaceholder("Ingresa tu correo electrónico"),
    ).toBeVisible();
  });
});

test.describe.serial("Registro y Autenticación", () => {
  let authPage: AuthPage;

  const timestamp = Date.now();
  const testUser = {
    email: `test-${timestamp}@essentia.cl`,
    password: "Aa123456!",
  };

  const premiumUser = {
    email: process.env.TEST_PREMIUM_EMAIL!,
    password: process.env.TEST_PREMIUM_PASSWORD!,
  };

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
  });

  test("Registrar nueva cuenta de usuario", async () => {
    await authPage.register(testUser.email, testUser.password);
    await authPage.expectToastToContain(
      "¡Usuario creado! Verifica tu correo para activar tu cuenta",
    );
  });

  test("Intentar registrar cuenta con correo ya registrado", async () => {
    await authPage.fillEmailAndContinue(testUser.email);

    await authPage.expectToastToContain(
      "Este correo electrónico ya está registrado",
    );
  });

  test("Iniciar sesión con cuenta registrada", async ({ page }) => {
    await authPage.login(premiumUser.email, premiumUser.password);
    await page.waitForURL("/");
    await expect(page).toHaveURL("/");
  });

  test("Mostrar nombre de usuario al iniciar sesión", async ({ page }) => {
    await authPage.login(premiumUser.email, premiumUser.password);
    await page.waitForURL("/");
    await page.getByTestId("sidebar-toggle-button").click();
    const userName = page.getByTestId("user-name");
    await expect(userName).not.toContainText("Invitado");
  });

  test("Mantener sesión activa al navegar sin cerrar sesión", async ({
    page,
  }) => {
    await authPage.login(premiumUser.email, premiumUser.password);
    await page.waitForURL("/");

    await page.goto("/");

    const userName = await page.getByTestId("user-name");
    await expect(userName).toContainText("Test User");
  });

  test("Bloquear navegación a /signup para usuarios autenticados", async ({
    page,
  }) => {
    await authPage.login(premiumUser.email, premiumUser.password);
    await page.waitForURL("/");
    await page.goto("/signup");
    await expect(page).toHaveURL("/");
  });

  test("Bloquear navegación a /login para usuarios autenticados", async ({
    page,
  }) => {
    await authPage.login(premiumUser.email, premiumUser.password);
    await page.waitForURL("/");
    await page.goto("/login");
    await expect(page).toHaveURL("/");
  });
});

test.describe("Límites de uso", () => {
  let authPage: AuthPage;
  let chatPage: ChatPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.login(
      process.env.TEST_2_PREMIUM_EMAIL!,
      process.env.TEST_2_PREMIUM_PASSWORD!,
    );
    await page.waitForURL("/");

    chatPage = new ChatPage(page);
  });

  test("Usuario con plan Premium no puede enviar más de 15 mensajes diarios", async () => {
    await chatPage.createNewChat();

    await chatPage.sendMultipleMessages(15, (i) => `mensaje ${i + 1}`);

    await chatPage.sendUserMessage("mensaje 16");
    await chatPage.expectToastToContain(
      "Ha ocurrido un error. ¡Por favor intenta de nuevo!",
    );
  });
});
