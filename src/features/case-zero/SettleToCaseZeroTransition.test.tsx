import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { SettleToCaseZeroTransition } from "./SettleToCaseZeroTransition";

test("hands verified evidence into a new investigation question", () => {
  const { container } = render(<SettleToCaseZeroTransition layout="desktop" />);
  expect(container.querySelector("[data-verified-evidence-token]")).toHaveTextContent("VERIFIED EVIDENCE");
  expect(container.querySelector("[data-casezero-bridge-copy]")).toHaveTextContent("Evidence can be verified.");
  expect(container.querySelector("[data-casezero-bridge-copy]")).toHaveTextContent("Can an investigation stay blind to the answer?");
});
