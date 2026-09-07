import { gsap } from "gsap";
import type { NarrativeLayout } from "./media";

/** A brief CSS-sticky workbench; one reversible correction. */
export function buildVaultTimeline(section: HTMLElement, layout: NarrativeLayout = "desktop") {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const current = section.querySelector("[data-vault-current]");
  const proposal = section.querySelector("[data-vault-proposal]");
  const approved = section.querySelector("[data-vault-approved]");
  const result = section.querySelector("[data-vault-result]");
  const progress = section.querySelector("[data-vault-progress]");
  const steps = section.querySelectorAll("[data-vault-rail-item]");
  tl.addLabel("find", 0).addLabel("preview", .2).addLabel("approve", .45).addLabel("verify", .7);
  if (current) tl.fromTo(current, { y: layout === "mobile" ? 10 : 24 }, { y: 0, duration: .2 }, 0);
  if (proposal) tl.fromTo(proposal, { autoAlpha: 0, x: layout === "mobile" ? 0 : 48, y: layout === "mobile" ? 8 : 16 }, { autoAlpha: 1, x: 0, y: 0, duration: .2 }, .2);
  if (approved) tl.fromTo(approved, { autoAlpha: 0, scale: layout === "mobile" ? .97 : .92 }, { autoAlpha: 1, scale: 1, duration: .18 }, .45);
  if (proposal) tl.to(proposal, { borderColor: "#3458db", backgroundColor: "#e1e7f5", duration: .2 }, .63);
  if (result) tl.fromTo(result, { autoAlpha: 0, y: layout === "mobile" ? 6 : 12 }, { autoAlpha: 1, y: 0, duration: .2 }, .75);
  if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: .95 }, 0);
  steps.forEach((step, index) => tl.to(step, { color: "#3458db", duration: .15 }, index * .23));
  return tl;
}
