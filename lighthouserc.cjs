/* eslint-disable @typescript-eslint/no-require-imports -- LHCI 0.15 loads JavaScript config through CommonJS. */
const { chromium } = require("@playwright/test");

const port = Number(process.env.LHCI_PORT ?? "4173");
const previewUrl = `http://127.0.0.1:${port}/`;

module.exports = {
  ci: {
    collect: {
      chromePath: chromium.executablePath(),
      startServerCommand:
        `node scripts/serve-export.mjs --root out  --port ${port}`,
      startServerReadyPattern: previewUrl,
      url: [previewUrl],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        chromeFlags: "--headless --no-sandbox",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
