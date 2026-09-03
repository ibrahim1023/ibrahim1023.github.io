import { defineConfig } from "@playwright/test";

const port = Number(process.env.E2E_PORT ?? "4173");
const baseURL = `http://127.0.0.1:${port}`;
const exportRoot = process.env.E2E_ROOT ?? "out";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL,
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command: `node scripts/serve-export.mjs --root ${exportRoot}  --port ${port}`,
    url: `${baseURL}/`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
