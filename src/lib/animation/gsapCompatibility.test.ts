import { describe, expect, test } from "vitest";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

describe("animation dependencies", () => {
  test("gsap and ScrollTrigger resolve in the test environment", () => {
    expect(gsap.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(typeof ScrollTrigger.create).toBe("function");
  });
});
