import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { SiteHeader } from "./SiteHeader";

test("header has only identity and résumé", () => {
  render(<SiteHeader />);
  expect(screen.getByRole("link", { name: "Ibrahim Arshad" })).toHaveAttribute("href", "/");
  expect(screen.getByRole("link", { name: "Résumé ↗" })).toHaveAttribute("href", "/ibrahim-arshad-resume.pdf");
  expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
});
