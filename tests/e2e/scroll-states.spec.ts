import { expect, test, type Page } from "@playwright/test";

import {
  activeLayout,
  activeNarrativeLocator,
  capturePageDiagnostics,
  expectMostlyVisible,
  scrollNarrativeTo,
} from "./helpers/narrative";

const DESKTOP_STATES = [
  [0.05, "[data-stage-header]"],
  [0.17, "[data-token]"],
  [0.28, "[data-attempt]"],
  [0.43, "[data-evidence]"],
  [0.6, "[data-comparison]"],
  [0.74, "[data-mismatch]"],
  [0.85, "[data-verdict]"],
  [0.93, "[data-chain]"],
  [0.985, "[data-vault-transition]"],
] as const;

async function waitForAnimationReady(page: Page) {
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="desktop"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeHidden();
}

test("desktop exposes every semantic state forward and in reverse", async ({ page }) => {
  page.setDefaultTimeout(10_000);
  const diagnostics = capturePageDiagnostics(page);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await waitForAnimationReady(page);

  const desktop = activeLayout(page, "desktop");
  await expect(desktop.locator("[data-stage]")).toHaveCount(1);

  for (const [progress, selector] of DESKTOP_STATES) {
    await scrollNarrativeTo(page, "desktop", progress);
    const state = activeNarrativeLocator(page, "desktop", selector);
    await expectMostlyVisible(state);
    if (selector === "[data-mismatch]") {
      await expect(state.getByRole("heading", { name: "Chain conflict" })).toBeVisible();
    }
  }

  for (const [progress, selector] of [...DESKTOP_STATES].reverse()) {
    await scrollNarrativeTo(page, "desktop", progress);
    await expectMostlyVisible(activeNarrativeLocator(page, "desktop", selector));
  }

  await scrollNarrativeTo(page, "desktop", 0.05);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-stage-header]"));
  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});

test("the persistent Vault arrival releases from the pinned scene", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await waitForAnimationReady(page);

  const transition = activeNarrativeLocator(page, "desktop", "[data-vault-transition]");
  const arrival = page.locator("[data-vault-arrival]");
  await scrollNarrativeTo(page, "desktop", 0.985);
  await expectMostlyVisible(transition);
  await expect(arrival).not.toBeInViewport();
  expect(await arrival.evaluate((node) => node.closest(".pin-spacer"))).toBeNull();
  expect(await arrival.evaluate((node) => node.closest("[data-narrative]"))).toBeNull();

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        window.scrollTo(0, document.body.scrollHeight);
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  await expect(arrival).toBeInViewport();
  await expect(arrival.getByText("Keep your vault trustworthy")).toBeVisible();
});
