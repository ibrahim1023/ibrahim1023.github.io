import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { ProjectSourceLink } from "./ProjectSourceLink";

test("opens project source safely with an explicit accessible name", () => {
  render(<ProjectSourceLink href="https://example.com/repo" project="Example" />);

  const link = screen.getByRole("link", {
    name: "View Example source on GitHub",
  });

  expect(link).toHaveAttribute("href", "https://example.com/repo");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});
