import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ProfileFooter, profiles } from "./ProfileFooter";

test("provides the four owner-supplied profiles with safe new tabs", () => {
  render(<ProfileFooter />);
  expect(screen.getByRole("navigation", { name: "Social profiles" })).toBeInTheDocument();
  for (const { label, href } of profiles) {
    const link = screen.getByRole("link", { name: `${label} (opens in a new tab)` });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});
