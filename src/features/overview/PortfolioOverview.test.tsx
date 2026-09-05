import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { PortfolioOverview } from "./PortfolioOverview";

test("offers readable projects, evidence and contact without narrative progress", () => {
  const { container } = render(<PortfolioOverview />);
  expect(screen.getByRole("heading", { level: 1, name: "Ibrahim Arshad" })).toBeInTheDocument();
  const work = screen.getByRole("region", { name: "Selected work" });
  for (const name of ["SettleDiff", "CaseZero", "Vault Steward"]) {
    expect(within(work).getByRole("link", { name: `Read ${name} case study` })).toHaveAttribute("href");
    expect(screen.getByRole("region", { name })).toBeInTheDocument();
  }
  expect(screen.getByText(/I’ve implemented extraction and assessment locking/)).toBeInTheDocument();
  expect(screen.queryByText("Case study continues")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /ibrahim_arshad@outlook.com/ })).toHaveAttribute("href", "mailto:ibrahim_arshad@outlook.com");
  expect(container.querySelector("[data-animatable]")).toBeNull();
  expect(screen.getByRole("link", { name: /Back to selected work/ })).toHaveAttribute("href", "/");
});
