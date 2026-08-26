import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { PortfolioExperience } from "./PortfolioExperience";

describe("PortfolioExperience shell", () => {
  test("renders the three Phase 1 semantic sections exactly once", () => {
    render(<PortfolioExperience />);

    expect(screen.getByRole("region", { name: "Intro" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "SettleDiff" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Vault Steward" })).toBeInTheDocument();
    expect(screen.getAllByRole("region")).toHaveLength(3);
  });

  test("renders the approved identity and project copy", () => {
    render(<PortfolioExperience />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Ibrahim Arshad" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("I build and evaluate reliable agentic systems."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Transaction forensics for agent purchases."),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Keep your vault trustworthy").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        "Local-first, evidence-backed vault maintenance with explicit approval before every edit.",
      ).length,
    ).toBeGreaterThan(0);
  });
});
