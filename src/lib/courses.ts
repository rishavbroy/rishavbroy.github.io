import type { CollectionEntry } from "astro:content";
import { uniqueSorted } from "./filterData";

export type CourseEntry = CollectionEntry<"courses">;

export function getCourseDepartment(code: string) {
  return code.replace(/\s+\d+[A-Za-z]?\s*$/, "").trim();
}

export function orderCourseTypes(types: string[]) {
  const priority = new Map([
    ["PhD-level", 0],
    ["Master's-level", 1]
  ]);

  return types.slice().sort((a, b) => {
    const aPriority = priority.get(a) ?? 10;
    const bPriority = priority.get(b) ?? 10;

    return aPriority - bPriority || a.localeCompare(b);
  });
}

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
    departments: uniqueSorted(courses.map((course) => getCourseDepartment(course.data.code))),
    types: orderCourseTypes(uniqueSorted(courses.flatMap((course) => course.data.types))),
    topics: uniqueSorted(courses.flatMap((course) => course.data.topics)),
    achievements: uniqueSorted(courses.flatMap((course) => course.data.achievements))
  };
}
