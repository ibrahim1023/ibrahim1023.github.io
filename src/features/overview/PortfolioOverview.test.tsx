import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { PortfolioOverview } from "./PortfolioOverview";

test("SettleDiff detail page keeps dated evidence and honest limits", () => {
  render(<PortfolioOverview project="settlediff" />);
  expect(screen.getByRole("heading", { level: 1, name: "SettleDiff" })).toBeInTheDocument();
  expect(screen.getByText(/historical schema-2 rules/)).toBeInTheDocument();
  expect(screen.getByText(/PAID_FAILURE/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /September 28 validation/ })).toHaveAttribute("href", "https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/pr2-live-validation-2026-09-28.md");
  expect(screen.queryByText("CaseZero")).not.toBeInTheDocument();
});

test("Vault detail page explains the approval boundary without a second title", () => {
  render(<PortfolioOverview project="vault-steward" />);
  expect(screen.getAllByRole("heading", { name: "Vault Steward" })).toHaveLength(1);
  expect(screen.getByText(/No note changed/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Back to projects/ })).toHaveAttribute("href", "/#work");
});
