import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { MobileSettleDiffStage } from "./MobileSettleDiffStage";

test("mobile uses one vertical story with the complete evidence path", () => {
  const { container } = render(<MobileSettleDiffStage />);
  expect(container.firstElementChild).toHaveAttribute("data-layout", "mobile");
  expect(container.querySelectorAll("[data-artifact]")).toHaveLength(1);
  expect(container.querySelectorAll("[data-reconstruction-layer]")).toHaveLength(3);
  expect(container.querySelector("[data-provider-record]")).not.toBeNull();
  expect(container.querySelector("[data-independent-record]")).not.toBeNull();
  expect(container.querySelectorAll("[data-check]")).toHaveLength(12);
  expect(container.querySelector("[data-evidence-item]")).toBeNull();
});

test("keeps Vault out of the SettleDiff scrub and hands off to CaseZero", () => {
  const { container } = render(<MobileSettleDiffStage />);
  expect(container.querySelector("[data-vault-arrival]")).toBeNull();
  expect(container.querySelector("[data-evidence-packet]")).toBeNull();
  expect(container.querySelector("[data-verified-evidence-token]")).not.toBeNull();
});
