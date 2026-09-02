import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

const runtime = vi.hoisted(() => {
  const cleanup = vi.fn();
  return {
    cleanup,
    initialize: vi.fn(() => cleanup),
  };
});

vi.mock("@/lib/animation/runtime", () => ({
  initializePortfolioAnimations: runtime.initialize,
  shouldExposeTimelineState: ({
    nodeEnv,
    timelineDebug,
  }: {
    nodeEnv: string | undefined;
    timelineDebug: string | undefined;
  }) => nodeEnv === "development" && timelineDebug === "true",
}));

import { PortfolioExperience } from "./PortfolioExperience";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: originalMatchMedia,
  });
  runtime.cleanup.mockReset();
  runtime.initialize.mockClear();
});

describe("PortfolioExperience shell", () => {
  test("renders the three Phase 1 semantic sections exactly once", () => {
    const { container } = render(<PortfolioExperience />);

    expect(screen.getByRole("region", { name: "Intro" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "SettleDiff" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Vault Steward" })).toBeInTheDocument();
    expect(screen.getAllByRole("region")).toHaveLength(3);
    expect(container.querySelectorAll('[data-stage][data-layout="desktop"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-stage][data-layout="mobile"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-branch="reduced"]')).toHaveLength(1);
    expect(container.querySelectorAll("[data-no-js-narrative]")).toHaveLength(1);
  });

  test("renders the approved identity and project copy", () => {
    render(<PortfolioExperience />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Ibrahim Arshad" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("I build and evaluate reliable agentic systems."),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Transaction forensics for agent purchases.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Keep your vault trustworthy").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        "Local-first, evidence-backed vault maintenance with explicit approval before every edit.",
      ).length,
    ).toBeGreaterThan(0);
  });

  test("delegates animation lifecycle ownership to the media-aware runtime", () => {
    runtime.cleanup.mockClear();
    runtime.initialize.mockClear();
    const { container, unmount } = render(<PortfolioExperience />);

    expect(runtime.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        root: container.firstElementChild,
        exposeState: false,
        viewportHeight: expect.any(Function),
      }),
    );

    unmount();

    expect(runtime.cleanup).toHaveBeenCalledOnce();
  });
});
