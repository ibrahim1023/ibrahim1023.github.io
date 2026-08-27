import { render } from "@testing-library/react";
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
      const item = container.querySelector(
        `[data-mobile-evidence-item="${object.id}"]`,
      );
      expect(item?.querySelector('[data-object-label="settle"]')).toHaveTextContent(
        object.label,
      );
      expect(item?.querySelector('[data-object-label="vault"]')).toHaveTextContent(
        object.vaultRole,
      );
      expect(item?.querySelector('[data-object-label="vault"]')).not.toHaveAttribute(
        "aria-hidden",
      );
    }
  });

  test("keeps the stable Vault arrival outside the unpinned mobile stage", () => {
    const { container } = render(<MobileSettleDiffStage />);

    expect(container.querySelector("[data-vault-arrival]")).toBeNull();
    expect(container.querySelector("[data-vault-transition]")).not.toBeNull();
  });
});
