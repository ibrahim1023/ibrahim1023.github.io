import { expect, test } from "vitest";
import { buildVaultTimeline } from "./vaultTimeline";

test("orders preview, approval, and verification and reverses to a pending preview", () => {
  const section = document.createElement("section");
  section.innerHTML = `<div data-vault-current></div><div data-vault-proposal></div><strong data-vault-approved></strong><p data-vault-result></p><i data-vault-progress></i><li data-vault-rail-item></li>`;
  const timeline = buildVaultTimeline(section);
  expect(Object.keys(timeline.labels)).toEqual(["find", "preview", "approve", "verify"]);
  timeline.progress(1);
  expect((section.querySelector("[data-vault-result]") as HTMLElement).style.opacity).toBe("1");
  timeline.progress(0);
  expect((section.querySelector("[data-vault-approved]") as HTMLElement).style.visibility).toBe("hidden");
  timeline.kill();
});
