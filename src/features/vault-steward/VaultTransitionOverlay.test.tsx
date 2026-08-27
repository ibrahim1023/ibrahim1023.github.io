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

test("supports explicit mobile bounds and vertical connector geometry", () => {
  const { container } = render(
    <VaultTransitionOverlay
      layout="mobile"
      connectorClassName="mobile-connectors"
      connectorPathClassName="mobile-connector"
    />,
  );
  const connectors = container.querySelector("[data-vault-transition-connectors]");

  expect(connectors).toHaveClass("mobile-connectors");
  expect(connectors).toHaveAttribute("data-vault-transition-layout", "mobile");
  expect(connectors).toHaveAttribute("viewBox", "0 0 100 100");
  expect(container.querySelectorAll("[data-vault-transition-connector]")).toHaveLength(2);
  container.querySelectorAll("[data-vault-transition-connector]").forEach((path) => {
    expect(path).toHaveClass("mobile-connector");
    expect(path).toHaveAttribute("data-animatable");
  });
  expect(container.querySelector('[data-vault-transition-connector="recheck"]')).toHaveAttribute(
    "d",
    "M 50 82 V 96",
  );
});
