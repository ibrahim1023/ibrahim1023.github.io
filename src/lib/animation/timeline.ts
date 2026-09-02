import { gsap } from "gsap";
import { STATE_RANGES } from "@/features/settle-diff/settleDiffState";
import { SETTLE_DIFF_STATES, type SettleDiffState } from "@/features/settle-diff/settleDiffTypes";
import type { NarrativeLayout } from "./media";

export interface PortfolioTimelineElements {
  intro: { section: HTMLElement | null; role: HTMLElement | null; name: HTMLElement | null; rule: HTMLElement | null; framing: HTMLElement | null; cue: HTMLElement | null; cueLine: HTMLElement | null; pathOrigin: HTMLElement | null };
  narrative: HTMLElement | null;
  settle: SettleDiffTimelineElements;
  vault: VaultTimelineElements;
}

export interface SettleDiffTimelineElements {
  stage: HTMLElement | null; header: HTMLElement | null; surface: HTMLElement | null;
  artifactScene: HTMLElement | null; artifact: HTMLElement | null; openingPrompt: HTMLElement | null;
  uncertainty: HTMLElement | null; reconstruction: HTMLElement | null; layers: Element[] | null;
  originIncident: HTMLElement | null; systemBoundary: HTMLElement | null; railLabels: Element[] | null;
  proof: HTMLElement | null; proofHeader: HTMLElement | null; providerRecord: HTMLElement | null;
  proofLink: HTMLElement | null; independentRecord: HTMLElement | null; checks: HTMLElement | null;
  checkItems: Element[] | null; verified: HTMLElement | null; thesis: HTMLElement | null;
}

export interface VaultTimelineElements {
  transition: HTMLElement | null; packet: HTMLElement | null; boundary: HTMLElement | null;
  title: HTMLElement | null; headline: HTMLElement | null; rail: HTMLElement | null; railItems: Element[] | null;
}

export function queryTimelineElements(root: HTMLElement, layout: NarrativeLayout): PortfolioTimelineElements {
  const scope = `[data-animated-layout="${layout}"]`;
  const query = <T extends Element>(selector: string) => root.querySelector(`${scope} ${selector}`) as T | null;
  const all = (selector: string) => {
    const found = root.querySelectorAll(`${scope} ${selector}`);
    return found.length ? Array.from(found) : null;
  };
  return {
    intro: {
      section: root.querySelector("[data-intro]"), role: root.querySelector("[data-intro-role]"),
      name: root.querySelector("[data-intro-name]"), rule: root.querySelector("[data-intro-rule]"),
      framing: root.querySelector("[data-intro-framing]"), cue: root.querySelector("[data-intro-cue]"),
      cueLine: root.querySelector("[data-intro-cue-line]"), pathOrigin: query("[data-path-origin]"),
    },
    narrative: root.querySelector("[data-narrative]"),
    settle: {
      stage: query("[data-stage]"), header: query("[data-stage-header]"), surface: query("[data-scene-surface]"),
      artifactScene: query("[data-artifact-scene]"), artifact: query("[data-artifact]"), openingPrompt: query("[data-opening-prompt]"),
      uncertainty: query("[data-uncertainty]"), reconstruction: query("[data-reconstruction]"), layers: all("[data-reconstruction-layer]"),
      originIncident: query("[data-origin-incident]"), systemBoundary: query("[data-system-boundary]"), railLabels: all("[data-rail-label]"),
      proof: query("[data-proof]"), proofHeader: query("[data-proof-header]"), providerRecord: query("[data-provider-record]"),
      proofLink: query("[data-proof-link]"), independentRecord: query("[data-independent-record]"), checks: query("[data-checks]"),
      checkItems: all("[data-check]"), verified: query("[data-verified]"), thesis: query("[data-closing-thesis]"),
    },
    vault: {
      transition: query("[data-vault-transition]"), packet: query("[data-evidence-packet]"), boundary: query("[data-vault-boundary]"),
      title: query("[data-vault-transition-title]"), headline: query("[data-vault-transition-headline]"),
      rail: query("[data-vault-transition-rail]"), railItems: all("[data-vault-transition-step]"),
    },
  };
}

const RUNWAY_SECONDS = 12;
export const seconds = (progress: number) => progress * RUNWAY_SECONDS;
export const stateTime = (state: SettleDiffState): readonly [number, number] => STATE_RANGES[state].map(seconds) as unknown as readonly [number, number];
const timing = (state: SettleDiffState) => { const [start, end] = stateTime(state); return { start, end, duration: end - start }; };
const present = <T extends Element>(targets: Array<T | null | undefined>): T[] => targets.filter((target): target is T => Boolean(target));

export function buildNarrativeTimeline(elements: PortfolioTimelineElements, layout: NarrativeLayout): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  appendSettleDiffTweens(tl, elements.settle, elements.vault, layout);
  return tl;
}

