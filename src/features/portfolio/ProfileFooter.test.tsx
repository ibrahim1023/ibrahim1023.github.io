import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { ProfileFooter, profiles, stack } from "./ProfileFooter";

test("provides the four owner-supplied profiles with safe new tabs", () => {
  render(<ProfileFooter />);
  expect(screen.queryByText(/are solo projects/)).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /ibrahim_arshad@outlook.com/ })).toHaveAttribute("href", "mailto:ibrahim_arshad@outlook.com");
  const tools = screen.getByRole("region", { name: "Stack & tools" });
  for (const [, items] of stack) expect(within(tools).getByText(items)).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Pause motion" })).not.toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: "Social profiles" })).toBeInTheDocument();
  expect(profiles.map(({ label }) => label)).toEqual(["GitHub", "LinkedIn", "Medium", "X"]);
  expect(stack.map(([label]) => label)).toContain("Agent systems & verification");
  expect(stack.flat().join(" ")).toContain("PydanticAI");
  expect(stack.flat().join(" ")).not.toContain("Hyperfusion");
  for (const { label, href } of profiles) {
    const link = screen.getByRole("link", { name: `${label} (opens in a new tab)` });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});
