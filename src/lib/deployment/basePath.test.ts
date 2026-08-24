import { describe, expect, test } from "vitest";

import { normalizeBasePath, withBasePath } from "./basePath";

describe("normalizeBasePath", () => {
  test("treats undefined and empty input as a root deployment", () => {
    expect(normalizeBasePath(undefined)).toBe("");
    expect(normalizeBasePath("")).toBe("");
    expect(normalizeBasePath("/")).toBe("");
    expect(normalizeBasePath("   ")).toBe("");
  });

  test("normalizes a repository subpath to one leading slash and no trailing slash", () => {
    expect(normalizeBasePath("/portfolio")).toBe("/portfolio");
    expect(normalizeBasePath("portfolio")).toBe("/portfolio");
    expect(normalizeBasePath("/portfolio/")).toBe("/portfolio");
    expect(normalizeBasePath("  /portfolio  ")).toBe("/portfolio");
  });

  test("rejects paths containing whitespace inside the path", () => {
    expect(() => normalizeBasePath("/my repo")).toThrow();
  });
});

describe("withBasePath", () => {
  test("returns the asset path unchanged for a root deployment", () => {
    expect(withBasePath("/icons/example.svg", "")).toBe("/icons/example.svg");
  });

  test("prefixes raw public assets with the repository base path", () => {
    expect(withBasePath("/icons/example.svg", "/portfolio")).toBe(
      "/portfolio/icons/example.svg",
    );
    expect(withBasePath("icons/example.svg", "/portfolio")).toBe(
      "/portfolio/icons/example.svg",
    );
  });

  test("does not duplicate a base path that is already present", () => {
    expect(withBasePath("/portfolio/icons/example.svg", "/portfolio")).toBe(
      "/portfolio/icons/example.svg",
    );
  });
});
