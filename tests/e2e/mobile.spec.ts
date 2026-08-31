import { expect, test, type Page } from "@playwright/test";

import {
  activeLayout,
  activeNarrativeLocator,
  expectMostlyVisible,
  scrollNarrativeTo,
  waitForAnimationFrames,
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
  [0.05, "[data-stage-header]"],
  [0.17, "[data-transaction]"],
  [0.28, "[data-attempt]"],
  [0.43, "[data-evidence]"],
  [0.6, "[data-comparison]"],
  [0.74, "[data-mismatch]"],
  [0.85, "[data-verdict]"],
  [0.93, "[data-chain]"],
  [0.985, "[data-vault-transition]"],
] as const;

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
    await expectMostlyVisible(state, { requireViewport: false });
    if (selector === "[data-evidence]") {
      await expect(state.locator("[data-evidence-item]")).toHaveCount(6);
      await expect(state.locator('[data-object-label="settle"]')).toHaveText([
        "REQUEST",
        "PAYMENT",
        "VENDOR",
        "CHAIN",
        "RESPONSE",
        "ACTIVITY",
      ]);
    }
    if (selector === "[data-comparison]") {
      await expect(state.locator("[data-comparison-row]")).toHaveCount(6);
      await expect(state.locator('[data-classification="DIFF"]')).toHaveText("DIFF");
      await expect(state.locator('[data-classification="FAIL"]')).toHaveText("FAIL");
      await expect(state.locator('[data-classification="UNKNOWN"]')).toHaveCount(2);
    }
    if (selector === "[data-mismatch]") {
      await expect(state.getByRole("heading", { name: "Chain conflict" })).toBeVisible();
      await expect(state).toContainText("base");
      await expect(state).toContainText("tempo");
    }
    if (selector === "[data-verdict]") {
      await expect(state).toContainText("UNVERIFIABLE");
      await expect(state).toContainText("no confirmed charge, no transaction hash");
    }
    if (selector === "[data-chain]") {
      await expect(state.locator("[data-chain-item]")).toHaveCount(4);
      await expect(state.locator("[data-chain-item] strong")).toHaveText([
        "CLAIM",
        "EVIDENCE",
        "FINDING",
        "VERDICT",
      ]);
    }
  }

  for (const [progress, selector] of [...MOBILE_STATES].reverse()) {
    await scrollNarrativeTo(page, "mobile", progress);
    await expectMostlyVisible(activeNarrativeLocator(page, "mobile", selector), { requireViewport: false });
  }

  await scrollNarrativeTo(page, "mobile", 0.997);
  const transition = activeNarrativeLocator(page, "mobile", "[data-vault-transition]");
  await expectMostlyVisible(transition, { requireViewport: false });
  await expect(transition.locator("[data-vault-transition-title]")).toHaveText("Vault Steward");
  await expect(transition.locator("[data-vault-transition-step]")).toHaveText([
    "FIND",
    "PREVIEW",
    "APPROVE",
    "VERIFY",
  ]);
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
  await waitForAnimationFrames(page);

  const geometry = await page
    .locator('[data-layout="mobile"] [data-vault-transition-connectors]')
    .evaluate((svg) => {
      const bounds = svg.getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
        paths: Array.from(svg.querySelectorAll("[data-vault-transition-connector]")).map(
          (path) => {
            const style = window.getComputedStyle(path);
            return { opacity: style.opacity, stroke: style.stroke };
          },
        ),
      };
    });

  expect(geometry.width).toBeGreaterThan(0);
  expect(geometry.height).toBeGreaterThan(0);
  expect(geometry.paths).toHaveLength(2);
  expect(geometry.paths.every(({ opacity, stroke }) => opacity === "1" && stroke !== "none")).toBe(true);
});
