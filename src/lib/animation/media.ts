export type NarrativeLayout = "desktop" | "mobile";

export const NARRATIVE_MEDIA = {
  desktop:
    "(min-width: 768px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)",
  mobile:
    "(max-width: 767px) and (prefers-reduced-motion: no-preference), (orientation: portrait) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export const RUNWAY_VH: Record<NarrativeLayout, number> = {
  desktop: 700,
  mobile: 475,
};

export function runwayPixels(layout: NarrativeLayout, viewportHeight: number): number {
  return (RUNWAY_VH[layout] / 100) * viewportHeight;
}
