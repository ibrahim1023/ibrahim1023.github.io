import { gsap } from "gsap";

/** A brief CSS-sticky workbench; one reversible correction over 320px. */
export function buildVaultTimeline(section: HTMLElement) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const current = section.querySelector("[data-vault-current]");
  const proposal = section.querySelector("[data-vault-proposal]");
  const approved = section.querySelector("[data-vault-approved]");
  const result = section.querySelector("[data-vault-result]");
  const progress = section.querySelector("[data-vault-progress]");
  const steps = section.querySelectorAll("[data-vault-rail-item]");
  tl.addLabel("find", 0).addLabel("preview", .2).addLabel("approve", .45).addLabel("verify", .7);
  if (current) tl.fromTo(current, { y: 24 }, { y: 0, duration: .2 }, 0);
  if (proposal) tl.fromTo(proposal, { autoAlpha: 0, x: 48, y: 16 }, { autoAlpha: 1, x: 0, y: 0, duration: .2 }, .2);
  if (approved) tl.fromTo(approved, { autoAlpha: 0, scale: .92 }, { autoAlpha: 1, scale: 1, duration: .18 }, .45);
  if (proposal) tl.to(proposal, { borderColor: "#39745d", backgroundColor: "#dce6d8", duration: .2 }, .63);
  if (result) tl.fromTo(result, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .2 }, .75);
  if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: .95 }, 0);
  steps.forEach((step, index) => tl.to(step, { color: "#2f604a", duration: .15 }, index * .23));
  return tl;
}
