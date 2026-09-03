import { gsap } from "gsap";
import { CASE_ZERO_STATE_RANGES } from "@/features/case-zero/caseZeroState";
import { CASE_ZERO_STATES, type CaseZeroState } from "@/features/case-zero/caseZeroTypes";
import { STATE_RANGES } from "@/features/settle-diff/settleDiffState";
import { SETTLE_DIFF_STATES, type SettleDiffState } from "@/features/settle-diff/settleDiffTypes";
import type { NarrativeLayout } from "./media";

export interface IntroTimelineElements { section: HTMLElement | null; role: HTMLElement | null; name: HTMLElement | null; rule: HTMLElement | null; framing: HTMLElement | null; cue: HTMLElement | null; cueLine: HTMLElement | null; pathOrigin: HTMLElement | null; }
export interface SettleDiffTimelineElements {
  narrative: HTMLElement | null; stage: HTMLElement | null; header: HTMLElement | null; surface: HTMLElement | null; artifactScene: HTMLElement | null; artifact: HTMLElement | null; openingPrompt: HTMLElement | null; uncertainty: HTMLElement | null; reconstruction: HTMLElement | null; layers: Element[] | null; originIncident: HTMLElement | null; systemBoundary: HTMLElement | null; railLabels: Element[] | null; proof: HTMLElement | null; proofHeader: HTMLElement | null; providerRecord: HTMLElement | null; proofLink: HTMLElement | null; independentRecord: HTMLElement | null; checks: HTMLElement | null; checkItems: Element[] | null; verified: HTMLElement | null; thesis: HTMLElement | null; transition: HTMLElement | null; verifiedToken: HTMLElement | null; bridgeCopy: HTMLElement | null;
}
export interface CaseZeroTimelineElements {
  narrative: HTMLElement | null; stage: HTMLElement | null; header: HTMLElement | null; surface: HTMLElement | null; question: HTMLElement | null; caseFile: HTMLElement | null; evidenceLayers: Element[] | null; blindScene: HTMLElement | null; generatedEvidence: HTMLElement | null; blindBoundary: HTMLElement | null; officialFinding: HTMLElement | null; blindClimax: HTMLElement | null; lockRecord: HTMLElement | null; vaultTransition: HTMLElement | null; lockPacket: HTMLElement | null; vaultBoundary: HTMLElement | null; vaultTitle: HTMLElement | null; vaultHeadline: HTMLElement | null; vaultRail: HTMLElement | null; vaultRailItems: Element[] | null;
}
export interface PortfolioTimelineElements { intro: IntroTimelineElements; settlediff: SettleDiffTimelineElements; casezero: CaseZeroTimelineElements; }

const one = <T extends Element>(root: HTMLElement, scope: string, selector: string) => root.querySelector(`${scope} ${selector}`) as T | null;
const many = (root: HTMLElement, scope: string, selector: string) => { const found = root.querySelectorAll(`${scope} ${selector}`); return found.length ? Array.from(found) : null; };

