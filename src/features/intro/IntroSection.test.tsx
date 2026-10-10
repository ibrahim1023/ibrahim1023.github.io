import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { IntroSection } from "./IntroSection";

test("introduces the work concisely without a second résumé link", () => {
  render(<IntroSection />);
  expect(screen.getByRole("heading", { level: 1, name: "Building trust into AI systems." })).toBeInTheDocument();
  expect(screen.getByText(/I’m Ibrahim Arshad, an AI systems engineer/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Explore selected work/ })).toHaveAttribute("href", "#work");
  expect(screen.queryByRole("link", { name: /résumé/i })).not.toBeInTheDocument();
});
