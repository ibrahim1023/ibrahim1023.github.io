import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const source = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json";
const target = new URL("../src/content/vaultStewardDownloads.json", import.meta.url);

export function parseDownloads(stats) {
  const count = stats?.["vault-steward"]?.downloads;
  if (!Number.isSafeInteger(count) || count < 0) throw new Error("Vault Steward count missing or invalid");
  return count;
}

export async function refreshDownloads({ fetcher = fetch, destination = target, today = new Date() } = {}) {
  const response = await fetcher(source, { signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error(`Statistics request failed: ${response.status}`);
  const count = parseDownloads(await response.json());
  const updated = today.toISOString().slice(0, 10);
  await writeFile(destination, `${JSON.stringify({ count, updated }, null, 2)}\n`, "utf8");
  return { count, updated };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  refreshDownloads().then(({ count }) => {
    process.stdout.write(`Vault Steward downloads refreshed: ${count}\n`);
  }).catch((error) => {
    process.stderr.write(`Using checked-in Vault Steward count: ${error.message}\n`);
  });
}
