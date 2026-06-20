export type ProjectLinkKey = "github" | "paper" | "slides" | "poster" | "code" | "website";

export type ProjectLinks = Partial<Record<ProjectLinkKey, string>>;

export const PROJECT_LINK_META: Record<ProjectLinkKey, { label: string; icon: string }> = {
  github: { label: "GitHub", icon: "GH" },
  paper: { label: "Paper", icon: "PDF" },
  slides: { label: "Slides", icon: "SL" },
  poster: { label: "Poster", icon: "PO" },
  code: { label: "Code", icon: "CD" },
  website: { label: "Website", icon: "WEB" }
};

export function getVisibleProjectLinks(links: ProjectLinks | undefined) {
  return Object.entries(PROJECT_LINK_META)
    .map(([key, meta]) => {
      const href = links?.[key as ProjectLinkKey];

      if (!href) {
        return null;
      }

      return {
        key,
        href,
        ...meta
      };
    })
    .filter((link): link is { key: string; href: string; label: string; icon: string } => link !== null);
}
