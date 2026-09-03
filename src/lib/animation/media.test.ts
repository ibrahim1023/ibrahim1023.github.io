import { describe, expect, test } from "vitest";

import { NARRATIVE_MEDIA, RUNWAY_VH, runwayPixels } from "./media";

describe("narrative media contract", () => {
  test("uses explicit mutually exclusive desktop and mobile queries", () => {
    expect(NARRATIVE_MEDIA.desktop).toContain("min-width: 768px");
    expect(NARRATIVE_MEDIA.mobile).toContain("max-width: 767px");
    expect(NARRATIVE_MEDIA.reduce).toBe("(prefers-reduced-motion: reduce)");
  });

  test("converts approved viewport runways to pixels", () => {
    expect(RUNWAY_VH).toEqual({
      settlediff: { desktop: 680, mobile: 520 },
      casezero: { desktop: 360, mobile: 340 },
    });
    expect(RUNWAY_VH.settlediff.desktop + RUNWAY_VH.casezero.desktop).toBeLessThanOrEqual(1040);
    expect(RUNWAY_VH.settlediff.mobile + RUNWAY_VH.casezero.mobile).toBeLessThanOrEqual(860);
    expect(runwayPixels("settlediff", "desktop", 720)).toBe(4896);
    expect(runwayPixels("casezero", "mobile", 844)).toBeCloseTo(2869.6);
  });
});
