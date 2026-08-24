export function normalizeBasePath(value: string | undefined): string {
  const trimmed = (value ?? "").trim();

  if (trimmed === "" || trimmed === "/") {
    return "";
  }

  if (/\s/.test(trimmed)) {
    throw new Error(`Invalid base path: "${value}" contains whitespace`);
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function withBasePath(assetPath: string, basePath?: string): string {
  const base = normalizeBasePath(basePath ?? process.env.NEXT_PUBLIC_BASE_PATH);
  const normalizedAsset = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;

  if (base !== "" && (normalizedAsset === base || normalizedAsset.startsWith(`${base}/`))) {
    return normalizedAsset;
  }

  return `${base}${normalizedAsset}`;
}
