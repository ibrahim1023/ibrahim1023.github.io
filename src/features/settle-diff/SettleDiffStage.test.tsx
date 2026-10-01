import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { contextDevUsage, currentPerfloValidation, externalLinks, laterValidation, originIncident, paidDeliveryFailure, projectLinks, publicVerification, reconstructionLayers, settleDiff } from "@/content/portfolioContent";
import { SettleDiffStage } from "./SettleDiffStage";

describe("SettleDiffStage", () => {
  test("renders the approved evolution story with one persistent artifact", () => {
    const { container } = render(<SettleDiffStage />);
    expect(screen.getByRole("heading", { name: "SettleDiff" })).toBeInTheDocument();
    expect(screen.getByText(settleDiff.closingThesis)).toBeInTheDocument();
    expect(container.querySelectorAll("[data-artifact]")).toHaveLength(1);
    expect(container.querySelectorAll("[data-reconstruction-layer]")).toHaveLength(reconstructionLayers.length);
    expect(container.querySelectorAll("[data-check]")).toHaveLength(2);
  });
  test("separates historical and current Perflo provider evidence from independent proof", () => {
    const { container } = render(<SettleDiffStage />);
    expect(container.querySelector("[data-origin-incident]")).toHaveTextContent(originIncident.verdict);
    expect(container.querySelector("[data-historical-perflo]")).toHaveTextContent(laterValidation.verdict);
    expect(container.querySelector("[data-current-perflo]")).toHaveTextContent(currentPerfloValidation.verdict);
    expect(container.querySelector("[data-historical-perflo]")).not.toHaveAttribute("data-independent-record");
    expect(container.querySelector("[data-independent-record]")).toHaveTextContent(publicVerification.verdict);
    expect(container.querySelector("[data-paid-delivery-failure]")).toHaveTextContent(paidDeliveryFailure.verdict);
    expect(screen.getByText("EVIDENCE DECIDES")).toBeInTheDocument();
  });
  test("keeps technical detail secondary and source reachable", () => {
    const { container } = render(<SettleDiffStage />);
    expect(screen.getByText(laterValidation.warning)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /September 28 validation|current validation/ })[0]).toHaveAttribute("href", externalLinks.settleDiffCurrentValidation);
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
