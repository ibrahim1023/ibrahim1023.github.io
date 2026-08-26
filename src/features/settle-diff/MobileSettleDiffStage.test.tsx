import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { evidenceObjects, vaultSteward } from "@/content/portfolioContent";

import { MobileSettleDiffStage } from "./MobileSettleDiffStage";

describe("MobileSettleDiffStage", () => {
  test("renders a vertical evidence lineage with every causal state", () => {
    const { container } = render(<MobileSettleDiffStage />);

    expect(container.firstElementChild).toHaveAttribute("data-layout", "mobile");
    expect(container.querySelectorAll("[data-mobile-evidence-item]")).toHaveLength(6);
    expect(container.querySelector("[data-mobile-comparison]")).not.toBeNull();
    expect(container.querySelector("[data-mobile-verdict]")).toHaveTextContent(
      "UNVERIFIABLE",
    );

    for (const object of evidenceObjects) {
      expect(
        container.querySelector(`[data-mobile-evidence-item="${object.id}"]`),
      ).toHaveTextContent(object.label);
    }
  });

  test("renders the approved Vault Steward approval rail", () => {
    render(<MobileSettleDiffStage />);

    expect(screen.getByText(vaultSteward.rail.join(" → "))).toBeInTheDocument();
  });

  test("maps every evidence object to its Vault Steward role", () => {
    const { container } = render(<MobileSettleDiffStage />);
    const mapping = container.querySelector("[data-mobile-object-mapping]");

    expect(mapping).not.toBeNull();
    for (const entry of vaultSteward.objectMapping) {
      expect(mapping).toHaveTextContent(entry.from);
      expect(mapping).toHaveTextContent(entry.to);
    }
  });
});
