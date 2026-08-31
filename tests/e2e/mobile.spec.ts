import { expect, test, type Locator, type Page } from "@playwright/test";

import {
  activeLayout,
  activeNarrativeLocator,
  expectMostlyVisible,
  scrollNarrativeTo,
} from "./helpers/narrative";

test.use({ viewport: { width: 390, height: 844 } });

async function expectOnlyLayout(page: Page, layout: "mobile" | "desktop") {
  await expect(page.locator(`[data-animated-layout="${layout}"]`)).toBeVisible();
  await expect(page.locator(`[data-animated-layout="${layout === "mobile" ? "desktop" : "mobile"}"]`)).toBeHidden();
  await expect(page.locator("[data-stage]:visible")).toHaveCount(1);
}

async function expectRuntimeLayout(page: Page, layout: "mobile" | "desktop") {
  await expect(page.locator("[data-portfolio-experience]")).toHaveAttribute("data-animated", "ready");
  await expectOnlyLayout(page, layout);
  await expect(page.locator(".pin-spacer")).toHaveCount(layout === "desktop" ? 1 : 0);
}

const MOBILE_STATES = [
  [0.005, "[data-stage-header]"],
  [0.2, "[data-transaction]"],
  [0.32, "[data-attempt]"],
  [0.5, "[data-evidence]"],
  [0.65, "[data-comparison]"],
  [0.78, "[data-mismatch]"],
  [0.88, "[data-verdict]"],
  [0.95, "[data-chain]"],
  [0.997, "[data-vault-transition]"],
] as const;

async function expectMobileStateChildren(state: Locator, selector: string) {
  if (selector === "[data-stage-header]") {
    await expectMostlyVisible(state.locator("h2"), { requireViewport: false });
    await expectMostlyVisible(state.locator("p"), { requireViewport: false });
  }
  if (selector === "[data-transaction]") {
    await expectMostlyVisible(state.locator("h3"), { requireViewport: false });
    await expectMostlyVisible(state.locator("p").first(), { requireViewport: false });
    await expectMostlyVisible(state.locator("p").last(), { requireViewport: false });
  }
  if (selector === "[data-attempt]") {
    await expectMostlyVisible(state.locator("h3"), { requireViewport: false });
    await expectMostlyVisible(state.locator("p").first(), { requireViewport: false });
    await expectMostlyVisible(state.locator("p").last(), { requireViewport: false });
  }
  if (selector === "[data-evidence]") {
    const items = state.locator("[data-evidence-item]");
    await expect(items).toHaveCount(6);
    for (const item of await items.all()) {
      await expectMostlyVisible(item, { requireViewport: false });
      await expectMostlyVisible(item.locator('[data-object-label="settle"]'), { requireViewport: false });
      await expectMostlyVisible(item.locator("strong"), { requireViewport: false });
      await expectMostlyVisible(item.locator("small"), { requireViewport: false });
    }
  }
  if (selector === "[data-comparison]") {
    const rows = state.locator("[data-comparison-row]");
    await expect(rows).toHaveCount(6);
    for (const row of await rows.all()) {
      await expectMostlyVisible(row, { requireViewport: false });
      await expectMostlyVisible(row.locator("[data-classification]"), { requireViewport: false });
    }
  }
  if (selector === "[data-mismatch]") {
    await expectMostlyVisible(state.locator("h3"), { requireViewport: false });
    for (const paragraph of await state.locator("p").all()) {
      await expectMostlyVisible(paragraph, { requireViewport: false });
    }
    await expect(state.getByRole("heading", { name: "Chain conflict" })).toBeVisible();
    await expect(state).toContainText("base");
    await expect(state).toContainText("tempo");
  }
  if (selector === "[data-verdict]") {
    await expectMostlyVisible(state.locator("h3"), { requireViewport: false });
    await expectMostlyVisible(state.locator("p"), { requireViewport: false });
    await expect(state).toContainText("UNVERIFIABLE");
    await expect(state).toContainText("no confirmed charge, no transaction hash");
  }
  if (selector === "[data-chain]") {
    const items = state.locator("[data-chain-item]");
    await expect(items).toHaveCount(4);
    for (const item of await items.all()) {
      await expectMostlyVisible(item, { requireViewport: false });
      await expectMostlyVisible(item.locator("strong"), { requireViewport: false });
      await expectMostlyVisible(item.locator("span"), { requireViewport: false });
    }
  }
}

