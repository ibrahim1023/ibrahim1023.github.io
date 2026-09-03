import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { describe, expect, test, vi } from "vitest";

import { NARRATIVE_MEDIA } from "./media";
import {
  initializePortfolioAnimations,
  shouldExposeTimelineState,
} from "./runtime";

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
    <div data-narrative="settlediff">
      <div data-animated-layout="desktop"><div data-stage data-layout="desktop" data-animatable><span data-path-origin></span><section data-settle-case-transition data-animatable><div data-verified-evidence-token data-animatable></div></section></div></div>
      <div data-animated-layout="mobile"><div data-stage data-layout="mobile" data-animatable><section data-settle-case-transition data-animatable></section></div></div>
    </div>
    <div data-narrative="casezero">
      <div data-animated-layout="desktop"><div data-casezero-stage data-layout="desktop" data-animatable><section data-vault-transition data-animatable><div data-lock-packet data-animatable></div><div data-vault-boundary data-animatable></div><h3 data-vault-transition-title data-animatable></h3><p data-vault-transition-headline data-animatable></p><ol data-vault-transition-rail data-animatable><li data-vault-transition-step data-animatable></li></ol></section></div></div>
      <div data-animated-layout="mobile"><div data-casezero-stage data-layout="mobile" data-animatable></div></div>
    </div>
  `;

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
  test("exposes timeline state only for an explicit development debug session", () => {
    expect(
      shouldExposeTimelineState({
        nodeEnv: "production",
        timelineDebug: "true",
      }),
    ).toBe(false);
    expect(
      shouldExposeTimelineState({
        nodeEnv: "development",
        timelineDebug: "true",
      }),
    ).toBe(true);
    expect(
      shouldExposeTimelineState({
        nodeEnv: "development",
        timelineDebug: undefined,
      }),
    ).toBe(false);
  });

  test("sets up media-scoped timelines and tears down their context", () => {
    vi.useFakeTimers();
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
    expect(root).not.toHaveAttribute("data-animated");

    vi.runAllTimers();

    expect(root).toHaveAttribute("data-animated", "ready");
    expect(create).toHaveBeenCalledTimes(3);
    const configs = create.mock.calls.map(([config]) => config as { id: string; end?: () => string });
    expect(configs.find(({ id }) => id === "settlediff")?.end?.()).toBe("+=5440");
    expect(configs.find(({ id }) => id === "casezero")?.end?.()).toBe("+=2880");
    expect(configs.map(({ id }) => id).sort()).toEqual(["casezero", "intro", "settlediff"]);

    cleanup();
    cleanup();

    expect(mediaContext.revert).toHaveBeenCalledOnce();
    expect(root).not.toHaveAttribute("data-animated");
    vi.useRealTimers();
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
    const mobileNarrativeTrigger = create.mock.calls[3]![0] as {
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

    expect(debugStage).toHaveAttribute("data-state", "purchase-in-flight");
    const debugCaseStage = debugRoot.querySelector('[data-casezero-stage][data-layout="desktop"]') as HTMLElement;
    const caseUpdate = (debugApis.create.mock.calls[1]![0] as { onUpdate: (trigger: { progress: number }) => void }).onUpdate;
    caseUpdate({ progress: 0.72 });
    expect(debugCaseStage).toHaveAttribute("data-state", "blind-by-construction");
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
    expect(triggerKills).toHaveLength(3);
    expect(triggerKills[0]).toHaveBeenCalledOnce();
    expect(triggerKills[1]).toHaveBeenCalledOnce();
    expect(triggerKills[2]).toHaveBeenCalledOnce();
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
    expect(create).toHaveBeenCalledTimes(3);
    expect((scrollTriggerApi.refresh as unknown as ReturnType<typeof vi.fn>)).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect((scrollTriggerApi.refresh as unknown as ReturnType<typeof vi.fn>)).toHaveBeenCalledOnce();

    mobileCleanup?.();
    cleanup();
    vi.useRealTimers();
  });

  test("clears animation properties and keeps the story readable when setup fails", () => {
    const root = buildRoot();
    root.querySelector("[data-intro]")?.remove();
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
    root.querySelector("[data-intro]")?.remove();
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
      '[data-casezero-stage][data-layout="desktop"]',
      '[data-vault-transition]',
      '[data-vault-transition-title]',
      '[data-vault-transition-step]',
      '[data-vault-transition-headline]',
    ];

    for (const selector of targetSelectors) {
      expect(Array.from(clearTargets)).toContain(root.querySelector(selector));
    }
  });

  test("clears every animated target without removing its readable document order", () => {
    const root = buildRoot();
    const animatableTargets = Array.from(root.querySelectorAll("[data-animatable]"));
    animatableTargets.forEach((target) => {
      (target as HTMLElement).style.cssText = "opacity: 0; transform: translateX(8px)";
    });
    root.querySelector("[data-intro]")?.remove();
    const { gsapApi, scrollTriggerApi } = animationApis();
    const clearSet = vi.fn((targets: NodeListOf<Element>, vars: { clearProps?: string }) => {
      if (vars.clearProps === "all") {
        targets.forEach((target) => target.removeAttribute("style"));
      }
    });
    gsapApi.set = clearSet as unknown as typeof gsap.set;

    initializePortfolioAnimations({
      root,
      gsapApi,
      scrollTriggerApi,
      viewportHeight: () => 800,
      exposeState: false,
    });

    expect(Array.from(clearSet.mock.calls[0]![0])).toEqual(animatableTargets);
    expect(animatableTargets.every((target) => !target.hasAttribute("style"))).toBe(true);
    expect(Array.from(root.querySelectorAll("[data-animatable]"))).toEqual(animatableTargets);
  });

  test("warns once across two failing media callbacks in one initialization", () => {
    vi.stubEnv("NODE_ENV", "development");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      const root = buildRoot();
      root.querySelector("[data-narrative]")?.remove();
      const apis = animationApis({
        activeQueries: [NARRATIVE_MEDIA.desktop, NARRATIVE_MEDIA.mobile],
      });

      const cleanup = initializePortfolioAnimations({
        root,
        gsapApi: apis.gsapApi,
        scrollTriggerApi: apis.scrollTriggerApi,
        viewportHeight: () => 800,
        exposeState: false,
      });

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenCalledWith("Portfolio animation disabled; using readable fallback.");
      expect(apis.mediaContext.add).toHaveBeenCalledTimes(2);
      cleanup();
    } finally {
      warn.mockRestore();
      vi.unstubAllEnvs();
    }
  });
});
