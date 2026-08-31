// @vitest-environment node

import { describe, expect, test } from "vitest";

import {
  assertWithinBudget,
  collectPageChunks,
} from "./check-bundle-budget.mjs";

describe("bundle budget", () => {
  test("reads the legacy app page chunk list", () => {
    expect(collectPageChunks({ pages: { "/page": ["static/chunks/a.js"] } }))
      .toEqual(["static/chunks/a.js"]);
  });

  test("reads and deduplicates the current Next.js route bundle statistics", () => {
    expect(collectPageChunks([
      {
        route: "/",
        firstLoadChunkPaths: [
          ".next/static/chunks/a.js",
          ".next/static/chunks/a.js",
          ".next/static/chunks/b.js",
        ],
      },
      { route: "/_not-found", firstLoadChunkPaths: [".next/static/chunks/error.js"] },
    ])).toEqual([
      ".next/static/chunks/a.js",
      ".next/static/chunks/b.js",
    ]);
  });

  test("fails when the page route is absent", () => {
    expect(() => collectPageChunks([])).toThrow("page route");
  });

  test("fails above 180 KiB gzip", () => {
    expect(() => assertWithinBudget(180 * 1024 + 1, 180 * 1024))
      .toThrow("exceeds 180 KiB gzip");
  });
});
