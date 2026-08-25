import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { evidenceObjects, reasoningChain } from "@/content/portfolioContent";

import { SettleDiffStage } from "./SettleDiffStage";

describe("SettleDiffStage", () => {
  test("renders the project title and approved descriptor", () => {
    render(<SettleDiffStage />);

    expect(
      screen.getByRole("heading", { name: "SettleDiff" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Transaction forensics for agent purchases."),
    ).toBeInTheDocument();
  });

  test("renders all six persistent evidence objects with source-backed data", () => {
    const { container } = render(<SettleDiffStage />);

    for (const object of evidenceObjects) {
      const item = container.querySelector(
        `[data-evidence-item="${object.id}"]`,
      );
      expect(item).not.toBeNull();
      expect(item).toHaveTextContent(object.label);
      expect(item).toHaveTextContent(object.primary);
      expect(item).toHaveTextContent(object.detail);
    }
  });

  test("renders the transaction anchors and request amount", () => {
    render(<SettleDiffStage />);

    expect(screen.getByText("AGENT")).toBeInTheDocument();
    expect(screen.getByText("SERVICE")).toBeInTheDocument();
    expect(screen.getAllByText("0.01 USDC").length).toBeGreaterThan(0);
  });

  test("exposes the current narrative state for styling and tests", () => {
    const { container } = render(<SettleDiffStage state="mismatch-isolated" />);

    expect(container.firstElementChild).toHaveAttribute(
      "data-state",
      "mismatch-isolated",
    );
  });

  test("defaults to the established baseline state", () => {
    const { container } = render(<SettleDiffStage />);

    expect(container.firstElementChild).toHaveAttribute(
      "data-state",
      "project-established",
    );
  });

  test("renders the verdict and its factual reason", () => {
    const { container } = render(<SettleDiffStage />);

    const verdict = container.querySelector("[data-verdict]");
    expect(verdict).not.toBeNull();
    expect(verdict).toHaveTextContent("UNVERIFIABLE");
    expect(verdict).toHaveTextContent(
      "no confirmed charge, no transaction hash",
    );
  });

  test("renders the reasoning chain in causal order", () => {
    const { container } = render(<SettleDiffStage />);

    const items = Array.from(
      container.querySelectorAll("[data-chain-item]"),
    ).map((item) => item.textContent);

    expect(items.map((text) => text?.split(" ")[0])).toEqual(
      reasoningChain.map((step) => step.label),
    );
  });

  test("renders expected and observed values for direct comparison", () => {
    render(<SettleDiffStage />);

    expect(screen.getByText("EXPECTED")).toBeInTheDocument();
    expect(screen.getByText("OBSERVED")).toBeInTheDocument();
    expect(screen.getAllByText("base").length).toBeGreaterThan(0);
    expect(screen.getAllByText("tempo").length).toBeGreaterThan(0);
  });
});
