import { describe, expect, test } from "vitest";

import { NARRATIVE_MEDIA, RUNWAY_VH, runwayPixels } from "./media";

describe("narrative media contract", () => {
  test("uses explicit mutually exclusive desktop and mobile queries", () => {
    expect(NARRATIVE_MEDIA.desktop).toContain("min-width: 768px");
    expect(NARRATIVE_MEDIA.mobile).toContain("max-width: 767px");
    expect(NARRATIVE_MEDIA.reduce).toBe("(prefers-reduced-motion: reduce)");
  });

  test("converts approved viewport runways to pixels", () => {
    expect(RUNWAY_VH).toEqual({ desktop: 700, mobile: 475 });
    expect(runwayPixels("desktop", 720)).toBe(5040);
    expect(runwayPixels("mobile", 800)).toBe(3800);
  });
});
