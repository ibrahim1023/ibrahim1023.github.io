import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ReducedMotionNarrative } from "./ReducedMotionNarrative";

test("reduced motion preserves the complete causal story in normal flow", () => {
  const { container } = render(<ReducedMotionNarrative />);
  expect(Array.from(container.querySelectorAll("h3")).map((node) => node.textContent)).toEqual([
    "Purchase", "Promised, executed, recorded", "Original incident", "One verification system",
    "Provider receipt and independent record", "Deterministic checks", "VERIFIED", "Vault Steward arrival",
  ]);
  expect(container.querySelectorAll("[data-animatable]")).toHaveLength(0);
  expect(screen.getByText("Don’t trust the receipt. Verify the settlement.")).toBeInTheDocument();
  expect(screen.getByText(/Base Sepolia testnet/)).toBeInTheDocument();
});
