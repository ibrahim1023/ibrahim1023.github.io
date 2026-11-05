import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { RuntimeLabPreview } from "./RuntimeLabPreview";

test("separates replay counts from unavailable reporting evidence", () => {
  const { container } = render(<RuntimeLabPreview />);
  expect(screen.getByRole("heading", { name: "Agent Runtime Lab" })).toBeInTheDocument();
  expect(screen.getByText("Two attempts. One protected effect.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Unprotected recovery/ }));
  expect(screen.getByText(/Without receiver protection/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Unavailable evidence/ }));
  expect(screen.getByText(/Separate reporting experiment:/)).toBeInTheDocument();
  expect(screen.getByText("Committed effects · unknown")).toBeInTheDocument();
  expect(container.querySelector("[data-second-record]")).toHaveTextContent("Current records unavailable");
  expect(screen.getByRole("link", { name: /Read the recorded evidence/ })).toHaveAttribute("href", "https://github.com/ibrahim1023/agent-runtime-reliability-lab/blob/main/docs/final-response-integration.md");
});
