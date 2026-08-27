import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import {
  evidenceObjects,
  projectLinks,
  reasoningChain,
} from "@/content/portfolioContent";

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
      expect(item?.querySelector('[data-object-label="settle"]')).toHaveTextContent(
        object.label,
      );
      expect(item?.querySelector('[data-object-label="vault"]')).toHaveTextContent(
        object.vaultRole,
      );
      expect(item?.querySelector('[data-object-label="vault"]')).not.toHaveAttribute(
        "aria-hidden",
      );
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

  test("renders the source, return, activity, and evidence truthfully", () => {
    const { container } = render(<SettleDiffStage />);

    expect(
      screen.getByRole("link", { name: "View SettleDiff source on GitHub" }),
    ).toHaveAttribute("href", projectLinks.settleDiff);
    expect(screen.getAllByText("HTTP 402").length).toBeGreaterThan(0);
    expect(container.querySelector("[data-attempt-status]")).toHaveTextContent(
      "broadcast_failed",
    );
    expect(screen.queryByText("acknowledged")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-evidence-item="activity"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('[data-evidence-item="receipt"]'),
    ).toBeNull();
    expect(
      container.querySelector('[data-classification="UNKNOWN"]'),
    ).not.toBeNull();
  });

  test("exposes the current narrative state for styling and tests", () => {
    const { container } = render(<SettleDiffStage state="mismatch-isolated" />);

    expect(container.firstElementChild).toHaveAttribute(
      "data-state",
      "mismatch-isolated",
    );
  });

  test("does not render production timeline debug state by default", () => {
    const { container } = render(<SettleDiffStage />);

    expect(container.firstElementChild).not.toHaveAttribute("data-state");
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

  test("marks every GSAP-owned desktop evidence target for runtime cleanup", () => {
    const { container } = render(<SettleDiffStage />);

    [
      "[data-path-origin]",
      "[data-return]",
      "[data-attempt-status]",
      "[data-evidence-connector]",
    ].forEach((selector) => {
      const targets = container.querySelectorAll(selector);
      expect(targets.length).toBeGreaterThan(0);
      targets.forEach((target) => expect(target).toHaveAttribute("data-animatable"));
    });

    expect(container.querySelector("[data-stage]")).toHaveAttribute(
      "data-animatable",
    );
  });
});
