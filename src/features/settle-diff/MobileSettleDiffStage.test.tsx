import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { evidenceObjects } from "@/content/portfolioContent";

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
      expect(screen.getByText(object.label)).toBeInTheDocument();
    }
  });
});
