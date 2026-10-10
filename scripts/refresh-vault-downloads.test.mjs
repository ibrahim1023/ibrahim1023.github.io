import assert from "node:assert/strict";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { parseDownloads, refreshDownloads } from "./refresh-vault-downloads.mjs";

test("accepts only the official plugin's nonnegative integer count", () => {
  assert.equal(parseDownloads({ "vault-steward": { downloads: 365 } }), 365);
  for (const value of [undefined, -1, 1.5, "365"]) {
    assert.throws(() => parseDownloads({ "vault-steward": { downloads: value } }));
  }
});

test("writes a compact dated count after a valid response", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "vault-downloads-"));
  try {
    const destination = path.join(dir, "count.json");
    await refreshDownloads({ destination, today: new Date("2026-10-09T12:00:00Z"), fetcher: async () => ({ ok: true, json: async () => ({ "vault-steward": { downloads: 365 } }) }) });
    assert.deepEqual(JSON.parse(await readFile(destination, "utf8")), { count: 365, updated: "2026-10-09" });
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test("does not overwrite fallback on invalid or failed response", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "vault-downloads-"));
  try {
    const destination = path.join(dir, "count.json");
    await assert.rejects(refreshDownloads({ destination, fetcher: async () => ({ ok: true, json: async () => ({}) }) }));
    await assert.rejects(readFile(destination));
  } finally { await rm(dir, { recursive: true, force: true }); }
});
