import type { CollectionEntry } from "astro:content";
import { uniqueSorted } from "./filterData";

export type ProjectEntry = CollectionEntry<"projects">;

export function sortProjects(projects: ProjectEntry[]) {
  return projects
    .slice()
    .sort(
      (a, b) =>
        Number(b.data.featured) - Number(a.data.featured) ||
        a.data.order - b.data.order ||
        a.data.title.localeCompare(b.data.title)
    );
}

export function getFeaturedProjects(projects: ProjectEntry[]) {
  return sortProjects(projects).filter((project) => project.data.featured);
}


export function getProjectTaxonomy(projects: ProjectEntry[]) {
  return {
    statuses: uniqueSorted(projects.map((project) => project.data.status)),
    topics: uniqueSorted(projects.flatMap((project) => project.data.topics)),
    skills: uniqueSorted(projects.flatMap((project) => project.data.skills))
  };
}
