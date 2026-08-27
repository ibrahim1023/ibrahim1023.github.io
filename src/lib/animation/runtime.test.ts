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
            <div data-evidence><div data-evidence-item="request"></div></div>
            <div data-comparison></div>
            <div data-mismatch></div>
            <div data-verdict></div>
            <ol data-chain><li data-chain-item="claim"></li></ol>
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

function animationApis() {
  const mediaContext = {
    add: vi.fn((query: string, callback: () => (() => void) | void) =>
      query === NARRATIVE_MEDIA.desktop ? callback() : undefined,
    ),
    revert: vi.fn(),
  };

  const gsapApi = {
    matchMedia: vi.fn(() => mediaContext),
    registerPlugin: vi.fn(),
    set: vi.fn(),
  } as unknown as typeof gsap;
  const create = vi.fn((options: unknown) => {
    void options;
    return { kill: vi.fn() };
  });
  const scrollTriggerApi = {
    create,
  } as unknown as typeof ScrollTrigger;

  return { create, gsapApi, mediaContext, scrollTriggerApi };
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

    expect(debugRoot.querySelector('[data-stage][data-layout="desktop"]')).toHaveAttribute(
      "data-state",
      "request-in-flight",
    );
    debugCleanup();
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
});
