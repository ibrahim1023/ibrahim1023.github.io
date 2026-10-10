import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { PortfolioExperience } from "./PortfolioExperience";

test("shows two projects in natural flow with only the résumé in the header", () => {
  const { container } = render(<PortfolioExperience />);
  expect(screen.getByRole("link", { name: "Résumé ↗" })).toHaveAttribute("href", "/ibrahim-arshad-resume.pdf");
  expect(Array.from(container.querySelectorAll("[data-project-root]")).map(node => node.getAttribute("data-project-root"))).toEqual(["settlediff", "vault-steward"]);
  expect(screen.getByRole("heading", { name: "SettleDiff" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Vault Steward" })).toBeInTheDocument();
  expect(container.querySelector("[data-narrative='casezero']")).toBeNull();
  expect(container.querySelector("[data-branch='reduced']")).toBeNull();
  expect(container.querySelector("[data-animated-layout]")).toBeNull();
});
