import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { VaultStewardArrival } from "./VaultStewardArrival";

describe("VaultStewardArrival", () => {
  test("renders the title, approved copy, and continuation cue", () => {
    render(<VaultStewardArrival />);

    expect(
      screen.getByRole("heading", { name: "Vault Steward" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Keep your vault trustworthy")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Local-first, evidence-backed vault maintenance with explicit approval before every edit.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Case study continues")).toBeInTheDocument();
  });

  test("renders the decision rail in order", () => {
    const { container } = render(<VaultStewardArrival />);

    const rail = Array.from(
      container.querySelectorAll("[data-vault-rail-item]"),
    ).map((item) => item.textContent);

    expect(rail).toEqual(["FIND", "PREVIEW", "APPROVE", "VERIFY"]);
  });

  test("exposes a labelled semantic region", () => {
    render(<VaultStewardArrival />);

    expect(
      screen.getByRole("region", { name: "Vault Steward" }),
    ).toBeInTheDocument();
  });

  test("marks every arrival tween target for runtime cleanup", () => {
    const { container } = render(<VaultStewardArrival />);

    [
      "h2",
      "[data-vault-descriptor]",
      "[data-vault-cue]",
      "[data-vault-rail-item]",
    ].forEach((selector) => {
      const targets = container.querySelectorAll(selector);
      expect(targets.length).toBeGreaterThan(0);
      targets.forEach((target) => expect(target).toHaveAttribute("data-animatable"));
    });
  });
});
