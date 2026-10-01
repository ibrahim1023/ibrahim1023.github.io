import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { currentPerfloValidation, laterValidation, originIncident, paidDeliveryFailure, publicVerification } from "@/content/portfolioContent";
import { MobileSettleDiffStage } from "./MobileSettleDiffStage";

test("mobile uses one vertical story with the complete evidence path", () => {
  const { container } = render(<MobileSettleDiffStage />);
  expect(container.firstElementChild).toHaveAttribute("data-layout", "mobile");
  expect(container.querySelectorAll("[data-artifact]")).toHaveLength(1);
  expect(container.querySelectorAll("[data-reconstruction-layer]")).toHaveLength(3);
  expect(container.querySelector("[data-provider-record]")).not.toBeNull();
  expect(container.querySelector("[data-independent-record]")).not.toBeNull();
  expect(container.querySelector("[data-origin-incident]")).toHaveTextContent(originIncident.verdict);
  expect(container.querySelector("[data-historical-perflo]")).toHaveTextContent(laterValidation.verdict);
  expect(container.querySelector("[data-current-perflo]")).toHaveTextContent(currentPerfloValidation.verdict);
  expect(container.querySelector("[data-independent-record]")).toHaveTextContent(publicVerification.verdict);
  expect(container.querySelector("[data-paid-delivery-failure]")).toHaveTextContent(paidDeliveryFailure.verdict);
  expect(container.querySelectorAll("[data-check]")).toHaveLength(2);
  expect(container.querySelector("[data-evidence-item]")).toBeNull();
});

test("keeps Vault out of the SettleDiff scrub and hands off to CaseZero", () => {
  const { container } = render(<MobileSettleDiffStage />);
  expect(container.querySelector("[data-vault-arrival]")).toBeNull();
  expect(container.querySelector("[data-evidence-packet]")).toBeNull();
  expect(container.querySelector("[data-verified-evidence-token]")).not.toBeNull();
});
