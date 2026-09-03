import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { projectLinks, vaultSteward } from "@/content/portfolioContent";

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
    expect(
      screen.getByRole("link", { name: "View Vault Steward source on GitHub" }),
    ).toHaveAttribute("href", projectLinks.vaultSteward);
  });

  test("renders the decision rail in order", () => {
    const { container } = render(<VaultStewardArrival />);

    const rail = Array.from(
      container.querySelectorAll("[data-vault-rail-item]"),
    ).map((item) => item.textContent);

    expect(rail).toEqual(vaultSteward.rail);
  });

  test("renders an approval preview with the expected result", () => {
    render(<VaultStewardArrival />);

    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText(vaultSteward.preview.current)).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
    expect(screen.getByText(vaultSteward.preview.after)).toBeInTheDocument();
    expect(screen.getByText(vaultSteward.preview.expectedResult)).toBeInTheDocument();
  });

  test("exposes a labelled semantic region", () => {
    render(<VaultStewardArrival />);

    expect(
      screen.getByRole("region", { name: "Vault Steward" }),
    ).toBeInTheDocument();
  });

  test("marks the compact workflow for animation with readable fallback content", () => {
    const { container } = render(<VaultStewardArrival />);

    expect(container.querySelector("[data-vault-approved]")).toHaveTextContent("illustrative example");
    for (const target of ["current", "proposal", "approved", "result", "progress"]) {
      expect(container.querySelector(`[data-vault-${target}]`)).toHaveAttribute("data-animatable");
    }
  });
});
