import { expect, test } from "@playwright/test";

import {
  activeLayout,
  activeNarrativeLocator,
  capturePageDiagnostics,
  expectMostlyVisible,
  scrollNarrativeTo,
} from "./helpers/narrative";

async function readyDesktop(page: Parameters<typeof scrollNarrativeTo>[0]) {
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="desktop"]')).toBeVisible();
}

async function waitForFrames(page: Parameters<typeof scrollNarrativeTo>[0]) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

test("fast forward and reverse scrolling leaves one readable stage", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await readyDesktop(page);

  await scrollNarrativeTo(page, "desktop", 0.05);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await waitForFrames(page);
  await expect(page.locator("[data-vault-arrival]")).toBeInViewport();

  await page.evaluate(() => window.scrollTo(0, 0));
  await waitForFrames(page);
  const desktop = activeLayout(page, "desktop");
  await expect(desktop.locator("[data-stage]")).toHaveCount(1);
  await expect(page.locator('[data-stage]:visible')).toHaveCount(1);
  await expect(page.locator('[data-orphaned="true"]')).toHaveCount(0);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-stage-header]"));

  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});

test("mid-story refresh restores a coherent comparison", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await readyDesktop(page);

  await scrollNarrativeTo(page, "desktop", 0.6);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-comparison]"));
  await page.reload();
  await readyDesktop(page);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-comparison]"));
  await expect(page.locator('[data-stage]:visible')).toHaveCount(1);

  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});

test("back-forward navigation rebuilds one active animation lifecycle", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await readyDesktop(page);
  await page.goto("about:blank");
  await page.goBack();
  await readyDesktop(page);

  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toHaveCount(1);
  await expect(page.locator('[data-animated-layout="desktop"]:visible')).toHaveCount(1);
  await expect(page.locator('[data-stage]:visible')).toHaveCount(1);
  await expect(page.locator('[data-orphaned="true"]')).toHaveCount(0);

  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});

test("animation setup failure keeps the readable story and emits no production error", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page);
  await page.addInitScript(() => {
    Object.defineProperty(SVGPathElement.prototype, "getTotalLength", {
      configurable: true,
      value: () => {
        throw new Error("forced animation setup failure");
      },
    });
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toHaveCount(0);
  await expect(page.locator('[data-animated-layout="desktop"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeHidden();
  await expect(page.getByRole("heading", { name: "SettleDiff" })).toBeVisible();
  await expect(page.getByText("ACTIVITY RECORDED", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("UNVERIFIABLE", { exact: true }).first()).toBeVisible();

  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});
