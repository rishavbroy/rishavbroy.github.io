import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
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
    question: z.string(),
    shortDescription: z.string(),
    links: projectLinksSchema
  })
});

const courses = defineCollection({
  loader: glob({
    base: "./src/content/courses",
    pattern: "**/*.{md,mdx}"
  }),
  schema: z.object({
    title: z.string(),
    semester: z.string(),
    termOrder: z.number(),
    grade: z.string().optional(),
    achievements: z.array(z.string()).default([]),
    types: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    syllabusUrl: optionalUrl,
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

export const collections = { projects, courses };