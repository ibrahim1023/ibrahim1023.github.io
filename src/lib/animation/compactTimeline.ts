import { gsap } from "gsap";
import type { SettleDiffTimelineElements, CaseZeroTimelineElements } from "./timeline";
import type { NarrativeLayout } from "./media";

const targets = (...items: (Element | null)[]) => items.filter((item): item is Element => !!item);

// Four factual SettleDiff beats plus a short closing thesis, kept inside the compact runway.
export function buildCompactSettleTimeline(e: SettleDiffTimelineElements, layout: NarrativeLayout) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  tl.addLabel("receipt", 0).addLabel("incident", 1.1).addLabel("provider", 2.15).addLabel("independent", 3.3).addLabel("delivery", 4.6).addLabel("verdict", 5.7);
  tl.set(targets(e.uncertainty, e.reconstruction, e.originIncident, e.systemBoundary, e.proof, e.checks, e.verified, e.transition), { autoAlpha: 0 }, 0);
  if (e.artifact) tl.fromTo(e.artifact, layout === "desktop" ? { xPercent: -150 } : { yPercent: -65 }, { xPercent: 0, yPercent: 0, duration: .7, ease: "power2.out" }, 0);
  if (e.openingPrompt) tl.fromTo(e.openingPrompt, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .35 }, .3);
  tl.to(targets(e.artifactScene, e.header), { autoAlpha: 0, duration: .2 }, .9);
  if (e.originIncident) tl.fromTo(e.originIncident, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .35 }, 1.1);
  if (e.originIncident) tl.to(e.originIncident, { autoAlpha: 0, duration: .2 }, 2.02);
  if (e.systemBoundary) tl.fromTo(e.systemBoundary, { autoAlpha: 0, scale: .97 }, { autoAlpha: 1, scale: 1, duration: .35 }, 2.15);
  if (e.railLabels) tl.fromTo(e.railLabels, { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: .08, duration: .3 }, 2.35);
  if (e.systemBoundary) tl.to(e.systemBoundary, { autoAlpha: 0, duration: .2 }, 3.15);
  if (e.surface) tl.to(e.surface, { backgroundColor: "#eef0f3", duration: .4 }, 3.15);
  if (e.proof) tl.set(e.proof, { autoAlpha: 1 }, 3.3);
  if (e.proofHeader) tl.fromTo(e.proofHeader, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .3 }, 3.3);
  if (e.providerRecord) tl.fromTo(e.providerRecord, { opacity: 0, x: layout === "desktop" ? -70 : 0, y: layout === "mobile" ? 20 : 0 }, { opacity: 1, x: 0, y: 0, duration: .4 }, 3.5);
  if (e.independentRecord) tl.fromTo(e.independentRecord, { opacity: 0, x: layout === "desktop" ? 70 : 0, y: layout === "mobile" ? 20 : 0 }, { opacity: 1, x: 0, y: 0, duration: .4 }, 3.78);
  if (e.proofLink) tl.fromTo(e.proofLink, { opacity: 0, scale: .5 }, { opacity: 1, scale: 1, duration: .2 }, 4.05);
  if (e.proof) tl.to(e.proof, { autoAlpha: 0, duration: .2 }, 4.48);
  if (e.checks) tl.fromTo(e.checks, { autoAlpha: 0 }, { autoAlpha: 1, duration: .25 }, 4.6);
  if (e.checkItems) tl.fromTo(e.checkItems, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: .08, duration: .25 }, 4.78);
  if (e.checks) tl.to(e.checks, { autoAlpha: 0, duration: .2 }, 5.55);
  if (e.verified) tl.fromTo(e.verified, { autoAlpha: 0, scale: .92 }, { autoAlpha: 1, scale: 1, duration: .35, ease: "power2.out" }, 5.7);
  if (e.thesis) tl.fromTo(e.thesis, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25 }, 5.9);
  if (layout === "mobile" && e.verified) tl.to(e.verified, { y: -8, duration: .35 }, 6.12);
  else tl.to({}, { duration: .35 }, 6.12);
  return tl;
}

export function buildCompactCaseTimeline(e: CaseZeroTimelineElements, layout: NarrativeLayout) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  tl.addLabel("evidence", 0).addLabel("boundary", 2).addLabel("lock", 4);
  tl.set(targets(e.caseFile, e.blindScene, e.blindClimax, e.lockRecord, e.vaultTransition), { autoAlpha: 0 }, 0);
  if (e.question) tl.set(e.question, { autoAlpha: 1 }, 0);
  if (e.question) tl.to(e.question, { autoAlpha: 0, duration: .25 }, .55);
  if (e.header) tl.set(e.header, { autoAlpha: 1 }, 0);
  if (e.header) tl.to(e.header, { autoAlpha: 0, y: -12, duration: .25 }, .55);
  // Docket and its source lineage replace the standalone question/slogan scenes.
  if (e.caseFile) tl.fromTo(e.caseFile, { autoAlpha: 0, y: 24, rotateY: layout === "desktop" ? -5 : 0 }, { autoAlpha: 1, y: 0, rotateY: 0, duration: .4 }, .8);
  if (e.evidenceLayers) tl.fromTo(e.evidenceLayers, { opacity: .35, y: 18 }, { opacity: 1, y: 0, stagger: .1, duration: .3 }, 1);
  if (layout === "mobile" && e.caseFile) tl.to(e.caseFile, { y: -8, duration: .3 }, 1.5);
  tl.to(targets(e.caseFile, e.header), { autoAlpha: 0, duration: .3 }, 1.8);
  if (e.blindScene) tl.set(e.blindScene, { autoAlpha: 1 }, 2.15);
  if (e.generatedEvidence) tl.fromTo(e.generatedEvidence, { opacity: 0, x: layout === "desktop" ? -55 : 0, y: layout === "mobile" ? -24 : 0 }, { opacity: 1, x: 0, y: 0, duration: .45 }, 2.15);
  if (e.blindBoundary) tl.fromTo(e.blindBoundary, { opacity: 0, scaleY: .1 }, { opacity: 1, scaleY: 1, duration: .5 }, 2.4);
  if (e.officialFinding) tl.fromTo(e.officialFinding, { opacity: 0, x: layout === "desktop" ? 55 : 0, y: layout === "mobile" ? 24 : 0 }, { opacity: .58, x: 0, y: 0, duration: .45 }, 2.6);
  if (layout === "mobile" && e.blindScene) tl.to(e.blindScene, { y: -8, duration: .8 }, 3.05);
  if (e.blindScene) tl.to(e.blindScene, { autoAlpha: 0, duration: .3 }, 3.85);
  if (e.lockRecord) tl.fromTo(e.lockRecord, { autoAlpha: 0, y: 40, scale: .95 }, { autoAlpha: 1, y: 0, scale: 1, duration: .55, ease: "power2.out" }, 4.15);
  if (layout === "mobile" && e.lockRecord) tl.to(e.lockRecord, { y: -10, duration: 1.3 }, 4.7);
  else tl.to({}, { duration: 1.3 }, 4.7);
  return tl;
}
