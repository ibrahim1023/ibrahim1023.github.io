import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { VaultStewardPreview } from "./VaultStewardPreview";

test("shows a single illustrative note and approval-pending repair", () => {
  const { container } = render(<VaultStewardPreview />);
  expect(screen.getByRole("heading", { name: "Vault Steward" })).toBeInTheDocument();
  expect(screen.getByText("[[missing-target]]")).toBeInTheDocument();
  expect(screen.getByText("[[existing-target]]")).toBeInTheDocument();
  expect(container.querySelector("[data-vault-status]")).toHaveTextContent("awaiting approval");
  expect(screen.getByText(/No note has been changed/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /downloads on Obsidian/ })).toHaveAttribute("href", "https://community.obsidian.md/plugins/vault-steward");
});