export function queryPortfolioTimelineElements(root: HTMLElement, layout: NarrativeLayout): PortfolioTimelineElements {
  const s = `[data-narrative="settlediff"] [data-animated-layout="${layout}"]`;
  const c = `[data-narrative="casezero"] [data-animated-layout="${layout}"]`;
  return {
    intro: { section: root.querySelector("[data-intro]"), role: root.querySelector("[data-intro-role]"), name: root.querySelector("[data-intro-name]"), rule: root.querySelector("[data-intro-rule]"), framing: root.querySelector("[data-intro-framing]"), cue: root.querySelector("[data-intro-cue]"), cueLine: root.querySelector("[data-intro-cue-line]"), pathOrigin: one(root, s, "[data-path-origin]") },
    settlediff: {
      narrative: root.querySelector('[data-narrative="settlediff"]'), stage: one(root, s, "[data-stage]"), header: one(root, s, "[data-stage-header]"), surface: one(root, s, "[data-scene-surface]"), artifactScene: one(root, s, "[data-artifact-scene]"), artifact: one(root, s, "[data-artifact]"), openingPrompt: one(root, s, "[data-opening-prompt]"), uncertainty: one(root, s, "[data-uncertainty]"), reconstruction: one(root, s, "[data-reconstruction]"), layers: many(root, s, "[data-reconstruction-layer]"), originIncident: one(root, s, "[data-origin-incident]"), systemBoundary: one(root, s, "[data-system-boundary]"), railLabels: many(root, s, "[data-rail-label]"), proof: one(root, s, "[data-proof]"), proofHeader: one(root, s, "[data-proof-header]"), providerRecord: one(root, s, "[data-provider-record]"), proofLink: one(root, s, "[data-proof-link]"), independentRecord: one(root, s, "[data-independent-record]"), checks: one(root, s, "[data-checks]"), checkItems: many(root, s, "[data-check]"), verified: one(root, s, "[data-verified]"), thesis: one(root, s, "[data-closing-thesis]"), transition: one(root, s, "[data-settle-case-transition]"), verifiedToken: one(root, s, "[data-verified-evidence-token]"), bridgeCopy: one(root, s, "[data-casezero-bridge-copy]"),
    },
    casezero: {
      narrative: root.querySelector('[data-narrative="casezero"]'), stage: one(root, c, "[data-casezero-stage]"), header: one(root, c, "[data-casezero-header]"), surface: one(root, c, "[data-casezero-surface]"), question: one(root, c, "[data-casezero-question]"), caseFile: one(root, c, "[data-case-file]"), evidenceLayers: many(root, c, "[data-evidence-layer]"), blindScene: one(root, c, "[data-blind-scene]"), generatedEvidence: one(root, c, "[data-generated-evidence]"), blindBoundary: one(root, c, "[data-blind-boundary]"), officialFinding: one(root, c, "[data-official-finding]"), blindClimax: one(root, c, "[data-blind-climax]"), lockRecord: one(root, c, "[data-lock-record]"), vaultTransition: one(root, c, "[data-vault-transition]"), lockPacket: one(root, c, "[data-lock-packet]"), vaultBoundary: one(root, c, "[data-vault-boundary]"), vaultTitle: one(root, c, "[data-vault-transition-title]"), vaultHeadline: one(root, c, "[data-vault-transition-headline]"), vaultRail: one(root, c, "[data-vault-transition-rail]"), vaultRailItems: many(root, c, "[data-vault-transition-step]"),
    },
  };
}
export const queryTimelineElements = queryPortfolioTimelineElements;

const SETTLE_SECONDS = 12;
const CASE_SECONDS = 9;
export const seconds = (progress: number) => progress * SETTLE_SECONDS;
const settleTiming = (state: SettleDiffState) => { const [rangeStart, rangeEnd] = STATE_RANGES[state]; const start = seconds(rangeStart); const end = seconds(rangeEnd); return { start, end, duration: end - start }; };
const caseTiming = (state: CaseZeroState) => { const [rangeStart, rangeEnd] = CASE_ZERO_STATE_RANGES[state]; const start = rangeStart * CASE_SECONDS; const end = rangeEnd * CASE_SECONDS; return { start, end, duration: end - start }; };
const present = <T extends Element>(targets: Array<T | null | undefined>): T[] => targets.filter((target): target is T => Boolean(target));

