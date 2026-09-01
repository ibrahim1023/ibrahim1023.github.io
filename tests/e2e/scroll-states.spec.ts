import { expect, test, type Locator, type Page } from "@playwright/test";

import {
  activeLayout,
  activeNarrativeLocator,
  capturePageDiagnostics,
  expectMostlyVisible,
  scrollNarrativeTo,
  waitForAnimationFrames,
} from "./helpers/narrative";

const DESKTOP_STATES = [
  [0.05, "[data-stage-header]"],
  [0.17, "[data-token]"],
  [0.32, "[data-attempt]"],
  [0.5, "[data-evidence]"],
  [0.6, "[data-comparison]"],
  [0.74, "[data-mismatch]"],
  [0.85, "[data-verdict]"],
  [0.95, "[data-chain]"],
  [0.992, "[data-vault-transition]"],
] as const;

const EVIDENCE = [
  ["request", "REQUEST", "0.01 USDC", "0.02 USDC max"],
  ["payment", "PAYMENT", "charge unknown", "settlement not established"],
  ["vendor", "VENDOR", "synthetic-search", "sanitized fixture identity"],
  ["chain", "CHAIN", "base → tempo", "advertised vs executed"],
  ["response", "RESPONSE", "HTTP 402", "Payment Required"],
  ["activity", "ACTIVITY", "broadcast_failed", "no transaction hash"],
] as const;

const CLASSIFICATIONS = [
  ["chain", "DIFF"],
  ["charge", "UNKNOWN"],
  ["protocol", "PASS"],
  ["vendor", "PASS"],
  ["service", "FAIL"],
  ["transactionHash", "UNKNOWN"],
] as const;

const VAULT_ROLES = [
  "NOTE",
  "PROPOSED CHANGE",
  "EVIDENCE SOURCE",
  "POLICY",
  "CURRENT / AFTER",
  "AUDIT / RECHECK",
] as const;

const REASONING_LABELS = ["CLAIM", "EVIDENCE", "FINDING", "VERDICT"] as const;

async function expectDesktopStateChildren(state: Locator, selector: string) {
  if (selector === "[data-stage-header]") {
    await expectMostlyVisible(state.locator("h2"), { requireViewport: false });
    await expectMostlyVisible(state.locator("p"), { requireViewport: false });
  }
  if (selector === "[data-token]") {
    await expect(state).toHaveText("0.01 USDC");
  }
  if (selector === "[data-attempt]") {
    await expectMostlyVisible(state.locator("strong"), { requireViewport: false });
    await expectMostlyVisible(state.locator("[data-attempt-status]"), { requireViewport: false });
    await expectMostlyVisible(state.locator("span").last(), { requireViewport: false });
  }
  if (selector === "[data-evidence]") {
    await expect(state.locator("[data-evidence-item]")).toHaveCount(6);
    for (const [id, label, primary, detail] of EVIDENCE) {
      const item = state.locator(`[data-evidence-item="${id}"]`);
      await expectMostlyVisible(item, { requireViewport: false });
      await expectMostlyVisible(item.locator('[data-object-label="settle"]'), { requireViewport: false });
      await expect(item.locator('[data-object-label="settle"]')).toHaveText(label);
      await expect(item).toContainText(primary);
      await expect(item).toContainText(detail);
    }
  }
  if (selector === "[data-comparison]") {
    await expect(state.locator("tbody tr")).toHaveCount(6);
    for (const [id, classification] of CLASSIFICATIONS) {
      const row = state.locator(`[data-comparison-row="${id}"]`);
      await expectMostlyVisible(row, { requireViewport: false });
      await expectMostlyVisible(row.locator("[data-classification]"), { requireViewport: false });
      await expect(row.locator("[data-classification]")).toHaveText(classification);
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
    await expect(state).toContainText("Missing settlement proof remains visible");
  }
  if (selector === "[data-verdict]") {
    await expectMostlyVisible(state.locator("p").first(), { requireViewport: false });
    await expectMostlyVisible(state.locator("p").last(), { requireViewport: false });
    await expect(state).toContainText("UNVERIFIABLE");
    await expect(state).toContainText("no confirmed charge, no transaction hash");
  }
  if (selector === "[data-chain]") {
    const items = state.locator("[data-chain-item]");
    await expect(items).toHaveCount(4);
    for (const item of await items.all()) {
      await expectMostlyVisible(item, { requireViewport: false });
    }
    for (const label of REASONING_LABELS) {
      await expect(state).toContainText(label);
    }
  }
}

async function waitForAnimationReady(page: Page, layout: "desktop" | "mobile" = "desktop") {
  await expect(page.locator('[data-portfolio-experience][data-animated="ready"]')).toBeVisible();
  await expect(page.locator(`[data-animated-layout="${layout}"]`)).toBeVisible();
  await expect(page.locator(`[data-animated-layout="${layout === "desktop" ? "mobile" : "desktop"}"]`)).toBeHidden();
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
    await expectDesktopStateChildren(state, selector);
  }

  for (const [progress, selector] of [...DESKTOP_STATES].reverse()) {
    await scrollNarrativeTo(page, "desktop", progress);
    const state = activeNarrativeLocator(page, "desktop", selector);
    await expectMostlyVisible(state);
    await expectDesktopStateChildren(state, selector);
  }

  await scrollNarrativeTo(page, "desktop", 0.992);
  const transition = activeNarrativeLocator(page, "desktop", "[data-vault-transition]");
  await expectMostlyVisible(transition);
  await expect(transition.locator("[data-vault-transition-title]")).toHaveText("Vault Steward");
  await expectMostlyVisible(transition.locator("[data-vault-transition-title]"), { requireViewport: false });
  await expectMostlyVisible(transition.locator("[data-vault-transition-headline]"), { requireViewport: false });
  await expect(transition.locator("[data-vault-transition-step]")).toHaveCount(4);
  await expect(transition.locator("[data-vault-transition-step]")).toHaveText([
    "FIND",
    "PREVIEW",
    "APPROVE",
    "VERIFY",
  ]);
  for (const step of await transition.locator("[data-vault-transition-step]").all()) {
    await expectMostlyVisible(step, { requireViewport: false });
  }
  for (const [index, role] of VAULT_ROLES.entries()) {
    await expect(
      desktop.locator(`[data-evidence-item="${EVIDENCE[index]![0]}"] [data-object-label="vault"]`),
    ).toHaveText(role);
  }

  await scrollNarrativeTo(page, "desktop", 0.05);
  await expectMostlyVisible(activeNarrativeLocator(page, "desktop", "[data-stage-header]"));
  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});

