import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { describe, expect, test, vi } from "vitest";

import { NARRATIVE_MEDIA } from "./media";
import { initializePortfolioAnimations } from "./runtime";

function buildRoot() {
  const root = document.createElement("div");
  root.innerHTML = `
    <section data-intro>
      <p data-intro-role>AI Systems Engineer</p>
      <h1 data-intro-name>Ibrahim Arshad</h1>
      <span data-intro-rule></span>
      <p data-intro-framing>Framing</p>
      <p data-intro-cue><span data-intro-cue-line></span>Selected work</p>
    </section>
    <div data-narrative>
      <div data-scene-layer="settle">
        <div data-animated-layout="desktop">
          <div data-stage data-layout="desktop" data-animatable>
            <div data-transaction><svg><path data-path-line></path></svg><span data-token></span></div>
            <div data-attempt></div>
            <div data-evidence><div data-evidence-item="request"><span data-object-label="settle" data-animatable></span><span data-object-label="vault" data-animatable></span></div></div>
            <div data-comparison></div>
            <div data-mismatch></div>
            <div data-verdict></div>
            <ol data-chain><li data-chain-item="claim"></li></ol>
            <section data-vault-transition data-animatable>
              <svg data-vault-transition-connectors><path data-vault-transition-connector="boundary" data-animatable /><path data-vault-transition-connector="recheck" data-animatable /></svg>
              <h3 data-vault-transition-title data-animatable>Vault Steward</h3>
              <p data-vault-transition-headline data-animatable>Keep your vault trustworthy</p>
              <ol data-vault-transition-rail data-animatable><li data-vault-transition-step data-animatable>FIND</li></ol>
            </section>
          </div>
        </div>
        <div data-animated-layout="mobile">
          <div data-stage data-layout="mobile" data-animatable>
            <div data-transaction><span data-token></span></div>
            <div data-attempt></div>
            <div data-evidence><div data-evidence-item="request"></div></div>
            <div data-comparison></div>
            <div data-mismatch></div>
            <div data-verdict></div>
            <ol data-chain><li data-chain-item="claim"></li></ol>
          </div>
        </div>
      </div>
      <div data-scene-layer="vault">
        <section data-vault-arrival><h2>Vault Steward</h2><p data-vault-descriptor></p><ol data-vault-rail><li data-vault-rail-item></li></ol><p data-vault-cue></p></section>
      </div>
    </div>
  `;

  const desktopPath = root.querySelector('[data-layout="desktop"] [data-path-line]') as SVGPathElement;
  Object.defineProperty(desktopPath, "getTotalLength", {
    configurable: true,
    value: () => 1000,
  });

  return root;
}

function animationApis({
  throwOnMobileAdd = false,
  activeQueries = [NARRATIVE_MEDIA.desktop] as string[],
}: { throwOnMobileAdd?: boolean; activeQueries?: string[] } = {}) {
  const branchCleanups: Array<() => void> = [];
  const callbacks = new Map<string, () => (() => void) | void>();
  const mediaContext = {
    add: vi.fn((query: string, callback: () => (() => void) | void) => {
      if (throwOnMobileAdd && query === NARRATIVE_MEDIA.mobile) {
        throw new Error("mobile media setup failed");
      }
      callbacks.set(query, callback);
      if (activeQueries.includes(query)) {
        const cleanup = callback();
        if (cleanup) branchCleanups.push(cleanup);
      }
    }),
    revert: vi.fn(() => branchCleanups.forEach((cleanup) => cleanup())),
  };

  const gsapApi = {
    matchMedia: vi.fn(() => mediaContext),
    registerPlugin: vi.fn(),
    set: vi.fn(),
  } as unknown as typeof gsap;
  const triggerKills: ReturnType<typeof vi.fn>[] = [];
  const create = vi.fn((options: unknown) => {
    void options;
    const kill = vi.fn();
    triggerKills.push(kill);
    return { kill };
  });
  const scrollTriggerApi = {
    create,
    refresh: vi.fn(),
  } as unknown as typeof ScrollTrigger;

  return { callbacks, create, gsapApi, mediaContext, scrollTriggerApi, triggerKills };
}