export function buildSettleDiffNarrativeTimeline(e: SettleDiffTimelineElements, layout: NarrativeLayout): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  SETTLE_DIFF_STATES.forEach((state) => tl.addLabel(state, settleTiming(state).start));
  const hidden = present([e.uncertainty, e.reconstruction, e.originIncident, e.systemBoundary, e.proof, e.checks, e.verified, e.transition]);
  if (hidden.length) tl.set(hidden, { opacity: 0, visibility: "hidden" }, 0);
  const purchase = settleTiming("purchase-in-flight");
  if (e.artifact) tl.fromTo(e.artifact, layout === "desktop" ? { xPercent: -190 } : { yPercent: -75 }, layout === "desktop" ? { id: "purchase-flight", xPercent: 0, duration: purchase.duration * .65, ease: "power2.out" } : { id: "mobile-purchase-flight", yPercent: 0, duration: purchase.duration * .65, ease: "power2.out" }, purchase.start);
  if (e.openingPrompt) tl.fromTo(e.openingPrompt, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: purchase.duration * .35 }, purchase.start + purchase.duration * .6);
  const uncertain = settleTiming("outcome-uncertain");
  const opening = present([e.artifactScene, e.openingPrompt]);
  if (opening.length) tl.to(opening, { opacity: 0, visibility: "hidden", duration: uncertain.duration * .25 }, uncertain.start);
  if (e.uncertainty) tl.fromTo(e.uncertainty, { opacity: 0, visibility: "hidden", y: 18 }, { id: layout === "mobile" ? "mobile-outcome-uncertain" : "outcome-uncertain", opacity: 1, visibility: "visible", y: 0, duration: uncertain.duration * .55 }, uncertain.start + uncertain.duration * .2);
  const reconstruction = settleTiming("evidence-reconstructed");
  if (e.uncertainty) tl.to(e.uncertainty, { opacity: 0, visibility: "hidden", duration: reconstruction.duration * .2 }, reconstruction.start);
  if (e.surface) tl.to(e.surface, { backgroundColor: "#181b1d", duration: reconstruction.duration * .65 }, reconstruction.start);
  if (e.reconstruction) tl.fromTo(e.reconstruction, { opacity: 0, visibility: "hidden" }, { opacity: 1, visibility: "visible", duration: reconstruction.duration * .25 }, reconstruction.start + reconstruction.duration * .16);
  if (e.layers) tl.fromTo(e.layers, layout === "desktop" ? { opacity: 0, y: 28 } : { opacity: 0, yPercent: 18 }, layout === "desktop" ? { id: "evidence-layers", opacity: 1, y: 0, stagger: .1, duration: reconstruction.duration * .45 } : { id: "mobile-evidence-layers", opacity: 1, yPercent: 0, stagger: .08, duration: reconstruction.duration * .45 }, reconstruction.start + reconstruction.duration * .25);
  const origin = settleTiming("origin-incident");
  if (e.reconstruction) tl.to(e.reconstruction, { opacity: 0, visibility: "hidden", duration: origin.duration * .2 }, origin.start);
  if (e.originIncident) tl.fromTo(e.originIncident, { opacity: 0, visibility: "hidden", y: 16 }, { id: "origin-incident", opacity: 1, visibility: "visible", y: 0, duration: origin.duration * .5 }, origin.start + origin.duration * .2);
  const evolved = settleTiming("system-evolved");
  if (e.originIncident) tl.to(e.originIncident, { opacity: 0, visibility: "hidden", duration: evolved.duration * .2 }, evolved.start);
  if (e.systemBoundary) tl.fromTo(e.systemBoundary, { opacity: 0, visibility: "hidden", scale: .94 }, { id: "system-evolved", opacity: 1, visibility: "visible", scale: 1, duration: evolved.duration * .5 }, evolved.start + evolved.duration * .18);
  if (e.railLabels) tl.fromTo(e.railLabels, { opacity: 0, x: (i) => i ? 30 : -30 }, { opacity: 1, x: 0, stagger: .08, duration: evolved.duration * .35 }, evolved.start + evolved.duration * .42);
  const proof = settleTiming("independent-proof");
  if (e.systemBoundary) tl.to(e.systemBoundary, { opacity: 0, visibility: "hidden", duration: proof.duration * .2 }, proof.start);
  if (e.surface) tl.to(e.surface, { backgroundColor: "#e9e7e1", duration: proof.duration * .7 }, proof.start);
  if (e.header) tl.to(e.header, { opacity: .18, duration: proof.duration * .4 }, proof.start);
  if (e.proof) tl.set(e.proof, { opacity: 1, visibility: "visible" }, proof.start + proof.duration * .14);
  if (e.proofHeader) tl.fromTo(e.proofHeader, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: proof.duration * .35 }, proof.start + proof.duration * .18);
  if (e.providerRecord) tl.fromTo(e.providerRecord, layout === "desktop" ? { opacity: 0, x: -35 } : { opacity: 0, yPercent: 12 }, layout === "desktop" ? { id: "provider-record", opacity: 1, x: 0, duration: proof.duration * .4 } : { id: "mobile-provider-record", opacity: 1, yPercent: 0, duration: proof.duration * .35 }, proof.start + proof.duration * .3);
  if (e.independentRecord) tl.fromTo(e.independentRecord, layout === "desktop" ? { opacity: 0, x: 35 } : { opacity: 0, yPercent: 12 }, layout === "desktop" ? { id: "independent-record", opacity: 1, x: 0, duration: proof.duration * .4 } : { id: "mobile-independent-record", opacity: 1, yPercent: 0, duration: proof.duration * .35 }, proof.start + proof.duration * .48);
  if (e.proofLink) tl.fromTo(e.proofLink, { opacity: 0 }, { opacity: 1, duration: proof.duration * .2 }, proof.start + proof.duration * .62);
  const checks = settleTiming("checks-complete");
  if (e.proof) tl.to(e.proof, { opacity: 0, visibility: "hidden", duration: checks.duration * .2 }, checks.start);
  if (e.checks) tl.fromTo(e.checks, { opacity: 0, visibility: "hidden" }, { opacity: 1, visibility: "visible", duration: checks.duration * .25 }, checks.start + checks.duration * .14);
  if (e.checkItems) tl.fromTo(e.checkItems, { opacity: 0, y: 8 }, { id: "deterministic-checks", opacity: 1, y: 0, stagger: .035, duration: checks.duration * .35 }, checks.start + checks.duration * .25);
  const verified = settleTiming("verified");
  if (e.checks) tl.to(e.checks, { opacity: 0, visibility: "hidden", duration: verified.duration * .2 }, verified.start);
  if (e.header) tl.to(e.header, { opacity: 0, visibility: "hidden", duration: verified.duration * .2 }, verified.start);
  if (e.verified) tl.fromTo(e.verified, { opacity: 0, visibility: "hidden", scale: .96 }, { id: "verified-result", opacity: 1, visibility: "visible", scale: 1, duration: verified.duration * .45 }, verified.start + verified.duration * .15);
  if (e.thesis) tl.fromTo(e.thesis, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: verified.duration * .35 }, verified.start + verified.duration * .5);
  const handoff = settleTiming("casezero-handoff");
  if (e.verified) tl.to(e.verified, { opacity: 0, visibility: "hidden", duration: handoff.duration * .2 }, handoff.start);
  if (e.transition) tl.set(e.transition, { opacity: 1, visibility: "visible" }, handoff.start + handoff.duration * .08);
  if (e.verifiedToken) tl.fromTo(e.verifiedToken, layout === "desktop" ? { opacity: 0, x: -80, scale: .9 } : { opacity: 0, y: 36, scale: .9 }, { id: "verified-evidence-token", opacity: 1, x: 0, y: 0, scale: 1, duration: handoff.duration * .42 }, handoff.start + handoff.duration * .12);
  if (e.bridgeCopy) tl.fromTo(e.bridgeCopy, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: handoff.duration * .36 }, handoff.start + handoff.duration * .48);
  tl.to({}, { duration: handoff.duration }, handoff.start);
  return tl;
}

