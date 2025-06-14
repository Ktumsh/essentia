import {
  type APIRequestContext,
  type Browser,
  type BrowserContext,
  expect,
  type Page,
} from "@playwright/test";
import { generateId } from "ai";
import { getUnixTime } from "date-fns";

export type UserContext = {
  context: BrowserContext;
  page: Page;
  request: APIRequestContext;
};

export async function createAuthenticatedContext({
  browser,
}: {
  browser: Browser;
}): Promise<UserContext> {
  const context = await browser.newContext();
  const page = await context.newPage();

  const email = process.env.TEST_PREMIUM_EMAIL!;
  const password = process.env.TEST_PREMIUM_PASSWORD!;

  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Ingresa tu correo electrónico").fill(email);
  await page.getByPlaceholder("Ingresa tu contraseña").fill(password);
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await expect(page).toHaveURL("/");

  return {
    context,
    page,
    request: context.request,
  };
}

export function generateRandomTestUser() {
  const email = `test-${getUnixTime(new Date())}@playwright.com`;
  const password = generateId(16);

  return {
    email,
    password,
  };
}
