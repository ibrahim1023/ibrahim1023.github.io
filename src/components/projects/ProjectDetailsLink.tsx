import { withBasePath } from "@/lib/deployment/basePath";
export function ProjectDetailsLink({ slug, inline = false }: { slug: string; inline?: boolean }) {
  return <a data-project-details href={withBasePath(`/projects/${slug}/`)} style={{ display: "inline-flex", width: "fit-content", alignSelf: "flex-start", alignItems: "center", justifyContent: "center", minHeight: 44, marginTop: inline ? 0 : "1rem", fontSize: "1rem", color: "inherit", textUnderlineOffset: ".3em" }}>{inline ? "Case study ↗" : "Explore project ↗"}</a>;
}
