import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const optionalUrl = z.union([z.string().url(), z.literal("")]).optional();

const projectLinksSchema = z
  .object({
    github: optionalUrl,
    paper: optionalUrl,
    slides: optionalUrl,
    poster: optionalUrl,
    code: optionalUrl,
    website: optionalUrl
  })
  .default({});

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.{md,mdx}"
  }),
  schema: z.object({
    title: z.string(),
    status: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
    topics: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    mentors: z.array(z.string()).default([]),
    period: z.object({
      label: z.string(),
      start: z.string(),
      end: z.string()
    }),
    question: z.string(),
    shortDescription: z.string(),
    links: projectLinksSchema
  })
});

const courses = defineCollection({
  loader: file("src/data/courses.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    code: z.string(),
    semester: z.string(),
    termOrder: z.number(),
    grade: z.string().optional(),
    audited: z.boolean().default(false),
    achievements: z.array(z.string()).default([]),
    types: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    professors: z.array(z.string()).default([]),
    syllabusUrl: optionalUrl,
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

export const collections = { projects, courses };