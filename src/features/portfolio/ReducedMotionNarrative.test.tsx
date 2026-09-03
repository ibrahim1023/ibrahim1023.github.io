import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ReducedMotionNarrative } from "./ReducedMotionNarrative";

describe("portfolio reduced-motion narrative", () => {
  test("preserves the complete trust progression and attribution", () => {
    const { container } = render(<ReducedMotionNarrative />);
    const text = container.textContent ?? "";
    expect(text.indexOf("VERIFIED")).toBeLessThan(text.indexOf("CaseZero"));
    expect(text.indexOf("BLIND BY CONSTRUCTION")).toBeLessThan(text.indexOf("Vault Steward"));
    expect(container).toHaveTextContent("Context.dev · conditional public status-page evidence");
    expect(container).toHaveTextContent("Context.dev · schema-constrained docket discovery");
    expect(container).toHaveTextContent("Independent experimental project · not affiliated with the NTSB");
    expect(container).toHaveTextContent("CEN22FA375 · measured 2026-09-01");
  });
});
