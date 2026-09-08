import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { contextDevUsage, externalLinks, laterValidation, originIncident, projectLinks, reconstructionLayers, settleDiff, verificationChecks } from "@/content/portfolioContent";
import { SettleDiffStage } from "./SettleDiffStage";

describe("SettleDiffStage", () => {
  test("renders the approved evolution story with one persistent artifact", () => {
    const { container } = render(<SettleDiffStage />);
    expect(screen.getByRole("heading", { name: "SettleDiff" })).toBeInTheDocument();
    expect(screen.getByText(settleDiff.closingThesis)).toBeInTheDocument();
    expect(container.querySelectorAll("[data-artifact]")).toHaveLength(1);
    expect(container.querySelectorAll("[data-reconstruction-layer]")).toHaveLength(reconstructionLayers.length);
    expect(container.querySelectorAll("[data-check]")).toHaveLength(verificationChecks.length);
  });
  test("separates the historical incident from the later live validation", () => {
    const { container } = render(<SettleDiffStage />);
    expect(container.querySelector("[data-origin-validation]")).toHaveTextContent(originIncident.verdict);
    expect(container.querySelector("[data-later-validation]")).toHaveTextContent(laterValidation.verdict);
    expect(screen.getByRole("link", { name: /Read live report/ })).toHaveAttribute("href", externalLinks.settleDiffLiveReport);
    expect(screen.getByText("EVIDENCE DECIDES")).toBeInTheDocument();
  });
  test("keeps technical detail secondary and source reachable", () => {
    const { container } = render(<SettleDiffStage />);
    expect(screen.getByText(laterValidation.warning)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View SettleDiff source on GitHub" })).toHaveAttribute("href", projectLinks.settleDiff);
    expect(container.querySelector("[data-contextdev-attribution]")).toHaveTextContent(contextDevUsage.settleDiff);
  });
  test("hands off to CaseZero instead of owning the Vault transition", () => {
    const { container } = render(<SettleDiffStage />);
    expect(container.querySelector("[data-vault-transition]")).toBeNull();
    expect(container.querySelector("[data-settle-case-transition]")).toBeInTheDocument();
  });
  test("marks all timeline-owned targets and exposes debug state only when supplied", () => {
    const { container } = render(<SettleDiffStage state="independent-proof" />);
    expect(container.querySelector("[data-stage]")).toHaveAttribute("data-state", "independent-proof");
    container.querySelectorAll("[data-check], [data-reconstruction-layer], [data-scene-surface]").forEach((target) => expect(target).toHaveAttribute("data-animatable"));
  });
});
