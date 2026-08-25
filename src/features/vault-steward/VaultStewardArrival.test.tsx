import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { VaultStewardArrival } from "./VaultStewardArrival";

describe("VaultStewardArrival", () => {
  test("renders the title, descriptor, and continuation cue", () => {
    render(<VaultStewardArrival />);

    expect(
      screen.getByRole("heading", { name: "Vault Steward" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Keep your vault trustworthy")).toBeInTheDocument();
    expect(screen.getByText("Case study continues")).toBeInTheDocument();
  });

  test("renders the decision rail in order", () => {
    const { container } = render(<VaultStewardArrival />);

    const rail = Array.from(
      container.querySelectorAll("[data-vault-rail-item]"),
    ).map((item) => item.textContent);

    expect(rail).toEqual(["PROPOSE", "SIMULATE", "CHECK", "APPROVE"]);
  });

  test("exposes a labelled semantic region", () => {
    render(<VaultStewardArrival />);

    expect(
      screen.getByRole("region", { name: "Vault Steward" }),
    ).toBeInTheDocument();
  });
});