test("desktop keeps one foreground frame readable at every narrative handoff", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await waitForAnimationReady(page);

  const opacity = async (selector: string) => activeNarrativeLocator(page, "desktop", selector)
    .evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));

  await scrollNarrativeTo(page, "desktop", 0.67);
  expect(await opacity("[data-comparison]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-evidence]")).toBeLessThanOrEqual(0.08);
  expect(await opacity("[data-attempt]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "desktop", 0.795);
  expect(await opacity("[data-mismatch]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-comparison]")).toBeLessThanOrEqual(0.02);
  expect(await opacity("[data-evidence]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "desktop", 0.895);
  expect(await opacity("[data-verdict]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-mismatch]")).toBeLessThanOrEqual(0.02);
  expect(await opacity("[data-comparison]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "desktop", 0.955);
  expect(await opacity("[data-chain]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-verdict]")).toBeLessThanOrEqual(0.02);
  expect(await opacity("[data-evidence]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "desktop", 0.992);
  expect(await opacity("[data-vault-transition]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-chain]")).toBeLessThanOrEqual(0.02);
  expect(await opacity("[data-verdict]")).toBeLessThanOrEqual(0.02);
});

test("mobile retires each foreground scene before the next scene settles", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await waitForAnimationReady(page, "mobile");

  const opacity = async (selector: string) => activeNarrativeLocator(page, "mobile", selector)
    .evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));

  await scrollNarrativeTo(page, "mobile", 0.35);
  expect(await opacity("[data-attempt]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-transaction]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "mobile", 0.515);
  expect(await opacity("[data-evidence]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-attempt]")).toBeLessThanOrEqual(0.02);
  expect(await opacity("[data-transaction]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "mobile", 0.675);
  expect(await opacity("[data-comparison]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-evidence]")).toBeLessThanOrEqual(0.08);
  expect(await opacity("[data-attempt]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "mobile", 0.795);
  expect(await opacity("[data-mismatch]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-comparison]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "mobile", 0.895);
  expect(await opacity("[data-verdict]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-mismatch]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "mobile", 0.955);
  expect(await opacity("[data-chain]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-verdict]")).toBeLessThanOrEqual(0.02);

  await scrollNarrativeTo(page, "mobile", 0.992);
  expect(await opacity("[data-vault-transition]")).toBeGreaterThanOrEqual(0.9);
  expect(await opacity("[data-chain]")).toBeLessThanOrEqual(0.02);
  expect(await opacity("[data-stage-header]")).toBeLessThanOrEqual(0.02);

  const evidenceBottom = await activeNarrativeLocator(page, "mobile", "[data-evidence-item]")
    .evaluateAll((items) => Math.max(...items.map((item) => item.getBoundingClientRect().bottom)));
  const titleTop = await activeNarrativeLocator(page, "mobile", "[data-vault-transition-title]")
    .evaluate((title) => title.getBoundingClientRect().top);
  expect(titleTop).toBeGreaterThan(evidenceBottom);
});

test("the persistent Vault arrival releases from the pinned scene", async ({ page }) => {
  const diagnostics = capturePageDiagnostics(page);
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
  await scrollNarrativeTo(page, "desktop", 0.995);
  await expectMostlyVisible(transition);
  await expect(arrival).not.toBeInViewport();
  const narrativeEnd = await page.locator("[data-narrative]").evaluate((node) => {
    const anchor = node.parentElement?.classList.contains("pin-spacer") ? node.parentElement : node;
    return anchor.getBoundingClientRect().top + window.scrollY + window.innerHeight * 7;
  });
  await page.evaluate((target) => window.scrollTo(0, target - 4), narrativeEnd);
  await waitForAnimationFrames(page);
  const beforeRelease = await page.evaluate(() => ({
    scrollY: window.scrollY,
    stage: document.querySelector('[data-animated-layout="desktop"] [data-stage]')?.getBoundingClientRect().toJSON(),
    arrival: document.querySelector("[data-vault-arrival]")?.getBoundingClientRect().toJSON(),
  }));
  await page.evaluate((target) => window.scrollTo(0, target + 8), narrativeEnd);
  await waitForAnimationFrames(page);
  const afterRelease = await page.evaluate(() => ({
    scrollY: window.scrollY,
    stage: document.querySelector('[data-animated-layout="desktop"] [data-stage]')?.getBoundingClientRect().toJSON(),
    arrival: document.querySelector("[data-vault-arrival]")?.getBoundingClientRect().toJSON(),
  }));
  expect(afterRelease.stage).not.toBeUndefined();
  expect(afterRelease.arrival).not.toBeUndefined();
  const scrollDelta = afterRelease.scrollY - beforeRelease.scrollY;
  const stageDelta = beforeRelease.stage!.top - afterRelease.stage!.top;
  const arrivalDelta = beforeRelease.arrival!.top - afterRelease.arrival!.top;
  expect(scrollDelta).toBeGreaterThanOrEqual(10);
  expect(scrollDelta).toBeLessThanOrEqual(14);
  expect(stageDelta).toBeGreaterThan(0);
  expect(stageDelta).toBeLessThanOrEqual(32);
  expect(arrivalDelta).toBeGreaterThan(0);
  expect(arrivalDelta).toBeLessThanOrEqual(32);
  expect(Math.abs(stageDelta - scrollDelta)).toBeLessThanOrEqual(20);
  expect(Math.abs(arrivalDelta - scrollDelta)).toBeLessThanOrEqual(20);

  const vaultTitles = page.locator(
    '[data-animated-layout="desktop"] [data-vault-transition-title], [data-vault-arrival] h2',
  );
  for (const offset of [0, 100, 200, 300, 400, 500, 600, 700, 750, 800, 850]) {
    await page.evaluate(([end, delta]) => window.scrollTo(0, end + delta), [narrativeEnd, offset]);
    await waitForAnimationFrames(page);
    const visibleTitles = await vaultTitles.evaluateAll((titles) => titles.filter((title) => {
      const bounds = title.getBoundingClientRect();
      const style = getComputedStyle(title);
      let effectiveOpacity = 1;
      for (let current: Element | null = title; current; current = current.parentElement) {
        effectiveOpacity *= Number(getComputedStyle(current).opacity);
      }
      return effectiveOpacity > 0.25
        && style.visibility !== "hidden"
        && bounds.bottom > 0
        && bounds.top < window.innerHeight;
    }).length);
    expect(visibleTitles, `release offset ${offset}px must expose exactly one Vault title`).toBe(1);
  }

  const documentHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.evaluate((target) => window.scrollTo(0, target), documentHeight);
  await waitForAnimationFrames(page);
  await expect(arrival).toBeInViewport();
  await expect(arrival.getByText("Keep your vault trustworthy")).toBeVisible();
  expect(diagnostics.pageErrors).toEqual([]);
  expect(diagnostics.consoleErrors).toEqual([]);
  expect(diagnostics.failedResponses).toEqual([]);
});
