export type NarrativeLayout = "desktop" | "mobile";
export type NarrativeChapter = "settlediff" | "casezero";

export const NARRATIVE_MEDIA = {
  desktop:
    "(min-width: 768px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)",
  mobile:
    "(max-width: 767px) and (prefers-reduced-motion: no-preference), (orientation: portrait) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export const RUNWAY_VH: Record<NarrativeChapter, Record<NarrativeLayout, number>> = {
  settlediff: { desktop: 180, mobile: 160 },
  casezero: { desktop: 180, mobile: 160 },
};

export function runwayPixels(chapter: NarrativeChapter, layout: NarrativeLayout, viewportHeight: number): number {
  return (RUNWAY_VH[chapter][layout] / 100) * viewportHeight;
}
