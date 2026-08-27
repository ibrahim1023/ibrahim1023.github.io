import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import { vaultSteward } from "@/content/portfolioContent";

import { VaultTransitionOverlay } from "./VaultTransitionOverlay";

test("renders the approved in-pin decision rail", () => {
  const { container } = render(<VaultTransitionOverlay />);
  const rail = Array.from(container.querySelectorAll("[data-vault-transition-step]"))
    .map((node) => node.textContent);

  expect(rail).toEqual(vaultSteward.rail);
  expect(container.querySelector("[data-vault-transition-title]")).toHaveTextContent(
    "Vault Steward",
  );
  expect(container.querySelector("[data-vault-transition-headline]")).toHaveTextContent(
    vaultSteward.headline,
  );
});

test("marks every transition target for branch cleanup", () => {
  const { container } = render(<VaultTransitionOverlay />);

  expect(container.querySelector("[data-vault-transition]")).toHaveAttribute(
    "data-animatable",
  );
  expect(container.querySelector("[data-vault-transition-title]")).toHaveAttribute(
    "data-animatable",
  );
  expect(container.querySelector("[data-vault-transition-rail]")).toHaveAttribute(
    "data-animatable",
  );
  container.querySelectorAll("[data-vault-transition-step]").forEach((step) => {
    expect(step).toHaveAttribute("data-animatable");
  });
  expect(container.querySelectorAll("[data-vault-transition-connector]")).toHaveLength(2);
});
