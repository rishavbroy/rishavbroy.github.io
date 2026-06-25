import type { CollectionEntry } from "astro:content";
import { uniqueSorted } from "./filterData";
import { buildTimelinePoints } from "./terms";

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


export function getProjectStatusFilters(projects: ProjectEntry[]) {
  const statuses = projects.map((project) => project.data.status);
  const hasActiveProject = projects.some((project) => project.data.period.end === "present");

  return uniqueSorted(hasActiveProject ? [...statuses, "In progress"] : statuses);
}

export function getProjectStatusFilterValues(project: ProjectEntry) {
  const values = [project.data.status];

  if (project.data.period.end === "present") {
    values.push("In progress");
  }

  return values;
}

export function getProjectTaxonomy(projects: ProjectEntry[]) {
  return {
    statuses: getProjectStatusFilters(projects),
    topics: uniqueSorted(projects.flatMap((project) => project.data.topics)),
    skills: uniqueSorted(projects.flatMap((project) => project.data.skills))
  };
}

export function getProjectTimeline(projects: ProjectEntry[]) {
  return buildTimelinePoints(projects.map((project) => project.data.period));
}
