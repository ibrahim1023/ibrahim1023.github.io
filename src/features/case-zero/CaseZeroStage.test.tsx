import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CaseZeroStage } from "./CaseZeroStage";
import { MobileCaseZeroStage } from "./MobileCaseZeroStage";

describe("CaseZero stages", () => {
  test("renders the implemented evidence and blindness contract", () => {
    const { container } = render(<CaseZeroStage />);
    expect(screen.getByRole("heading", { name: "CaseZero" })).toBeVisible();
    expect(screen.getByRole("link", { name: /view CaseZero source/i })).toHaveAttribute("href", "https://github.com/ibrahim1023/CaseZero");
    expect(container.querySelector("[data-case-file]")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-evidence-layer]")).toHaveLength(3);
    expect(container.querySelector("[data-official-finding]")).toHaveTextContent("OFFICIAL NTSB FINDING");
    expect(container.querySelector("[data-official-finding]")).toHaveTextContent("SEALED UNTIL LOCK");
    expect(container.querySelector("[data-blind-boundary]")).toBeInTheDocument();
    expect(container.querySelector("[data-lock-record]")).toHaveTextContent("implemented lock infrastructure");
    expect(container).toHaveTextContent("not affiliated with the NTSB");
  });

  test("keeps every major mobile object in the mobile layout", () => {
    const { container } = render(<MobileCaseZeroStage />);
    const root = container.querySelector('[data-casezero-stage][data-layout="mobile"]');
    expect(root).toBeInTheDocument();
    for (const selector of ["[data-case-file]", "[data-blind-scene]", "[data-lock-record]"]) {
      expect(root?.querySelector(`${selector}[data-layout="mobile"]`)).toBeInTheDocument();
    }
  });
});
