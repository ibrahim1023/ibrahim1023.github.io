import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ReducedMotionNarrative } from "./ReducedMotionNarrative";

describe("ReducedMotionNarrative", () => {
  test("presents the complete story as ordered static panels", () => {
    const { container } = render(<ReducedMotionNarrative />);

    const headings = Array.from(container.querySelectorAll("h3")).map(
      (heading) => heading.textContent,
    );

    expect(headings).toEqual([
      "Request",
      "Activity recorded",
      "Evidence",
      "Expected vs observed",
      "Chain conflict",
      "UNVERIFIABLE",
      "Reasoning",
      "Vault Steward transformation",
    ]);
  });

  test("includes the factual mismatch and verdict without implying payment", () => {
    const { getByText, getAllByText, queryByText } = render(
      <ReducedMotionNarrative />,
    );

    expect(getAllByText("base").length).toBeGreaterThan(0);
    expect(getAllByText("tempo").length).toBeGreaterThan(0);
    expect(getByText(/settlement could not be established/i)).toBeInTheDocument();
    expect(queryByText("PAID")).not.toBeInTheDocument();
  });

  test("renders classifications and every Vault role in the static story", () => {
    render(<ReducedMotionNarrative />);

    for (const classification of ["PASS", "DIFF", "FAIL", "UNKNOWN"]) {
      expect(screen.getAllByText(classification).length).toBeGreaterThan(0);
    }

    for (const role of [
      "NOTE",
      "PROPOSED CHANGE",
      "EVIDENCE SOURCE",
      "POLICY",
      "CURRENT / AFTER",
      "AUDIT / RECHECK",
    ]) {
      expect(screen.getByText(role)).toBeInTheDocument();
    }
  });
});