describe("portfolio animation runtime", () => {
  test("sets up media-scoped timelines and tears down their context", () => {
    const root = buildRoot();
    const { create, gsapApi, mediaContext, scrollTriggerApi } = animationApis();

    const cleanup = initializePortfolioAnimations({
      root,
      gsapApi,
      scrollTriggerApi,
      viewportHeight: () => 800,
      exposeState: false,
    });

    expect(gsapApi.matchMedia).toHaveBeenCalledOnce();
    expect(gsapApi.registerPlugin).toHaveBeenCalledOnce();
    expect(mediaContext.add).toHaveBeenCalledWith(NARRATIVE_MEDIA.desktop, expect.any(Function));
    expect(mediaContext.add).toHaveBeenCalledWith(NARRATIVE_MEDIA.mobile, expect.any(Function));
    expect(root).toHaveAttribute("data-animated", "ready");
    expect(create).toHaveBeenCalled();
    expect((create.mock.calls[0]![0] as { end: () => string }).end()).toBe(
      "+=5600",
    );

    cleanup();
    cleanup();

    expect(mediaContext.revert).toHaveBeenCalledOnce();
    expect(root).not.toHaveAttribute("data-animated");
  });

  test("pins the desktop scene but keeps the tall mobile narrative in normal scroll flow", () => {
    const root = buildRoot();
    const { callbacks, create, gsapApi, scrollTriggerApi } = animationApis({
      activeQueries: [],
    });

    const cleanup = initializePortfolioAnimations({
      root,
      gsapApi,
      scrollTriggerApi,
      viewportHeight: () => 844,
      exposeState: false,
    });
    const desktopCleanup = callbacks.get(NARRATIVE_MEDIA.desktop)!();
    const desktopNarrativeTrigger = create.mock.calls[0]![0] as {
      pin: boolean;
      pinSpacing: boolean;
      scrub: boolean | number;
    };

    expect(desktopNarrativeTrigger).toMatchObject({ pin: true, pinSpacing: true, scrub: 0.5 });

    desktopCleanup?.();
    const mobileCleanup = callbacks.get(NARRATIVE_MEDIA.mobile)!();
    const mobileNarrativeTrigger = create.mock.calls[2]![0] as {
      pin: boolean;
      pinSpacing: boolean;
      scrub: boolean | number;
    };

    expect(mobileNarrativeTrigger).toMatchObject({ pin: false, pinSpacing: false, scrub: true });

    mobileCleanup?.();
    cleanup();
  });

  test("exposes timeline state only when debug state is enabled", () => {
    const hiddenRoot = buildRoot();
    const hiddenApis = animationApis();
    const hiddenCleanup = initializePortfolioAnimations({
      root: hiddenRoot,
      gsapApi: hiddenApis.gsapApi,
      scrollTriggerApi: hiddenApis.scrollTriggerApi,
      viewportHeight: () => 800,
      exposeState: false,
    });
    const hiddenUpdate = (hiddenApis.create.mock.calls[0]![0] as {
      onUpdate: (trigger: { progress: number }) => void;
    }).onUpdate;

    hiddenUpdate({ progress: 0.15 });

    expect(hiddenRoot.querySelector('[data-stage][data-layout="desktop"]')).not.toHaveAttribute(
      "data-state",
    );
    hiddenCleanup();

    const debugRoot = buildRoot();
    const debugStage = debugRoot.querySelector(
      '[data-stage][data-layout="desktop"]',
    ) as HTMLElement;
    debugStage.dataset.state = "project-established";
    const debugApis = animationApis();
    const debugCleanup = initializePortfolioAnimations({
      root: debugRoot,
      gsapApi: debugApis.gsapApi,
      scrollTriggerApi: debugApis.scrollTriggerApi,
      viewportHeight: () => 800,
      exposeState: true,
    });
    const debugUpdate = (debugApis.create.mock.calls[0]![0] as {
      onUpdate: (trigger: { progress: number }) => void;
    }).onUpdate;

    debugUpdate({ progress: 0.15 });

    expect(debugStage).toHaveAttribute("data-state", "request-in-flight");
    debugCleanup();
    expect(debugStage).toHaveAttribute("data-state", "project-established");
  });

  test("reverts initialized branches when a later media registration fails", () => {
    const root = buildRoot();
    const { gsapApi, mediaContext, scrollTriggerApi, triggerKills } = animationApis({
      throwOnMobileAdd: true,
    });

    const cleanup = initializePortfolioAnimations({
      root,
      gsapApi,
      scrollTriggerApi,
      viewportHeight: () => 800,
      exposeState: false,
    });

    expect(cleanup).toEqual(expect.any(Function));
    expect(mediaContext.revert).toHaveBeenCalledOnce();
    expect(triggerKills).toHaveLength(2);
    expect(triggerKills[0]).toHaveBeenCalledOnce();
    expect(triggerKills[1]).toHaveBeenCalledOnce();
    expect(root).not.toHaveAttribute("data-animated");
  });

  test("refreshes once after a newly matched layout creates its geometry", () => {
    vi.useFakeTimers();
    const root = buildRoot();
    const { callbacks, create, gsapApi, scrollTriggerApi } = animationApis({
      activeQueries: [],
    });

    const cleanup = initializePortfolioAnimations({
      root,
      gsapApi,
      scrollTriggerApi,
      viewportHeight: () => 844,
      exposeState: false,
    });
    const mobileCleanup = callbacks.get(NARRATIVE_MEDIA.mobile)!();

    expect(mobileCleanup).toEqual(expect.any(Function));
    expect(create).toHaveBeenCalledTimes(2);
    expect((scrollTriggerApi.refresh as unknown as ReturnType<typeof vi.fn>)).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect((scrollTriggerApi.refresh as unknown as ReturnType<typeof vi.fn>)).toHaveBeenCalledOnce();

    mobileCleanup?.();
    cleanup();
    vi.useRealTimers();
  });

  test("clears animation properties and keeps the story readable when setup fails", () => {
    const root = buildRoot();
    const failingPath = root.querySelector('[data-layout="desktop"] [data-path-line]') as SVGPathElement;
    Object.defineProperty(failingPath, "getTotalLength", {
      value: () => {
        throw new Error("path unavailable");
      },
    });
    const { gsapApi, scrollTriggerApi } = animationApis();

    const cleanup = initializePortfolioAnimations({
      root,
      gsapApi,
      scrollTriggerApi,
      viewportHeight: () => 800,
      exposeState: false,
    });

    expect(cleanup).toEqual(expect.any(Function));
    expect(root).not.toHaveAttribute("data-animated");
    expect(root).not.toHaveAttribute("data-state");
    expect(gsapApi.set).toHaveBeenCalledWith(root.querySelectorAll("[data-animatable]"), {
      clearProps: "all",
    });
  });

  test("clears stage custom properties and Vault transition targets on setup failure", () => {
    const root = buildRoot();
    const failingPath = root.querySelector('[data-layout="desktop"] [data-path-line]') as SVGPathElement;
    Object.defineProperty(failingPath, "getTotalLength", {
      value: () => {
        throw new Error("path unavailable");
      },
    });
    const { gsapApi, scrollTriggerApi } = animationApis();

    initializePortfolioAnimations({
      root,
      gsapApi,
      scrollTriggerApi,
      viewportHeight: () => 800,
      exposeState: false,
    });

    const clearTargets = (gsapApi.set as unknown as ReturnType<typeof vi.fn>).mock.calls.at(-1)![0] as NodeListOf<Element>;
    const targetSelectors = [
      '[data-stage][data-layout="desktop"]',
      '[data-vault-transition]',
      '[data-vault-transition-title]',
      '[data-vault-transition-step]',
      '[data-vault-transition-connector]',
    ];

    for (const selector of targetSelectors) {
      expect(Array.from(clearTargets)).toContain(root.querySelector(selector));
    }
  });
});
