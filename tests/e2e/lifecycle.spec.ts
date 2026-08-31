import { expect, test, type Locator, type Page } from "@playwright/test";

import {
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

async function expectNarrativeStart(page: Page) {
  const header = activeNarrativeLocator(page, "desktop", "[data-stage-header]");
  const transaction = activeNarrativeLocator(page, "desktop", "[data-transaction]");
  await expectMostlyVisible(header);
  await expectMostlyVisible(header.locator("h2"), { requireViewport: false });
  await expect(header.locator("h2")).toHaveText("SettleDiff");
  await expectMostlyVisible(transaction.locator("[data-token]"), { requireViewport: false });
  await expect(transaction.locator("[data-token]")).toHaveText("0.01 USDC");
  await expectMostlyVisible(transaction.locator("[data-path-origin]"), { requireViewport: false });
  await expect.poll(() => transaction.locator("[data-path]").evaluate((path) => {
    const style = getComputedStyle(path);
    const rect = path.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && path.querySelector("[data-path-line]") !== null && style.display !== "none";
  })).toBe(true);

  const resetTargets: Array<[Locator, number]> = [
    [activeNarrativeLocator(page, "desktop", "[data-comparison]"), 28],
    [activeNarrativeLocator(page, "desktop", "[data-verdict]"), 12],
    [activeNarrativeLocator(page, "desktop", "[data-vault-transition]"), 14],
  ];
  for (const [target, expectedY] of resetTargets) {
    await expect.poll(() => target.evaluate((node, expectedY) => {
      const style = getComputedStyle(node);
      const match = style.transform.match(/^matrix\([^,]+,[^,]+,[^,]+,[^,]+,[^,]+,([^\)]+)\)$/);
      const y = match ? Number(match[1]) : 0;
      return Number(style.opacity) <= 0.25 && Number.isFinite(y) && y >= expectedY - 2;
    }, expectedY)).toBe(true);
  }
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
  const arrival = page.locator("[data-vault-arrival]");
  await expect(arrival).toBeInViewport();
  await expect(arrival.locator("h2")).toHaveText("Vault Steward");
  await expect(arrival.getByText("Keep your vault trustworthy")).toBeVisible();
  await expect(arrival.locator("[data-vault-rail-item]")).toHaveCount(4);

  await scrollNarrativeTo(page, "desktop", 0.05);
  await expect(arrival).not.toBeInViewport();
  await expectNarrativeStart(page);

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
  const midStoryScroll = await page.evaluate(() => window.scrollY);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-comparison]"));
  await page.reload();
  await expect.poll(() => page.evaluate((before) => Math.abs(window.scrollY - before), midStoryScroll))
    .toBeLessThanOrEqual(8);
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
  await page.goto("/portfolio/?e2eLifecycle=1");
  await readyDesktop(page);
  await scrollNarrativeTo(page, "desktop", 0.6);
  const midStoryScroll = await page.evaluate(() => window.scrollY);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-comparison]"));
  await page.goto("about:blank");
  await page.goBack();
  await readyDesktop(page);

  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toHaveCount(1);
  await expect(page.locator('[data-animated-layout="desktop"]:visible')).toHaveCount(1);
  await expect(page.locator('[data-stage]:visible')).toHaveCount(1);
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  const lifecycle = await page.evaluate(() => {
    const probe = (window as Window & {
      __portfolioE2ELifecycle__?: {
        initializations: number;
        activeBranches: number;
        activeTriggers: number;
        createdTriggers: number;
      };
    }).__portfolioE2ELifecycle__;
    return probe ? { ...probe } : null;
  });
  expect(lifecycle).toEqual({
    initializations: 1,
    activeBranches: 1,
    activeTriggers: 2,
    createdTriggers: 2,
  });
  await expect(page.locator("[data-state]")).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThanOrEqual(
    Math.max(1, Math.floor(midStoryScroll * 0.8)),
  );
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-comparison]"));

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
  const desktop = page.locator('[data-animated-layout="desktop"]');
  await expect(desktop).toBeVisible();
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeHidden();
  await expect(desktop.getByRole("heading", { name: "SettleDiff" })).toBeVisible();
  await expect(desktop.getByText("ACTIVITY RECORDED", { exact: true })).toBeVisible();
  await expect(desktop.locator("[data-attempt-status]")).toHaveText("broadcast_failed");
  await expect(desktop.locator("[data-evidence-item]")).toHaveCount(6);
  await expect(desktop.locator("tbody tr")).toHaveCount(6);
  await expect(desktop.getByRole("heading", { name: "Chain conflict" })).toBeVisible();
  await expect(desktop).toContainText("base → tempo");
  await expect(desktop.locator("[data-verdict] p").first()).toHaveText("UNVERIFIABLE");
  await expect(desktop.locator("[data-chain-item]")).toHaveCount(4);
  await expect(desktop.locator("[data-vault-transition-title]")).toHaveText("Vault Steward");
  await expect(desktop.locator("[data-vault-transition-step]")).toHaveText([
    "FIND",
    "PREVIEW",
    "APPROVE",
    "VERIFY",
  ]);

  const arrival = page.locator("[data-vault-arrival]");
  await expect(arrival.getByRole("heading", { name: "Vault Steward" })).toBeVisible();
  await expect(arrival).toContainText("Keep your vault trustworthy");
  await expect(arrival).toContainText("Local-first, evidence-backed vault maintenance");
  await expect(arrival).toContainText("Current");
  await expect(arrival).toContainText("After");
  await expect(arrival.locator("[data-vault-rail-item]")).toHaveCount(4);
  await expect(arrival).toContainText("Case study continues");

  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});
