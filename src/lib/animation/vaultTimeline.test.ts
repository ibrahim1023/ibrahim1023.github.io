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

test("uses a vertical mobile reveal while preserving the desktop horizontal reveal", () => {
  const section = document.createElement("section");
  section.innerHTML = `<div data-vault-current></div><div data-vault-proposal></div><strong data-vault-approved></strong><p data-vault-result></p>`;
  const desktop = buildVaultTimeline(section, "desktop");
  desktop.progress(.2);
  expect((section.querySelector("[data-vault-proposal]") as HTMLElement).style.transform).toContain("48px");
  desktop.kill();

  const mobile = buildVaultTimeline(section, "mobile");
  mobile.progress(.2);
  expect((section.querySelector("[data-vault-proposal]") as HTMLElement).style.transform).not.toContain("48px");
  mobile.kill();
});