test("mobile uses the vertical narrative without horizontal overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expectRuntimeLayout(page, "mobile");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.locator("[data-mobile-evidence]")).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile remains exclusive and overflow-free at 360 pixels", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expectRuntimeLayout(page, "mobile");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});

test("mobile traverses every semantic state forward and in reverse", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await expectRuntimeLayout(page, "mobile");

  const mobile = activeLayout(page, "mobile");
  await expect(mobile.locator("[data-stage]")).toHaveCount(1);

  for (const [progress, selector] of MOBILE_STATES) {
    await scrollNarrativeTo(page, "mobile", progress);
    const state = activeNarrativeLocator(page, "mobile", selector);
    await expectMostlyVisible(state, { viewportRatio: 0.03 });
    await expectMobileStateChildren(state, selector);
  }

  for (const [progress, selector] of [...MOBILE_STATES].reverse()) {
    await scrollNarrativeTo(page, "mobile", progress);
    const state = activeNarrativeLocator(page, "mobile", selector);
    await expectMostlyVisible(state, { viewportRatio: 0.03 });
    await expectMobileStateChildren(state, selector);
  }

  await scrollNarrativeTo(page, "mobile", 0.997);
  const transition = activeNarrativeLocator(page, "mobile", "[data-vault-transition]");
  await expectMostlyVisible(transition, { viewportRatio: 0.03 });
  await expectMostlyVisible(transition.locator("[data-vault-transition-title]"), { requireViewport: false });
  await expectMostlyVisible(transition.locator("[data-vault-transition-headline]"), { requireViewport: false });
  await expect(transition.locator("[data-vault-transition-title]")).toHaveText("Vault Steward");
  await expect(transition.locator("[data-vault-transition-step]")).toHaveText([
    "FIND",
    "PREVIEW",
    "APPROVE",
    "VERIFY",
  ]);
  for (const step of await transition.locator("[data-vault-transition-step]").all()) {
    await expectMostlyVisible(step, { requireViewport: false });
  }
  await expect(mobile.locator('[data-object-label="vault"]')).toHaveCount(6);
  await expect(mobile.locator('[data-object-label="vault"]')).toHaveText([
    "NOTE",
    "PROPOSED CHANGE",
    "EVIDENCE SOURCE",
    "POLICY",
    "CURRENT / AFTER",
    "AUDIT / RECHECK",
  ]);
});

test("orientation changes rebuild one visible layout without page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  await expectRuntimeLayout(page, "mobile");
  await page.setViewportSize({ width: 844, height: 390 });
  await expectRuntimeLayout(page, "desktop");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectRuntimeLayout(page, "mobile");

  const evidence = page.locator("[data-mobile-evidence]");
  await evidence.scrollIntoViewIfNeeded();
  await expect(evidence).toBeInViewport();
  const evidenceTops = await page.locator("[data-mobile-evidence-item]").evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().top),
  );
  expect(evidenceTops.every((top, index) => index === 0 || top > evidenceTops[index - 1]!)).toBe(true);

  expect(errors).toEqual([]);
});

test("320px mobile keeps the source link focus outline within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await expectRuntimeLayout(page, "mobile");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const source = page.getByRole("link", { name: "View SettleDiff source on GitHub" });
  await expect(source).toBeFocused();

  const focusBounds = await source.evaluate((link) => {
    const bounds = link.getBoundingClientRect();
    const style = window.getComputedStyle(link);
    const outline = Number.parseFloat(style.outlineWidth) + Math.abs(Number.parseFloat(style.outlineOffset));
    return {
      left: bounds.left - outline,
      right: bounds.right + outline,
      viewportWidth: window.innerWidth,
    };
  });

  expect(focusBounds.left).toBeGreaterThanOrEqual(0);
  expect(focusBounds.right).toBeLessThanOrEqual(focusBounds.viewportWidth);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test("mobile Vault transition connectors keep bounded stroked geometry", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await expectRuntimeLayout(page, "mobile");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const connectors = page.locator('[data-layout="mobile"] [data-vault-transition-connectors]');
  await expect.poll(() => connectors.evaluate((svg) => {
    const bounds = svg.getBoundingClientRect();
    const paths = Array.from(svg.querySelectorAll("[data-vault-transition-connector]"));
    return bounds.width > 0 && bounds.height > 0 && paths.length === 2 && paths.every((path) => {
      const style = window.getComputedStyle(path);
      return Number(style.opacity) >= 0.95 && style.stroke !== "none";
    });
  })).toBe(true);
});
