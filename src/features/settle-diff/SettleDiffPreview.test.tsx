import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { SettleDiffPreview } from "./SettleDiffPreview";

describe("SettleDiffPreview", () => {
  test("starts with independent x402 evidence and exact transfer terms", () => {
    const { container } = render(<SettleDiffPreview />);
    const preview = container.querySelector("[data-settlediff-preview]")!;

    expect(within(preview as HTMLElement).getByText(/Authorized payer, recipient, token, 0.001 test USDC, and Base Sepolia network matched/)).toBeInTheDocument();
    expect(within(preview as HTMLElement).getByText(/Separate from the provider receipt/i)).toBeInTheDocument();
    expect(preview.querySelectorAll("[data-preview-papers] dl:first-of-type div")).toHaveLength(10);
    expect(within(preview as HTMLElement).getByRole("button", { name: /Independent transfer/ })).toHaveAttribute("aria-pressed", "true");
    expect(preview.querySelector("[data-preview-result]")).toHaveTextContent("VERIFIED");
    expect(preview.querySelector("[data-preview-flow]")).toHaveTextContent("PROVIDER CLAIM");
    expect(preview.querySelector("[data-preview-flow]")).toHaveTextContent("INDEPENDENT OBSERVATION");
    expect(preview.querySelector("[data-preview-flow]")).toHaveTextContent("VERIFIED");
    expect(preview.querySelector("[data-preview-papers]")).toBeInTheDocument();
  });

  test("switches to provider-only and paid-delivery outcomes without conflating them", () => {
    const { container } = render(<SettleDiffPreview />);
    const preview = container.querySelector("[data-settlediff-preview]")!;

    fireEvent.click(screen.getByRole("button", { name: /Provider records/ }));
    expect(preview.querySelector("[data-preview-result]")).toHaveTextContent("UNVERIFIABLE");
    expect(preview).toHaveTextContent("INDEPENDENT CUSTOMER DEBIT");
    expect(preview).toHaveTextContent("Not established");

    fireEvent.click(screen.getByRole("button", { name: /Paid delivery/ }));
    expect(preview.querySelector("[data-preview-result]")).toHaveTextContent("PAID_FAILURE");
    expect(preview).toHaveTextContent("Earlier HTTP-500 attempt remains UNVERIFIABLE");
    expect(preview).toHaveTextContent("DO_NOT_RETRY");
  });
});
