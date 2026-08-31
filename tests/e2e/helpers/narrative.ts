import { expect, type Locator, type Page } from "@playwright/test";

export const RUNWAY_MULTIPLIER = {
  desktop: 7,
  mobile: 4.75,
} as const;

export type NarrativeLayout = keyof typeof RUNWAY_MULTIPLIER;

export function activeLayout(page: Page, layout: NarrativeLayout): Locator {
  return page.locator(`[data-animated-layout="${layout}"]`);
}

export function activeNarrativeLocator(
  page: Page,
  layout: NarrativeLayout,
  selector: string,
): Locator {
  return activeLayout(page, layout).locator(selector);
}

export async function scrollNarrativeTo(
  page: Page,
  layout: NarrativeLayout,
  progress: number,
) {
  if (progress < 0 || progress > 1) {
    throw new Error(`Narrative progress must be between 0 and 1: ${progress}`);
  }

  const top = await page.locator("[data-narrative]").evaluate((node) => {
    // ScrollTrigger pins the narrative itself, so use its spacer as the
    // document anchor once the pin is active.
    const anchor = node.parentElement?.classList.contains("pin-spacer")
      ? node.parentElement
      : node;
    const rect = anchor.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("Viewport is required for narrative tests");

  const y = top + viewport.height * RUNWAY_MULTIPLIER[layout] * progress;
  await page.evaluate((target) => window.scrollTo(0, target), y);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

export async function expectMostlyVisible(
  locator: Locator,
  options: { requireViewport?: boolean } = {},
) {
  const { requireViewport = true } = options;
  await expect(locator).toBeVisible();
  if (requireViewport) {
    await expect(locator).toBeInViewport({ ratio: 0.25 });
  }
  await expect
    .poll(async () =>
      locator.evaluate((node) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return (
          Number(style.opacity) >= 0.75 && rect.width > 0 && rect.height > 0
          && Number.isFinite(rect.top) && Number.isFinite(rect.left)
        );
      }),
    )
    .toBe(true);
}

export async function expectMostlyHidden(locator: Locator) {
  await expect
    .poll(async () =>
      locator.evaluate((node) => {
        const style = getComputedStyle(node);
        return Number(style.opacity) <= 0.25 || style.visibility === "hidden";
      }),
    )
    .toBe(true);
}

export async function waitForAnimationFrames(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

export function capturePageDiagnostics(page: Page) {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("response", (response) => {
    if (!response.ok()) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  return { consoleErrors, failedResponses, pageErrors };
}
