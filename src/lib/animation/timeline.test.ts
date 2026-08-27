import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { gsap } from "gsap";

import {
  buildIntroTimeline,
  buildNarrativeTimeline,
  buildSettleDiffTimeline,
  queryTimelineElements,
} from "./timeline";

describe("animation timeline builders", () => {
  beforeAll(() => {
    gsap.registerPlugin();
  });

  afterEach(() => {
    gsap.globalTimeline.clear();
  });

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
          <div data-stage data-layout="desktop" data-state="project-established">
            <header data-stage-header><h2>SettleDiff</h2><p>desc</p></header>
            <div data-transaction>
              <svg viewBox="0 0 1000 120" data-path>
                <path data-path-line d="M 20 46 L 980 46" />
              </svg>
              <span data-token>0.01 USDC</span>
              <div data-attempt>ACTIVITY RECORDED</div>
            </div>
            <div data-evidence>
              <div data-evidence-item="request">REQUEST</div>
              <div data-evidence-item="payment">PAYMENT</div>
              <div data-evidence-item="vendor">VENDOR</div>
              <div data-evidence-item="chain">CHAIN</div>
              <div data-evidence-item="response">RESPONSE</div>
              <div data-evidence-item="activity">ACTIVITY</div>
            </div>
            <div data-comparison>comparison</div>
            <div data-mismatch>mismatch</div>
            <div data-verdict>verdict</div>
            <ol data-chain><li data-chain-item="claim">claim</li><li data-chain-item="evidence">evidence</li></ol>
          </div>
          </div>
          <div data-animated-layout="mobile">
            <div data-stage data-layout="mobile">
              <div data-transaction><span data-token>mobile token</span></div>
              <div data-attempt>mobile attempt</div>
              <div data-evidence><div data-evidence-item="request">MOBILE REQUEST</div></div>
              <div data-comparison>mobile comparison</div>
              <div data-mismatch>mobile mismatch</div>
              <div data-verdict>mobile verdict</div>
              <ol data-chain><li data-chain-item="claim">mobile claim</li></ol>
            </div>
          </div>
        </div>
        <div data-scene-layer="vault">
          <section data-vault-arrival>
            <h2>Vault Steward</h2>
            <p data-vault-descriptor>Keep your vault trustworthy</p>
            <ol data-vault-rail><li data-vault-rail-item>PROPOSE</li><li data-vault-rail-item>SIMULATE</li></ol>
            <p data-vault-cue>continues</p>
          </section>
        </div>
      </div>
    `;
    const path = root.querySelector('[data-path-line]') as SVGPathElement & {
      getTotalLength?: () => number;
    };
    if (path && typeof path.getTotalLength !== "function") {
      path.getTotalLength = () => 1000;
    }
    return root;
  }

  test("queryTimelineElements scopes animated targets to the active layout", () => {
    const root = buildRoot();
    const desktop = queryTimelineElements(root, "desktop");
    const mobile = queryTimelineElements(root, "mobile");

    expect(desktop.intro.section).not.toBeNull();
    expect(desktop.narrative).not.toBeNull();
    expect(desktop.settle.stage).toHaveAttribute("data-layout", "desktop");
    expect(desktop.settle.token).not.toBeNull();
    expect(desktop.settle.pathLine).not.toBeNull();
    expect(desktop.settle.evidenceItems).toHaveLength(6);
    expect("ack" in desktop.settle).toBe(false);
    expect(desktop.vault.section).not.toBeNull();
    expect(desktop.vault.railItems).toHaveLength(2);
    expect(mobile.settle.stage).toHaveAttribute("data-layout", "mobile");
    expect(mobile.settle.token).toHaveTextContent("mobile token");
    expect(mobile.settle.evidenceItems).toHaveLength(1);
    expect(mobile.settle.stage).not.toBe(desktop.settle.stage);
  });

  test("buildSettleDiffTimeline returns a labelled timeline", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");
    const tl = buildSettleDiffTimeline(elements.settle);

    expect(tl.duration()).toBeGreaterThan(0);
    expect(Object.keys(tl.labels).sort()).toEqual([
      "attempt-recorded",
      "comparison-visible",
      "evidence-expanded",
      "mismatch-isolated",
      "project-established",
      "reasoning-chain",
      "request-in-flight",
      "unverifiable",
      "vault-steward-arrival",
    ]);
  });

  test("buildNarrativeTimeline and buildIntroTimeline are non-empty", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root, "desktop");

    const narrative = buildNarrativeTimeline(elements, "desktop");
    const intro = buildIntroTimeline(elements.intro);

    expect(narrative.duration()).toBeGreaterThan(0);
    expect(intro.duration()).toBeGreaterThan(0);
  });
});
