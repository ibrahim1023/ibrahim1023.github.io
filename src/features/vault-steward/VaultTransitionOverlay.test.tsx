import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { VaultTransitionOverlay } from "./VaultTransitionOverlay";

test("hands one locked assessment into one Vault boundary", () => {
  const { container } = render(<VaultTransitionOverlay layout="mobile" />);
  expect(container.querySelectorAll("[data-evidence-packet]")).toHaveLength(1);
  expect(container.querySelectorAll("[data-lock-packet]")).toHaveLength(1);
  expect(container.querySelectorAll("[data-vault-boundary]")).toHaveLength(1);
  expect(container.querySelectorAll("[data-object-label]")).toHaveLength(0);
  expect(container.querySelector("[data-vault-transition-title]")).toBeNull();
  expect(container.querySelector("[data-vault-transition-rail]")).toBeNull();
  container.querySelectorAll("[data-vault-transition], [data-evidence-packet], [data-vault-boundary], [data-vault-transition-step]").forEach((target) => expect(target).toHaveAttribute("data-animatable"));
});
