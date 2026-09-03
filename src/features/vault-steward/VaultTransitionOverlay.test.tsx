import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { vaultSteward } from "@/content/portfolioContent";
import { VaultTransitionOverlay } from "./VaultTransitionOverlay";

test("hands one locked assessment into one Vault boundary", () => {
  const { container } = render(<VaultTransitionOverlay layout="mobile" />);
  expect(container.querySelectorAll("[data-evidence-packet]")).toHaveLength(1);
  expect(container.querySelectorAll("[data-lock-packet]")).toHaveLength(1);
  expect(container.querySelectorAll("[data-vault-boundary]")).toHaveLength(1);
  expect(container.querySelectorAll("[data-object-label]")).toHaveLength(0);
  expect(Array.from(container.querySelectorAll("[data-vault-transition-step]")).map((node) => node.textContent)).toEqual(vaultSteward.rail);
  container.querySelectorAll("[data-vault-transition], [data-evidence-packet], [data-vault-boundary], [data-vault-transition-step]").forEach((target) => expect(target).toHaveAttribute("data-animatable"));
});
