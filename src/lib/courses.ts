import type { CollectionEntry } from "astro:content";
import { uniqueSorted } from "./filterData";

export type CourseEntry = CollectionEntry<"courses">;

export function sortCourses(courses: CourseEntry[]) {
  return courses
    .slice()
    .sort(
      (a, b) =>
        b.data.termOrder - a.data.termOrder ||
        a.data.order - b.data.order ||
        a.data.title.localeCompare(b.data.title)
    );
}

export function getCourseTaxonomy(courses: CourseEntry[]) {
  return {
    semesters: uniqueSorted(courses.map((course) => course.data.semester)),
    types: uniqueSorted(courses.flatMap((course) => course.data.types)),
    achievements: uniqueSorted(courses.flatMap((course) => course.data.achievements))
  };
}
