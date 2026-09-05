import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { IntroSection } from "./IntroSection";

describe("IntroSection", () => {
  test("renders the approved identity content", () => {
    render(<IntroSection />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Ibrahim Arshad" }),
    ).toBeInTheDocument();
    expect(screen.getByText("AI Systems Engineer")).toBeInTheDocument();
    expect(
      screen.getByText("I’m an AI systems engineer focused on verification, evaluation, and human control. I build tools that check agent payments, trace findings to source evidence, and require approval before making changes."),
    ).toBeInTheDocument();
    expect(screen.getByText("Selected work")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View résumé ↗" })).toHaveAttribute(
      "href",
      "/ibrahim-arshad-resume.pdf",
    );
  });

  test("exposes a labelled semantic region", () => {
    render(<IntroSection />);

    expect(screen.getByRole("region", { name: "Intro" })).toBeInTheDocument();
  });

  test("keeps the selected-work cue inside its handoff track", () => {
    const { container } = render(<IntroSection />);

    expect(container.querySelector("[data-handoff-track] [data-intro-cue-line]")).toBeInTheDocument();
  });

  test("marks every intro tween target for runtime cleanup", () => {
    const { container } = render(<IntroSection />);

    [
      "[data-intro-role]",
      "[data-intro-name]",
      "[data-intro-rule]",
      "[data-intro-framing]",
      "[data-intro-cue]",
      "[data-intro-cue-line]",
    ].forEach((selector) => expect(container.querySelector(selector)).toHaveAttribute("data-animatable"));
  });
});
