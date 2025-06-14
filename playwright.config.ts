import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

config({
  path: ".env.local",
});

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 3,
  reporter: "html",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  timeout: 180 * 1000,
  expect: {
    timeout: 180 * 1000,
  },
  projects: [
    {
      name: "ui",
      testMatch: /ui\/.*\.test\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "api",
      testMatch: /api\/.*\.test\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: {
    command: "bun dev",
    url: `${baseURL}/ping`,
    timeout: 180 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
