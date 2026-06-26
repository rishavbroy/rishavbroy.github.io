export type ProjectLinkKey = "github" | "paper" | "slides" | "poster" | "code" | "website";

export type ProjectLinkValue = string | { href: string; label?: string };

export type ProjectLinks = Partial<Record<ProjectLinkKey, ProjectLinkValue>>;

export const PROJECT_LINK_META: Record<ProjectLinkKey, { label: string }> = {
  github: { label: "GitHub" },
  paper: { label: "Paper" },
  slides: { label: "Presentation" },
  poster: { label: "Poster" },
  code: { label: "Code" },
  website: { label: "Website" }
};

function normalizeProjectLink(key: ProjectLinkKey, value: ProjectLinkValue | undefined) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return {
      key,
      href: value,
      label: PROJECT_LINK_META[key].label
    };
  }

  return {
    key,
    href: value.href,
    label: value.label ?? PROJECT_LINK_META[key].label
  };
}

export function getVisibleProjectLinks(links: ProjectLinks | undefined) {
  return (Object.keys(PROJECT_LINK_META) as ProjectLinkKey[])
    .map((key) => normalizeProjectLink(key, links?.[key]))
    .filter((link): link is { key: string; href: string; label: string } => link !== null);
}
