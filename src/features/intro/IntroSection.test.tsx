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
      screen.getByText("I build and evaluate reliable agentic systems."),
    ).toBeInTheDocument();
    expect(screen.getByText("Selected work")).toBeInTheDocument();
  });

  test("exposes a labelled semantic region", () => {
    render(<IntroSection />);

    expect(screen.getByRole("region", { name: "Intro" })).toBeInTheDocument();
  });

  test("keeps the selected-work cue inside its handoff track", () => {
    const { container } = render(<IntroSection />);

    expect(container.querySelector("[data-handoff-track] [data-intro-cue-line]")).toBeInTheDocument();
  });
});