export function buildSettleDiffTimeline(elements: SettleDiffTimelineElements): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  appendSettleDiffTweens(tl, elements, { transition: null, packet: null, boundary: null, title: null, headline: null, rail: null, railItems: null }, "desktop");
  return tl;
}

function appendSettleDiffTweens(tl: gsap.core.Timeline, e: SettleDiffTimelineElements, vault: VaultTimelineElements, layout: NarrativeLayout) {
  SETTLE_DIFF_STATES.forEach((state) => tl.addLabel(state, stateTime(state)[0]));
  const hidden = present([e.uncertainty, e.reconstruction, e.originIncident, e.systemBoundary, e.proof, e.checks, e.verified, vault.transition]);
  if (hidden.length) tl.set(hidden, { opacity: 0, visibility: "hidden" }, 0);

  const purchase = timing("purchase-in-flight");
  if (e.artifact) tl.fromTo(e.artifact, layout === "desktop" ? { xPercent: -190, opacity: 1 } : { yPercent: -75, opacity: 1 }, layout === "desktop" ? { id: "purchase-flight", xPercent: 0, opacity: 1, duration: purchase.duration * .65, ease: "power2.out" } : { id: "mobile-purchase-flight", yPercent: 0, opacity: 1, duration: purchase.duration * .65, ease: "power2.out" }, purchase.start);
  if (e.openingPrompt) tl.fromTo(e.openingPrompt, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: purchase.duration * .35 }, purchase.start + purchase.duration * .6);

  const uncertain = timing("outcome-uncertain");
  const opening = present([e.artifactScene, e.openingPrompt]);
  if (opening.length) tl.to(opening, { opacity: 0, visibility: "hidden", duration: uncertain.duration * .25 }, uncertain.start);
  if (e.uncertainty) tl.fromTo(e.uncertainty, { opacity: 0, visibility: "hidden", y: 18 }, { id: layout === "mobile" ? "mobile-outcome-uncertain" : "outcome-uncertain", opacity: 1, visibility: "visible", y: 0, duration: uncertain.duration * .55 }, uncertain.start + uncertain.duration * .2);

  const reconstruction = timing("evidence-reconstructed");
  if (e.uncertainty) tl.to(e.uncertainty, { opacity: 0, visibility: "hidden", duration: reconstruction.duration * .2 }, reconstruction.start);
  if (e.surface) tl.to(e.surface, { backgroundColor: "#181b1d", duration: reconstruction.duration * .65 }, reconstruction.start);
  if (e.reconstruction) tl.fromTo(e.reconstruction, { opacity: 0, visibility: "hidden" }, { opacity: 1, visibility: "visible", duration: reconstruction.duration * .25 }, reconstruction.start + reconstruction.duration * .16);
  if (e.layers) tl.fromTo(e.layers, layout === "desktop" ? { opacity: 0, y: 28 } : { opacity: 0, yPercent: 18 }, layout === "desktop" ? { id: "evidence-layers", opacity: 1, y: 0, stagger: .1, duration: reconstruction.duration * .45 } : { id: "mobile-evidence-layers", opacity: 1, yPercent: 0, stagger: .08, duration: reconstruction.duration * .45 }, reconstruction.start + reconstruction.duration * .25);

  const origin = timing("origin-incident");
  if (e.reconstruction) tl.to(e.reconstruction, { opacity: 0, visibility: "hidden", duration: origin.duration * .2 }, origin.start);
  if (e.originIncident) tl.fromTo(e.originIncident, { opacity: 0, visibility: "hidden", y: 16 }, { id: "origin-incident", opacity: 1, visibility: "visible", y: 0, duration: origin.duration * .5 }, origin.start + origin.duration * .2);

  const evolved = timing("system-evolved");
  if (e.originIncident) tl.to(e.originIncident, { opacity: 0, visibility: "hidden", duration: evolved.duration * .2 }, evolved.start);
  if (e.systemBoundary) tl.fromTo(e.systemBoundary, { opacity: 0, visibility: "hidden", scale: .94 }, { id: "system-evolved", opacity: 1, visibility: "visible", scale: 1, duration: evolved.duration * .5 }, evolved.start + evolved.duration * .18);
  if (e.railLabels) tl.fromTo(e.railLabels, { opacity: 0, x: (i) => i ? 30 : -30 }, { opacity: 1, x: 0, stagger: .08, duration: evolved.duration * .35 }, evolved.start + evolved.duration * .42);

  const proof = timing("independent-proof");
  if (e.systemBoundary) tl.to(e.systemBoundary, { opacity: 0, visibility: "hidden", duration: proof.duration * .2 }, proof.start);
  if (e.surface) tl.to(e.surface, { backgroundColor: "#e9e7e1", duration: proof.duration * .7 }, proof.start);
  if (e.header) tl.to(e.header, { opacity: .18, duration: proof.duration * .4 }, proof.start);
  if (e.proof) tl.set(e.proof, { opacity: 1, visibility: "visible" }, proof.start + proof.duration * .14);
  if (e.proofHeader) tl.fromTo(e.proofHeader, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: proof.duration * .35 }, proof.start + proof.duration * .18);
  if (e.providerRecord) tl.fromTo(e.providerRecord, layout === "desktop" ? { opacity: 0, x: -35 } : { opacity: 0, yPercent: 12 }, layout === "desktop" ? { id: "provider-record", opacity: 1, x: 0, duration: proof.duration * .4 } : { id: "mobile-provider-record", opacity: 1, yPercent: 0, duration: proof.duration * .35 }, proof.start + proof.duration * .3);
  if (e.independentRecord) tl.fromTo(e.independentRecord, layout === "desktop" ? { opacity: 0, x: 35 } : { opacity: 0, yPercent: 12 }, layout === "desktop" ? { id: "independent-record", opacity: 1, x: 0, duration: proof.duration * .4 } : { id: "mobile-independent-record", opacity: 1, yPercent: 0, duration: proof.duration * .35 }, proof.start + proof.duration * .48);
  if (e.proofLink) tl.fromTo(e.proofLink, { opacity: 0 }, { opacity: 1, duration: proof.duration * .2 }, proof.start + proof.duration * .62);

  const checks = timing("checks-complete");
  if (e.proof) tl.to(e.proof, { opacity: 0, visibility: "hidden", duration: checks.duration * .2 }, checks.start);
  if (e.checks) tl.fromTo(e.checks, { opacity: 0, visibility: "hidden" }, { opacity: 1, visibility: "visible", duration: checks.duration * .25 }, checks.start + checks.duration * .14);
  if (e.checkItems) tl.fromTo(e.checkItems, { opacity: 0, y: 8 }, { id: "deterministic-checks", opacity: 1, y: 0, stagger: .035, duration: checks.duration * .35 }, checks.start + checks.duration * .25);

  const verified = timing("verified");
  if (e.checks) tl.to(e.checks, { opacity: 0, visibility: "hidden", duration: verified.duration * .2 }, verified.start);
  if (e.header) tl.to(e.header, { opacity: 0, visibility: "hidden", duration: verified.duration * .2 }, verified.start);
  if (e.verified) tl.fromTo(e.verified, { opacity: 0, visibility: "hidden", scale: .96 }, { id: "verified-result", opacity: 1, visibility: "visible", scale: 1, duration: verified.duration * .45 }, verified.start + verified.duration * .15);
  if (e.thesis) tl.fromTo(e.thesis, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: verified.duration * .35 }, verified.start + verified.duration * .5);

  const handoff = timing("vault-handoff");
  if (e.verified) tl.to(e.verified, { opacity: 0, visibility: "hidden", duration: handoff.duration * .18 }, handoff.start);
  if (e.surface) tl.to(e.surface, { backgroundColor: "#dedfd7", duration: handoff.duration * .7 }, handoff.start);
  if (vault.transition) tl.set(vault.transition, { opacity: 1, visibility: "visible" }, handoff.start + handoff.duration * .16);
  if (vault.packet) tl.fromTo(vault.packet, { opacity: 0, scale: 1.45 }, { id: "evidence-packet", opacity: 1, scale: 1, duration: handoff.duration * .35 }, handoff.start + handoff.duration * .16);
  if (vault.boundary) tl.fromTo(vault.boundary, { opacity: 0, scaleX: .2 }, { opacity: 1, scaleX: 1, duration: handoff.duration * .38 }, handoff.start + handoff.duration * .34);
  const vaultCopy = present([vault.title, vault.headline, vault.rail]);
  if (vaultCopy.length) tl.fromTo(vaultCopy, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: .05, duration: handoff.duration * .28 }, handoff.start + handoff.duration * .5);
  tl.to({}, { duration: handoff.end - handoff.start }, handoff.start);
}

export function buildIntroTimeline(elements: PortfolioTimelineElements["intro"]): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  const targets = present([elements.role, elements.name, elements.rule, elements.framing, elements.cue]);
  if (targets.length) tl.fromTo(targets, { opacity: 1, y: 0 }, { opacity: .15, y: -40, stagger: .02, duration: .6 }, 0);
  if (elements.cueLine) tl.fromTo(elements.cueLine, { scaleX: 1, transformOrigin: "left center" }, { scaleX: 1.7, duration: .6 }, 0);
  if (elements.pathOrigin) tl.fromTo(elements.pathOrigin, { opacity: .2, scaleX: .4, transformOrigin: "left center" }, { opacity: 1, scaleX: 1, duration: .6 }, 0);
  return tl;
}
