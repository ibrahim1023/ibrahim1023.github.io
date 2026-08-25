import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { gsap } from "gsap";

import {
  buildIntroTimeline,
  buildSettleDiffTimeline,
  buildVaultTimeline,
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
      <div data-stage data-state="project-established">
        <header data-stage-header><h2>SettleDiff</h2><p>desc</p></header>
        <div data-transaction>
          <svg viewBox="0 0 1000 120" data-path>
            <path data-path-line d="M 20 46 L 980 46" />
          </svg>
          <span data-token>0.01 USDC</span>
          <span data-ack>acknowledged</span>
          <div data-attempt>ACTIVITY RECORDED</div>
        </div>
        <div data-evidence>
          <div data-evidence-item="request">REQUEST</div>
          <div data-evidence-item="payment">PAYMENT</div>
          <div data-evidence-item="vendor">VENDOR</div>
          <div data-evidence-item="chain">CHAIN</div>
          <div data-evidence-item="response">RESPONSE</div>
          <div data-evidence-item="receipt">RECEIPT</div>
        </div>
        <div data-comparison>comparison</div>
        <div data-mismatch>mismatch</div>
        <div data-verdict>verdict</div>
        <ol data-chain><li data-chain-item="claim">claim</li><li data-chain-item="evidence">evidence</li></ol>
      </div>
      <section data-vault-arrival>
        <h2>Vault Steward</h2>
        <p data-vault-descriptor>Keep your vault trustworthy</p>
        <ol data-vault-rail><li data-vault-rail-item>PROPOSE</li><li data-vault-rail-item>SIMULATE</li></ol>
        <p data-vault-cue>continues</p>
      </section>
    `;
    const path = root.querySelector('[data-path-line]') as SVGPathElement & {
      getTotalLength?: () => number;
    };
    if (path && typeof path.getTotalLength !== "function") {
      path.getTotalLength = () => 1000;
    }
    return root;
  }

  test("queryTimelineElements returns all expected animated targets", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root);

    expect(elements.intro.section).not.toBeNull();
    expect(elements.settle.stage).not.toBeNull();
    expect(elements.settle.token).not.toBeNull();
    expect(elements.settle.pathLine).not.toBeNull();
    expect(elements.settle.evidenceItems).toHaveLength(6);
    expect(elements.vault.section).not.toBeNull();
    expect(elements.vault.railItems).toHaveLength(2);
  });

  test("buildSettleDiffTimeline returns a labelled timeline", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root);
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

  test("buildIntroTimeline and buildVaultTimeline are non-empty", () => {
    const root = buildRoot();
    const elements = queryTimelineElements(root);

    const intro = buildIntroTimeline(elements.intro);
    const vault = buildVaultTimeline(elements.vault);

    expect(intro.duration()).toBeGreaterThan(0);
    expect(vault.duration()).toBeGreaterThan(0);
  });
});