export function buildCaseZeroNarrativeTimeline(e: CaseZeroTimelineElements, layout: NarrativeLayout): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  CASE_ZERO_STATES.forEach((state) => tl.addLabel(state, caseTiming(state).start));
  const hidden = present([e.caseFile, e.blindScene, e.blindClimax, e.lockRecord, e.vaultTransition]);
  if (hidden.length) tl.set(hidden, { opacity: 0, visibility: "hidden" }, 0);
  const established = caseTiming("casezero-established");
  if (e.header) tl.fromTo(e.header, { opacity: 0, y: 16 }, { id: "casezero-header", opacity: 1, y: 0, duration: established.duration * .55 }, established.start);
  if (e.question) tl.fromTo(e.question, { opacity: 0, y: 18 }, { id: "casezero-question", opacity: 1, y: 0, duration: established.duration * .5 }, established.start + established.duration * .35);
  const docket = caseTiming("public-docket");
  if (e.question) tl.to(e.question, { opacity: 0, visibility: "hidden", duration: docket.duration * .2 }, docket.start);
  if (e.caseFile) tl.fromTo(e.caseFile, layout === "desktop" ? { opacity: 0, visibility: "hidden", rotateY: -7, y: 24 } : { opacity: 0, visibility: "hidden", y: 42 }, { id: layout === "desktop" ? "case-file-open" : "mobile-case-file-open", opacity: 1, visibility: "visible", rotateY: 0, y: 0, duration: docket.duration * .5, ease: "power2.out" }, docket.start + docket.duration * .14);
  const evidence = caseTiming("evidence-typed");
  if (e.evidenceLayers) tl.fromTo(e.evidenceLayers, layout === "desktop" ? { opacity: .15, x: -18 } : { opacity: .15, y: 18 }, { id: layout === "desktop" ? "evidence-lineage" : "mobile-evidence-lineage", opacity: 1, x: 0, y: 0, stagger: .12, duration: evidence.duration * .52 }, evidence.start + evidence.duration * .14);
  const sealed = caseTiming("finding-sealed");
  if (e.caseFile) tl.to(e.caseFile, { opacity: 0, visibility: "hidden", duration: sealed.duration * .18 }, sealed.start);
  if (e.blindScene) tl.set(e.blindScene, { opacity: 1, visibility: "visible" }, sealed.start + sealed.duration * .12);
  if (e.generatedEvidence) tl.fromTo(e.generatedEvidence, layout === "desktop" ? { opacity: 0, x: -48 } : { opacity: 0, y: -28 }, { id: "generated-evidence", opacity: 1, x: 0, y: 0, duration: sealed.duration * .4 }, sealed.start + sealed.duration * .16);
  if (e.blindBoundary) tl.fromTo(e.blindBoundary, layout === "desktop" ? { opacity: 0, scaleY: .15 } : { opacity: 0, scaleX: .15 }, { id: "blind-boundary", opacity: 1, scaleX: 1, scaleY: 1, duration: sealed.duration * .42 }, sealed.start + sealed.duration * .24);
  if (e.officialFinding) tl.fromTo(e.officialFinding, layout === "desktop" ? { opacity: 0, x: 52 } : { opacity: 0, y: 28 }, { id: "official-finding-sealed", opacity: .58, x: 0, y: 0, duration: sealed.duration * .38 }, sealed.start + sealed.duration * .42);
  const blind = caseTiming("blind-by-construction");
  const evidenceObjects = present([e.generatedEvidence, e.officialFinding]);
  if (evidenceObjects.length) tl.to(evidenceObjects, { opacity: 0, visibility: "hidden", duration: blind.duration * .18 }, blind.start);
  if (e.blindClimax) tl.fromTo(e.blindClimax, { opacity: 0, scale: .92 }, { id: "blind-climax", opacity: 1, visibility: "visible", scale: 1, duration: blind.duration * .48, ease: "power2.out" }, blind.start + blind.duration * .18);
  const lock = caseTiming("lock-ready");
  if (e.blindScene) tl.to(e.blindScene, { opacity: 0, visibility: "hidden", duration: lock.duration * .18 }, lock.start);
  if (e.lockRecord) tl.fromTo(e.lockRecord, { opacity: 0, visibility: "hidden", y: layout === "desktop" ? 34 : 46 }, { id: "lock-record", opacity: 1, visibility: "visible", y: 0, duration: lock.duration * .5 }, lock.start + lock.duration * .18);
  const vault = caseTiming("vault-handoff");
  if (e.lockRecord) tl.to(e.lockRecord, { opacity: 0, visibility: "hidden", duration: vault.duration * .18 }, vault.start);
  if (e.surface) tl.to(e.surface, { backgroundColor: "#dedfd7", duration: vault.duration * .72 }, vault.start);
  if (e.header) tl.to(e.header, { opacity: 0, visibility: "hidden", duration: vault.duration * .2 }, vault.start);
  if (e.vaultTransition) tl.set(e.vaultTransition, { id: "vault-transition", opacity: 1, visibility: "visible" }, vault.start + vault.duration * .1);
  if (e.lockPacket) tl.fromTo(e.lockPacket, { opacity: 0, y: layout === "desktop" ? -28 : 36, scale: .94 }, { id: "lock-packet", opacity: 1, y: 0, scale: 1, duration: vault.duration * .34 }, vault.start + vault.duration * .14);
  if (e.vaultBoundary) tl.fromTo(e.vaultBoundary, layout === "desktop" ? { opacity: 0, scaleX: .18 } : { opacity: 0, scaleY: .18 }, { opacity: 1, scaleX: 1, scaleY: 1, duration: vault.duration * .38 }, vault.start + vault.duration * .3);
  const vaultCopy = present([e.vaultTitle, e.vaultHeadline, e.vaultRail]);
  if (vaultCopy.length) tl.fromTo(vaultCopy, { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: .05, duration: vault.duration * .28 }, vault.start + vault.duration * .52);
  tl.to({}, { duration: vault.duration }, vault.start);
  return tl;
}

export function buildNarrativeTimeline(elements: PortfolioTimelineElements, layout: NarrativeLayout) { return buildSettleDiffNarrativeTimeline(elements.settlediff, layout); }
export function buildSettleDiffTimeline(elements: SettleDiffTimelineElements) { return buildSettleDiffNarrativeTimeline(elements, "desktop"); }
export function buildIntroTimeline(elements: IntroTimelineElements): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  const targets = present([elements.role, elements.name, elements.rule, elements.framing, elements.cue]);
  if (targets.length) tl.fromTo(targets, { opacity: 1, y: 0 }, { opacity: .15, y: -40, stagger: .02, duration: .6 }, 0);
  if (elements.cueLine) tl.fromTo(elements.cueLine, { scaleX: 1, transformOrigin: "left center" }, { scaleX: 1.7, duration: .6 }, 0);
  if (elements.pathOrigin) tl.fromTo(elements.pathOrigin, { opacity: .2, scaleX: .4, transformOrigin: "left center" }, { opacity: 1, scaleX: 1, duration: .6 }, 0);
  return tl;
}
