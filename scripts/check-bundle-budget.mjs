import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

export const PAGE_BUDGET_BYTES = 180 * 1024;

export function collectPageChunks(manifest) {
  let chunks;

  if (Array.isArray(manifest)) {
    chunks = manifest.find((entry) => entry?.route === "/")?.firstLoadChunkPaths;
  } else {
    chunks = manifest?.pages?.["/page"] ?? manifest?.pages?.["/"];
  }

  if (!Array.isArray(chunks) || chunks.length === 0) {
    throw new Error("Unable to find the page route chunk list in the Next.js build manifest.");
  }

  return [...new Set(chunks)];
}

export function measureGzipBytes(files, root) {
  const absoluteRoot = resolve(root);

  return files.reduce((total, file) => {
    const relativeFile = file.startsWith(".next/") ? file.slice(".next/".length) : file;
    const absoluteFile = resolve(absoluteRoot, relativeFile);
    if (!absoluteFile.startsWith(`${absoluteRoot}${sep}`)) {
      throw new Error(`Bundle chunk resolves outside the build directory: ${file}`);
    }
    return total + gzipSync(readFileSync(absoluteFile)).byteLength;
  }, 0);
}

export function assertWithinBudget(bytes, limit = PAGE_BUDGET_BYTES) {
  if (bytes > limit) {
    throw new Error(`Page JavaScript exceeds 180 KiB gzip: ${bytes} > ${limit}`);
  }
}

function readPageManifest(buildRoot) {
  const candidates = [
    "diagnostics/route-bundle-stats.json",
    "app-build-manifest.json",
  ];

  for (const candidate of candidates) {
    const path = resolve(buildRoot, candidate);
    if (existsSync(path)) return JSON.parse(readFileSync(path, "utf8"));
  }

  throw new Error("No supported Next.js page bundle manifest was found. Run a production build first.");
}

export function runBundleCheck(buildRoot = resolve(process.cwd(), ".next")) {
  const chunks = collectPageChunks(readPageManifest(buildRoot));
  const bytes = measureGzipBytes(chunks, buildRoot);
  console.log(`Page JavaScript: ${bytes} bytes gzip (limit ${PAGE_BUDGET_BYTES})`);
  assertWithinBudget(bytes);
  return bytes;
}

const isCli = process.argv[1] !== undefined
  && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  try {
    runBundleCheck();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
